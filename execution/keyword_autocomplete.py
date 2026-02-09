#!/usr/bin/env python3
"""
Google autocomplete keyword research script
Scrapes autocomplete suggestions for SEO keyword discovery
"""

import argparse
import json
import logging
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Set
from urllib.parse import quote_plus

try:
    import requests
except ImportError:
    print("ERROR: Required packages not installed. Run: pip install requests")
    sys.exit(1)


# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class KeywordAutocomplete:
    """Google autocomplete keyword research tool"""
    
    # Language codes for Google autocomplete
    LANG_CODES = {
        'de': 'de',
        'en': 'en',
        'ar': 'ar',
        'es': 'es',
        'fr': 'fr'
    }
    
    def __init__(self, seed_keyword: str, languages: List[str] = None, delay: float = 1.0):
        self.seed_keyword = seed_keyword
        self.languages = languages or ['de', 'en']
        self.delay = delay  # Delay between requests to avoid blocking
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def get_autocomplete_suggestions(self, keyword: str, lang: str = 'en') -> List[str]:
        """Fetch autocomplete suggestions from Google"""
        try:
            # Google autocomplete API endpoint
            url = 'http://suggestqueries.google.com/complete/search'
            params = {
                'client': 'firefox',
                'q': keyword,
                'hl': self.LANG_CODES.get(lang, 'en')
            }
            
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            # Response format: [query, [suggestions]]
            data = response.json()
            suggestions = data[1] if len(data) > 1 else []
            
            logger.info(f"Found {len(suggestions)} suggestions for '{keyword}' ({lang})")
            return suggestions
            
        except Exception as e:
            logger.error(f"Failed to get suggestions for '{keyword}' ({lang}): {e}")
            return []
    
    def expand_keywords(self, base_keyword: str, lang: str) -> Set[str]:
        """Expand keyword using alphabet soup method"""
        all_keywords = set()
        
        # Try base keyword
        suggestions = self.get_autocomplete_suggestions(base_keyword, lang)
        all_keywords.update(suggestions)
        time.sleep(self.delay)
        
        # Try with common prefixes
        prefixes = ['wie', 'was', 'beste', 'tipps'] if lang == 'de' else ['how', 'what', 'best', 'tips']
        for prefix in prefixes:
            query = f"{prefix} {base_keyword}"
            suggestions = self.get_autocomplete_suggestions(query, lang)
            all_keywords.update(suggestions)
            time.sleep(self.delay)
        
        # Try with alphabet soup (a-z)
        for letter in 'abcdefghijklmnopqrstuvwxyz':
            query = f"{base_keyword} {letter}"
            suggestions = self.get_autocomplete_suggestions(query, lang)
            all_keywords.update(suggestions)
            time.sleep(self.delay)
        
        return all_keywords
    
    def research_keywords(self, deep: bool = False) -> Dict[str, List[str]]:
        """Research keywords across all specified languages"""
        results = {}
        
        for lang in self.languages:
            logger.info(f"Researching keywords in {lang.upper()}...")
            
            if deep:
                # Deep search: use alphabet soup
                keywords = self.expand_keywords(self.seed_keyword, lang)
            else:
                # Quick search: just autocomplete
                keywords = self.get_autocomplete_suggestions(self.seed_keyword, lang)
            
            results[lang] = sorted(list(keywords))
            logger.info(f"Collected {len(keywords)} keywords for {lang.upper()}")
        
        return results
    
    def save_results(self, data: Dict, output_path: Path) -> bool:
        """Save keyword research results"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            result = {
                'seed_keyword': self.seed_keyword,
                'languages': self.languages,
                'researched_at': datetime.now().isoformat(),
                'total_keywords': sum(len(kws) for kws in data.values()),
                'keywords': data
            }
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Results saved to: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save results: {e}")
            return False
    
    def analyze_intent(self, keyword: str) -> str:
        """Classify keyword search intent"""
        informational_words = ['what', 'how', 'why', 'when', 'was', 'wie', 'warum', 'wann']
        transactional_words = ['buy', 'course', 'preparation', 'vorbereitung', 'kaufen', 'kurs']
        
        keyword_lower = keyword.lower()
        
        if any(word in keyword_lower for word in transactional_words):
            return 'transactional'
        elif any(word in keyword_lower for word in informational_words):
            return 'informational'
        else:
            return 'navigational'
    
    def prioritize_keywords(self, keywords: Dict[str, List[str]]) -> List[Dict]:
        """Prioritize keywords by intent and characteristics"""
        prioritized = []
        
        for lang, kw_list in keywords.items():
            for kw in kw_list:
                word_count = len(kw.split())
                intent = self.analyze_intent(kw)
                
                # Scoring: long-tail + transactional intent = higher priority
                priority = 3  # Base priority
                if word_count >= 3:
                    priority += 1  # Long-tail bonus
                if intent == 'transactional':
                    priority += 2  # Commercial intent bonus
                elif intent == 'informational':
                    priority += 1  # Info content bonus
                
                # Language priority for FAMED (German most important)
                if lang == 'de':
                    priority += 1
                
                prioritized.append({
                    'keyword': kw,
                    'language': lang,
                    'word_count': word_count,
                    'intent': intent,
                    'priority': min(priority, 5)  # Cap at 5
                })
        
        # Sort by priority (descending)
        prioritized.sort(key=lambda x: (-x['priority'], x['keyword']))
        return prioritized


def main():
    parser = argparse.ArgumentParser(description='Google autocomplete keyword research')
    parser.add_argument('seed_keyword', help='Base keyword to research')
    parser.add_argument('--languages', '-l', nargs='+', default=['de', 'en'],
                       help='Languages to research (de, en, ar, etc.)')
    parser.add_argument('--deep', action='store_true',
                       help='Deep research with alphabet soup (slower but more keywords)')
    parser.add_argument('--delay', '-d', type=float, default=1.0,
                       help='Delay between requests in seconds (default: 1.0)')
    parser.add_argument('--output', '-o',
                       help='Output file path (default: .tmp/keywords_raw_TIMESTAMP.json)')
    parser.add_argument('--prioritize', action='store_true',
                       help='Generate prioritized keyword list')
    
    args = parser.parse_args()
    
    # Default output path
    if not args.output:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        args.output = f'.tmp/keywords_raw_{timestamp}.json'
    
    # Execute keyword research
    researcher = KeywordAutocomplete(
        seed_keyword=args.seed_keyword,
        languages=args.languages,
        delay=args.delay
    )
    
    keywords = researcher.research_keywords(deep=args.deep)
    
    # Prioritize if requested
    if args.prioritize:
        prioritized = researcher.prioritize_keywords(keywords)
        logger.info(f"\nTop 10 Priority Keywords:")
        for i, kw in enumerate(prioritized[:10], 1):
            logger.info(f"{i}. [{kw['priority']}★] {kw['keyword']} ({kw['language']}, {kw['intent']})")
        
        # Save both raw and prioritized
        output_path = Path(args.output)
        researcher.save_results(keywords, output_path)
        
        prioritized_path = output_path.parent / f"keywords_prioritized_{output_path.stem.split('_')[-1]}.json"
        with open(prioritized_path, 'w', encoding='utf-8') as f:
            json.dump({
                'seed_keyword': args.seed_keyword,
                'researched_at': datetime.now().isoformat(),
                'keywords': prioritized
            }, f, indent=2, ensure_ascii=False)
        
        print(json.dumps({
            'status': 'success',
            'raw_file': str(output_path),
            'prioritized_file': str(prioritized_path),
            'total_keywords': sum(len(kws) for kws in keywords.values())
        }))
    else:
        # Save raw results
        output_path = Path(args.output)
        success = researcher.save_results(keywords, output_path)
        
        if success:
            print(json.dumps({
                'status': 'success',
                'output_file': str(output_path),
                'total_keywords': sum(len(kws) for kws in keywords.values())
            }))
            sys.exit(0)
        else:
            sys.exit(1)


if __name__ == '__main__':
    main()
