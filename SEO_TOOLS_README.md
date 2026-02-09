# SEO Automation Tools for ISMIT 2026

This folder contains SEO automation tools integrated with the ISMIT 2026 Next.js project.

## Tools Available

### 1. Keyword Research
```bash
python3 execution/keyword_autocomplete.py "your topic" --languages de en --prioritize
```

### 2. Competitor Analysis
```bash
python3 execution/competitor_analysis.py competitor-url-1 competitor-url-2
```

### 3. Data Processing
```bash
python3 execution/process_data.py input-file.json --output processed.csv
```

### 4. Supabase Operations
```bash
python3 execution/supabase_operations.py insert table_name --data data.json
```

### 5. Sitemap Generation
```bash
python3 execution/generate_sitemap.py --use-supabase --output public/sitemap.xml
```

## Quick Start

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment:**
   ```bash
   cp .env.template .env
   # Edit .env with your API keys
   ```

3. **Run keyword research:**
   ```bash
   python3 execution/keyword_autocomplete.py "your keyword" --languages de en --prioritize
   ```

## Integration with Next.js

The tools are designed to work alongside your Next.js project:

- **Directives:** SOPs for using the tools (in `directives/`)
- **Execution:** Python scripts for automation (in `execution/`)
- **Output:** Results saved to `.tmp/` folder

## Next.js SEO Setup

This project is already using Next.js, which is perfect for SEO! See `REACT_SEO_GUIDE.md` for:
- Meta tag implementation
- Structured data (JSON-LD)
- Multilingual setup
- Sitemap integration

## Documentation

- **README.md** - General 3-layer architecture overview
- **REACT_SEO_GUIDE.md** - Next.js SEO implementation guide
- **directives/** - Step-by-step workflows for each tool

Enjoy automating your SEO! 🚀
