# Quick Start: SEO Tools for ISMIT 2026

## 🚀 Get Started in 3 Steps

### Step 1: Install Python Dependencies
```bash
cd "/Users/dr.yanez/Second brain/ismit2026v1"
pip install requests beautifulsoup4 pandas supabase python-dotenv
```

### Step 2: Set Up Environment
```bash
# Copy the environment template
cp .env.template .env.local

# Your Supabase credentials are already in .env.template
# Add any additional API keys you need
```

### Step 3: Run Your First Keyword Research
```bash
# Research keywords for your topic
python3 execution/keyword_autocomplete.py "your topic" \
  --languages de en \
  --prioritize

# Results will be saved to .tmp/keywords_*.json
```

## 📊 Available Tools

### 1. Keyword Research (Google Autocomplete)
```bash
python3 execution/keyword_autocomplete.py "ISMIT 2026" \
  --languages de en ar \
  --deep \
  --prioritize
```
**Outputs:** `.tmp/keywords_raw_*.json` and `.tmp/keywords_prioritized_*.json`

### 2. Competitor Analysis
```bash
python3 execution/competitor_analysis.py \
  https://competitor-url-1.com \
  https://competitor-url-2.com \
  --output .tmp/competitor_analysis.json
```
**Outputs:** `.tmp/competitor_analysis_*.json`

### 3. Generate Sitemap
```bash
# Generate sitemap from Supabase blog posts
python3 execution/generate_sitemap.py \
  --use-supabase \
  --base-url https://yourdomain.com \
  --output public/sitemap.xml
```
**Outputs:** `public/sitemap.xml`

### 4. Process Data
```bash
python3 execution/process_data.py .tmp/scraped_data.json \
  --output .tmp/processed.csv \
  --no-duplicates \
  --analyze
```

### 5. Supabase Operations
```bash
# Insert data into Supabase
python3 execution/supabase_operations.py insert keywords \
  --data .tmp/keywords_prioritized.json

# Query data
python3 execution/supabase_operations.py select keywords --limit 10
```

## 📂 Project Structure

```
ismit2026v1/
├── directives/           # SOPs for using the tools
│   ├── keyword_research_seo.md
│   ├── process_data.md
│   ├── scrape_website.md
│   └── supabase_storage.md
├── execution/            # Python automation scripts
│   ├── keyword_autocomplete.py
│   ├── competitor_analysis.py
│   ├── generate_sitemap.py
│   ├── process_data.py
│   ├── scrape_single_site.py
│   └── supabase_operations.py
├── .tmp/                 # Output files (temporary)
├── app/                  # Next.js app directory
├── public/               # Static files & sitemap
└── .env.local            # Environment variables
```

## 🎯 Example Workflow: Complete SEO Research

```bash
# 1. Research keywords for your topic
python3 execution/keyword_autocomplete.py "ISMIT conference" \
  --languages de en \
  --prioritize

# 2. Analyze top 3 competitors
python3 execution/competitor_analysis.py \
  https://competitor1.com/blog \
  https://competitor2.com/blog \
  https://competitor3.com/blog

# 3. Review results
cat .tmp/keywords_prioritized_*.json
cat .tmp/competitor_analysis_*.json

# 4. Store keywords in Supabase for tracking
python3 execution/supabase_operations.py insert seo_keywords \
  --data .tmp/keywords_prioritized_*.json

# 5. Generate sitemap for your Next.js site
python3 execution/generate_sitemap.py \
  --use-supabase \
  --output public/sitemap.xml
```

## 🔍 Understanding the Output

### Keyword Research Output
```json
{
  "keyword": "ISMIT 2026 conference",
  "language": "en",
  "word_count": 3,
  "intent": "informational",
  "priority": 5
}
```
- **Priority 5:** Highest priority (long-tail + high intent)
- **Priority 3:** Medium priority
- **Priority 1:** Low priority

### Competitor Analysis Output
Shows:
- Meta titles & descriptions
- Word count & content structure
- Top keywords used
- Heading hierarchy (H1-H6)
- Internal/external links

## 📖 Documentation

- **SEO_TOOLS_README.md** - This file
- **REACT_SEO_GUIDE.md** - Next.js SEO implementation
- **README.md** - 3-layer architecture overview
- **directives/** - Detailed workflows for each tool

## 🐛 Troubleshooting

### Python not found
```bash
# Use python3 instead of python
which python3
```

### Missing dependencies
```bash
pip install -r requirements.txt
```

### Supabase connection error
```bash
# Make sure .env.local has your credentials
cat .env.local | grep SUPABASE
```

## 🎉 You're Ready!

Start with keyword research and explore from there. All tools work independently and save results to `.tmp/` for review.

Need help? Check the directive files in `directives/` for step-by-step workflows.
