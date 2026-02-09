#!/usr/bin/env python3
"""
Competitor content analysis script for SEO
Analyzes competitor web pages to extract SEO insights
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from collections import Counter
import re

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


class CompetitorAnalyzer:
    """Analyze competitor websites for SEO insights"""
    
    def __init__(self, timeout: int = 30):
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def fetch_page(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch and parse webpage"""
        try:
            logger.info(f"Fetching: {url}")
            response = self.session.get(url, timeout=self.timeout)
            response.raise_for_status()
            return BeautifulSoup(response.text, 'html.parser')
        except Exception as e:
            logger.error(f"Failed to fetch {url}: {e}")
            return None
    
    def extract_meta_data(self, soup: BeautifulSoup) -> Dict:
        """Extract meta tags and SEO elements"""
        meta_data = {}
        
        # Title
        title_tag = soup.find('title')
        meta_data['title'] = title_tag.get_text(strip=True) if title_tag else None
        meta_data['title_length'] = len(meta_data['title']) if meta_data['title'] else 0
        
        # Meta description
        desc_tag = soup.find('meta', attrs={'name': 'description'})
        if desc_tag:
            meta_data['description'] = desc_tag.get('content', '')
            meta_data['description_length'] = len(meta_data['description'])
        
        # Meta keywords (if present)
        keywords_tag = soup.find('meta', attrs={'name': 'keywords'})
        if keywords_tag:
            meta_data['meta_keywords'] = keywords_tag.get('content', '')
        
        # OG tags
        og_title = soup.find('meta', property='og:title')
        if og_title:
            meta_data['og_title'] = og_title.get('content', '')
        
        # Canonical URL
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if canonical:
            meta_data['canonical'] = canonical.get('href', '')
        
        return meta_data
    
    def extract_headings(self, soup: BeautifulSoup) -> Dict[str, List[str]]:
        """Extract all headings (H1-H6)"""
        headings = {}
        
        for i in range(1, 7):
            tag_name = f'h{i}'
            tags = soup.find_all(tag_name)
            headings[tag_name] = [tag.get_text(strip=True) for tag in tags]
        
        return headings
    
    def extract_content_stats(self, soup: BeautifulSoup) -> Dict:
        """Extract content statistics"""
        # Remove script and style elements
        for script in soup(['script', 'style']):
            script.decompose()
        
        # Get text content
        text = soup.get_text()
        
        # Clean text
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        words = text.split()
        
        return {
            'word_count': len(words),
            'character_count': len(text),
            'paragraph_count': len(soup.find_all('p'))
        }
    
    def extract_keywords(self, soup: BeautifulSoup, top_n: int = 20) -> List[Dict]:
        """Extract most common keywords/phrases"""
        # Get text content
        text = soup.get_text().lower()
        
        # Remove common stopwords (basic list)
        stopwords = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has',
            'der', 'die', 'das', 'und', 'oder', 'in', 'auf', 'für', 'von', 'mit',
            'ist', 'sind', 'war', 'waren', 'ein', 'eine', 'einem', 'einen'
        }
        
        # Extract words
        words = re.findall(r'\b[a-zäöüß]{3,}\b', text)
        filtered_words = [w for w in words if w not in stopwords]
        
        # Count frequencies
        word_freq = Counter(filtered_words)
        
        # Get top keywords
        top_keywords = [
            {'keyword': word, 'frequency': count}
            for word, count in word_freq.most_common(top_n)
        ]
        
        return top_keywords
    
    def extract_links(self, soup: BeautifulSoup, base_url: str) -> Dict:
        """Extract internal and external links"""
        from urllib.parse import urlparse, urljoin
        
        base_domain = urlparse(base_url).netloc
        links = soup.find_all('a', href=True)
        
        internal_links = []
        external_links = []
        
        for link in links:
            href = link.get('href', '')
            full_url = urljoin(base_url, href)
            link_domain = urlparse(full_url).netloc
            
            if link_domain == base_domain:
                internal_links.append(full_url)
            elif link_domain:  # Skip anchors and javascript links
                external_links.append(full_url)
        
        return {
            'internal_count': len(set(internal_links)),
            'external_count': len(set(external_links)),
            'internal_links': list(set(internal_links))[:10],  # Sample
            'external_links': list(set(external_links))[:10]   # Sample
        }
    
    def analyze_url(self, url: str) -> Optional[Dict]:
        """Complete analysis of a competitor URL"""
        soup = self.fetch_page(url)
        if not soup:
            return None
        
        analysis = {
            'url': url,
            'analyzed_at': datetime.now().isoformat(),
            'meta': self.extract_meta_data(soup),
            'headings': self.extract_headings(soup),
            'content_stats': self.extract_content_stats(soup),
            'top_keywords': self.extract_keywords(soup),
            'links': self.extract_links(soup, url)
        }
        
        return analysis
    
    def analyze_multiple(self, urls: List[str]) -> List[Dict]:
        """Analyze multiple competitor URLs"""
        results = []
        
        for url in urls:
            analysis = self.analyze_url(url)
            if analysis:
                results.append(analysis)
                logger.info(f"✓ Analyzed: {url}")
            else:
                logger.warning(f"✗ Failed: {url}")
        
        return results
    
    def save_results(self, data: List[Dict], output_path: Path) -> bool:
        """Save analysis results"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            summary = {
                'analyzed_at': datetime.now().isoformat(),
                'competitors_analyzed': len(data),
                'competitors': data
            }
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(summary, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Results saved to: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save results: {e}")
            return False


def main():
    parser = argparse.ArgumentParser(description='Analyze competitor websites for SEO')
    parser.add_argument('urls', nargs='+', help='Competitor URLs to analyze')
    parser.add_argument('--output', '-o',
                       help='Output file path (default: .tmp/competitor_analysis_TIMESTAMP.json)')
    parser.add_argument('--timeout', '-t', type=int, default=30,
                       help='Request timeout in seconds')
    
    args = parser.parse_args()
    
    # Default output path
    if not args.output:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        args.output = f'.tmp/competitor_analysis_{timestamp}.json'
    
    # Execute analysis
    analyzer = CompetitorAnalyzer(timeout=args.timeout)
    results = analyzer.analyze_multiple(args.urls)
    
    if not results:
        logger.error("No competitors analyzed successfully")
        sys.exit(1)
    
    # Save results
    output_path = Path(args.output)
    success = analyzer.save_results(results, output_path)
    
    if success:
        # Print summary
        logger.info(f"\n=== Analysis Summary ===")
        for comp in results:
            logger.info(f"\n{comp['url']}")
            logger.info(f"  Title: {comp['meta'].get('title', 'N/A')}")
            logger.info(f"  Word count: {comp['content_stats']['word_count']}")
            logger.info(f"  H1 tags: {len(comp['headings']['h1'])}")
            logger.info(f"  Internal links: {comp['links']['internal_count']}")
        
        print(json.dumps({
            'status': 'success',
            'output_file': str(output_path),
            'competitors_analyzed': len(results)
        }))
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
