#!/usr/bin/env python3
"""
Generate XML sitemap for SEO
Fetches blog posts from Supabase and creates sitemap.xml
"""

import argparse
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

try:
    from supabase import create_client
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: Required packages not installed. Run: pip install supabase python-dotenv")
    sys.exit(1)


# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SitemapGenerator:
    """Generate XML sitemap for website"""
    
    def __init__(self, base_url: str, use_supabase: bool = False):
        self.base_url = base_url.rstrip('/')
        self.use_supabase = use_supabase
        
        if use_supabase:
            load_dotenv()
            supabase_url = os.getenv('SUPABASE_URL')
            supabase_key = os.getenv('SUPABASE_ANON_KEY')
            
            if not supabase_url or not supabase_key:
                raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env")
            
            self.supabase = create_client(supabase_url, supabase_key)
    
    def fetch_blog_posts_from_supabase(self, table: str = 'blog_posts') -> list:
        """Fetch blog posts from Supabase"""
        try:
            response = self.supabase.table(table).select('slug, updated_at, language').execute()
            logger.info(f"Fetched {len(response.data)} blog posts from Supabase")
            return response.data
        except Exception as e:
            logger.error(f"Failed to fetch from Supabase: {e}")
            return []
    
    def create_url_element(self, parent: Element, loc: str, lastmod: str = None, priority: str = '0.5') -> None:
        """Create a URL element in sitemap"""
        url = SubElement(parent, 'url')
        SubElement(url, 'loc').text = loc
        if lastmod:
            SubElement(url, 'lastmod').text = lastmod
        SubElement(url, 'priority').text = priority
    
    def generate_sitemap(self, static_urls: list = None, blog_posts: list = None) -> str:
        """Generate complete sitemap XML"""
        # Create root element
        urlset = Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
        
        # Add static URLs
        if static_urls:
            for url_data in static_urls:
                self.create_url_element(
                    urlset,
                    f"{self.base_url}{url_data['path']}",
                    url_data.get('lastmod', datetime.now().strftime('%Y-%m-%d')),
                    url_data.get('priority', '0.8')
                )
        
        # Add blog posts
        if blog_posts:
            for post in blog_posts:
                path = f"/blog/{post['slug']}"
                if 'language' in post and post['language']:
                    path = f"/{post['language']}/blog/{post['slug']}"
                
                lastmod = post.get('updated_at', '')
                if lastmod and 'T' in lastmod:
                    lastmod = lastmod.split('T')[0]
                
                self.create_url_element(
                    urlset,
                    f"{self.base_url}{path}",
                    lastmod or datetime.now().strftime('%Y-%m-%d'),
                    '0.7'
                )
        
        # Pretty print XML
        xml_str = minidom.parseString(tostring(urlset, encoding='unicode')).toprettyxml(indent="  ")
        
        # Remove empty lines
        xml_lines = [line for line in xml_str.split('\n') if line.strip()]
        return '\n'.join(xml_lines)
    
    def save_sitemap(self, xml_content: str, output_path: Path) -> bool:
        """Save sitemap to file"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(xml_content)
            
            logger.info(f"Sitemap saved to: {output_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to save sitemap: {e}")
            return False


def main():
    parser = argparse.ArgumentParser(description='Generate XML sitemap')
    parser.add_argument('--base-url', default='https://famedtestprep.com',
                       help='Base URL of website')
    parser.add_argument('--output', '-o', default='public/sitemap.xml',
                       help='Output file path')
    parser.add_argument('--static-urls', help='JSON file with static URLs')
    parser.add_argument('--use-supabase', action='store_true',
                       help='Fetch blog posts from Supabase')
    parser.add_argument('--supabase-table', default='blog_posts',
                       help='Supabase table name for blog posts')
    
    args = parser.parse_args()
    
    # Initialize generator
    generator = SitemapGenerator(args.base_url, use_supabase=args.use_supabase)
    
    # Load static URLs
    static_urls = []
    if args.static_urls and Path(args.static_urls).exists():
        with open(args.static_urls, 'r') as f:
            static_urls = json.load(f)
    else:
        # Default static URLs for FamedTestPrep
        static_urls = [
            {'path': '/', 'priority': '1.0'},
            {'path': '/de', 'priority': '1.0'},
            {'path': '/en', 'priority': '0.9'},
            {'path': '/ar', 'priority': '0.9'},
            {'path': '/de/blog', 'priority': '0.8'},
            {'path': '/en/blog', 'priority': '0.8'},
            {'path': '/ar/blog', 'priority': '0.8'},
            {'path': '/about', 'priority': '0.6'},
            {'path': '/contact', 'priority': '0.5'},
        ]
    
    # Fetch blog posts
    blog_posts = []
    if args.use_supabase:
        blog_posts = generator.fetch_blog_posts_from_supabase(args.supabase_table)
    
    # Generate sitemap
    xml_content = generator.generate_sitemap(static_urls, blog_posts)
    
    # Save sitemap
    output_path = Path(args.output)
    success = generator.save_sitemap(xml_content, output_path)
    
    if success:
        url_count = len(static_urls) + len(blog_posts)
        logger.info(f"✓ Generated sitemap with {url_count} URLs")
        
        print(json.dumps({
            'status': 'success',
            'output_file': str(output_path),
            'url_count': url_count,
            'static_urls': len(static_urls),
            'blog_posts': len(blog_posts)
        }))
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
