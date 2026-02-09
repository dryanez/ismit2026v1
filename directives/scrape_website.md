# Directive: Scrape Website Content

## Goal
Extract specific data from a website and save it to a structured format for further processing.

## Inputs
- **URL**: Target website URL
- **Data points**: What specific information to extract (e.g., titles, prices, descriptions)
- **Output format**: JSON, CSV, or other structured format
- **Max pages**: Number of pages to scrape (default: 1)

## Tools to Use
- `execution/scrape_single_site.py` - Main scraping script
- Environment variables in `.env`: `BROWSERLESS_API_KEY` (if using headless browser)

## Process
1. **Validate inputs**: Ensure URL is valid and data points are clearly defined
2. **Choose method**: 
   - Static content → Use `requests` + `BeautifulSoup`
   - Dynamic/JS content → Use `playwright` or Browserless API
3. **Run script**: Execute `execution/scrape_single_site.py` with parameters
4. **Save to .tmp/**: Store raw scraped data in `.tmp/scraped_[timestamp].json`
5. **Return result**: Provide path to scraped data file

## Outputs
- **Intermediate**: `.tmp/scraped_[timestamp].json` - Raw scraped data
- **Deliverable**: Processed data uploaded to Google Sheets or other cloud service

## Edge Cases
- **Rate limiting**: If hit, implement exponential backoff (script should handle)
- **Captchas**: May need human intervention or Browserless API
- **Changed structure**: If website structure changes, update selectors in script
- **Timeout**: Set reasonable timeout (30s default)
- **404/errors**: Log and skip, don't crash entire job

## Success Criteria
- Data extracted matches requested fields
- No crashes on common errors
- Results saved to specified location

## Learnings
- Always check robots.txt before scraping
- Include user-agent headers to avoid blocks
- Cache results to avoid re-scraping during development
