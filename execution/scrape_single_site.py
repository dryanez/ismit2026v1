#!/usr/bin/env python3
"""
Web scraper script - deterministic execution layer
Extracts data from websites and saves to structured format
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: Required packages not installed. Run: pip install requests beautifulsoup4")
    sys.exit(1)


# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class WebScraper:
    """Deterministic web scraping tool"""
    
    def __init__(self, url: str, timeout: int = 30):
        self.url = url
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def fetch_page(self) -> Optional[BeautifulSoup]:
        """Fetch and parse HTML page"""
        try:
            logger.info(f"Fetching: {self.url}")
            response = self.session.get(self.url, timeout=self.timeout)
            response.raise_for_status()
            return BeautifulSoup(response.text, 'html.parser')
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to fetch {self.url}: {e}")
            return None
    
    def extract_data(self, soup: BeautifulSoup, selectors: Dict[str, str]) -> List[Dict]:
        """Extract data using CSS selectors"""
        results = []
        
        try:
            # Find all container elements (adjust based on needs)
            containers = soup.select(selectors.get('container', 'body'))
            
            for container in containers:
                item = {}
                for field, selector in selectors.items():
                    if field == 'container':
                        continue
                    
                    element = container.select_one(selector)
                    if element:
                        item[field] = element.get_text(strip=True)
                    else:
                        item[field] = None
                
                if any(item.values()):  # Only add if we got some data
                    results.append(item)
            
            logger.info(f"Extracted {len(results)} items")
            return results
            
        except Exception as e:
            logger.error(f"Extraction failed: {e}")
            return []
    
    def save_results(self, data: List[Dict], output_path: Path) -> bool:
        """Save results to JSON file"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump({
                    'url': self.url,
                    'scraped_at': datetime.now().isoformat(),
                    'count': len(data),
                    'data': data
                }, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Results saved to: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save results: {e}")
            return False


def main():
    parser = argparse.ArgumentParser(description='Scrape website content')
    parser.add_argument('url', help='Target URL to scrape')
    parser.add_argument('--output', '-o', help='Output file path (default: .tmp/scraped_TIMESTAMP.json)')
    parser.add_argument('--selectors', '-s', help='JSON string of CSS selectors', default='{}')
    parser.add_argument('--timeout', '-t', type=int, default=30, help='Request timeout in seconds')
    
    args = parser.parse_args()
    
    # Parse selectors
    try:
        selectors = json.loads(args.selectors) if args.selectors else {}
    except json.JSONDecodeError:
        logger.error("Invalid JSON in selectors argument")
        sys.exit(1)
    
    # Default output path
    if not args.output:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        args.output = f'.tmp/scraped_{timestamp}.json'
    
    # Execute scraping
    scraper = WebScraper(args.url, timeout=args.timeout)
    soup = scraper.fetch_page()
    
    if not soup:
        logger.error("Failed to fetch page")
        sys.exit(1)
    
    # Extract data
    data = scraper.extract_data(soup, selectors)
    
    # Save results
    output_path = Path(args.output)
    success = scraper.save_results(data, output_path)
    
    if success:
        print(json.dumps({
            'status': 'success',
            'output_file': str(output_path),
            'items_scraped': len(data)
        }))
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
