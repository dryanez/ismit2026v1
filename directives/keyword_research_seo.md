# Directive: SEO Keyword Research and Analysis

## Goal
Automatically discover, analyze, and prioritize keywords for SEO content strategy across multiple languages.

## Inputs
- **Seed keyword**: Base keyword to expand from (e.g., "FAMED test", "FAMED vorbereitung")
- **Languages**: Target languages (de, en, ar)
- **Competitors**: List of competitor URLs to analyze
- **Output destination**: Where to save results (JSON, CSV, or Supabase)

## Tools to Use
- `execution/keyword_autocomplete.py` - Scrape Google autocomplete suggestions
- `execution/competitor_analysis.py` - Analyze competitor page content and keywords
- `execution/supabase_operations.py` - Store keyword data in database (optional)

## Process

### 1. Generate Keyword Ideas
- Run `keyword_autocomplete.py` with seed keyword
- Scrape Google autocomplete for related searches
- Collect suggestions for all specified languages
- Save raw results to `.tmp/keywords_raw_[timestamp].json`

### 2. Competitor Content Analysis
- Run `competitor_analysis.py` with competitor URLs
- Extract:
  - Meta titles and descriptions
  - H1/H2 headings
  - Word count
  - Key phrases used
  - Internal link structure
- Save to `.tmp/competitor_analysis_[timestamp].json`

### 3. Keyword Prioritization
- Combine autocomplete suggestions with competitor keywords
- Score keywords based on:
  - Search intent (informational vs transactional)
  - Competition level (how many competitors target it)
  - Long-tail vs short-tail
  - Language priority (German > English > Arabic for FAMED)
- Create prioritized keyword list

### 4. Store and Report
- Save final keyword list to Supabase `keywords` table (optional)
- OR export to CSV/JSON for manual review
- Generate summary report with top opportunities

## Outputs
- **Intermediate**: `.tmp/keywords_raw_[timestamp].json` - Raw autocomplete data
- **Intermediate**: `.tmp/competitor_analysis_[timestamp].json` - Competitor insights
- **Deliverable**: `keywords_prioritized.csv` or Supabase table with ranked keywords

## Edge Cases
- **Google blocking**: If Google blocks requests, implement delays or use residential proxies
- **No autocomplete results**: Try variations of seed keyword
- **Competitor site blocks scraping**: Use read_url_content or manual input
- **Language detection**: Ensure proper language codes (de-DE, en-US, ar-SA)
- **Duplicate keywords**: Deduplicate and merge similar variations

## Success Criteria
- 50+ keyword ideas per seed keyword
- Clear priority ranking (1-5 scale)
- Competitor gap analysis showing opportunities
- Data ready for content planning

## Learnings
- Google autocomplete reflects actual user searches (high-value data)
- Long-tail keywords (3-5 words) easier to rank than short keywords
- Competitor analysis reveals content gaps to exploit
- Regular updates needed (run monthly) as search trends change
