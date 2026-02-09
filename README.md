# 3-Layer Agent Architecture

A robust system for building reliable AI agents that separates decision-making from execution.

## Overview

This workspace implements a 3-layer architecture designed to maximize reliability by pushing complexity into deterministic code:

**Layer 1: Directives** (What to do)
- SOPs written in Markdown in `directives/`
- Define goals, inputs, tools, outputs, and edge cases
- Natural language instructions for mid-level clarity

**Layer 2: Orchestration** (Decision making)
- The AI agent reads directives and makes intelligent routing decisions
- Calls execution tools in the right order
- Handles errors and asks for clarification
- Updates directives with learnings

**Layer 3: Execution** (Doing the work)
- Deterministic Python scripts in `execution/`
- Handle API calls, data processing, file operations
- Reliable, testable, and well-commented

## Quick Start

### 1. Install Dependencies

```bash
pip install requests beautifulsoup4 pandas supabase python-dotenv
```

### 2. Configure Environment

Copy the template and add your API keys:

```bash
cp .env.template .env
# Edit .env and add your API keys
```

### 3. Run Example Workflows

**Scrape a website:**
```bash
python execution/scrape_single_site.py "https://example.com" \
  --selectors '{"container": "article", "title": "h2", "content": "p"}'
```

**Process scraped data:**
```bash
python execution/process_data.py .tmp/scraped_*.json \
  --output .tmp/processed.csv \
  --no-duplicates \
  --analyze
```

**Store in Supabase:**
```bash
python execution/supabase_operations.py insert your_table \
  --data .tmp/processed.json
```

## Directory Structure

```
Second brain/
├── Agents.md              # Operating instructions (you are here conceptually)
├── directives/            # Layer 1: SOPs and instructions
│   ├── scrape_website.md
│   ├── process_data.md
│   └── supabase_storage.md
├── execution/             # Layer 3: Deterministic scripts
│   ├── scrape_single_site.py
│   ├── process_data.py
│   └── supabase_operations.py
├── .tmp/                  # Intermediate files (not committed)
├── .env                   # Environment variables (not committed)
├── .env.template          # Template for environment setup
└── README.md              # This file
```

## Creating New Directives

Directives should follow this structure:

```markdown
# Directive: [Name]

## Goal
Clear statement of what this accomplishes

## Inputs
- Input 1: Description
- Input 2: Description

## Tools to Use
- `execution/script_name.py` - Description
- Environment variables needed

## Process
1. Step 1
2. Step 2
3. Step 3

## Outputs
- **Intermediate**: Files in .tmp/
- **Deliverable**: Cloud-hosted results

## Edge Cases
- Case 1: How to handle
- Case 2: How to handle

## Success Criteria
- Criterion 1
- Criterion 2

## Learnings
(Updated as you discover new insights)
```

## Creating Execution Scripts

Execution scripts should:

1. **Be deterministic** - Same input = same output
2. **Handle errors gracefully** - Log errors, don't crash
3. **Use proper logging** - INFO for progress, ERROR for issues
4. **Accept CLI arguments** - Use argparse for flexibility
5. **Return JSON results** - Structured output for orchestration
6. **Save to .tmp/** - Use temporary directory for intermediates

Example template:

```python
#!/usr/bin/env python3
import argparse
import logging
import json
import sys

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    parser = argparse.ArgumentParser(description='Script description')
    parser.add_argument('input', help='Input parameter')
    args = parser.parse_args()
    
    try:
        # Do deterministic work
        result = {'status': 'success', 'data': {}}
        print(json.dumps(result))
        sys.exit(0)
    except Exception as e:
        logger.error(f"Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
```

## Self-Annealing Loop

When errors occur:

1. **Fix it** - Debug and resolve the issue
2. **Update the tool** - Improve the script
3. **Test it** - Verify the fix works
4. **Update directive** - Document the learning
5. **System is stronger** - Next time it won't fail

## Principles

✅ **Check for existing tools first** - Before writing new scripts, check `execution/`
✅ **Push complexity to code** - Use scripts instead of LLM generation
✅ **Deliverables live in cloud** - Google Sheets, Supabase, not local files
✅ **Intermediates are disposable** - Everything in `.tmp/` can be regenerated
✅ **Update as you learn** - Directives are living documents

## Why This Works

LLMs are probabilistic (90% accuracy per step → 59% success over 5 steps). This architecture fixes the mismatch by:

- Keeping decision-making in the LLM (orchestration)
- Moving execution to deterministic Python (100% reliability)
- Separating concerns for better testing and maintenance

## Next Steps

1. Add your own directives for common workflows
2. Create execution scripts for repeated tasks
3. Configure your API keys in `.env`
4. Start building reliable agent systems!

---

**Remember:** Be pragmatic. Be reliable. Self-anneal.
