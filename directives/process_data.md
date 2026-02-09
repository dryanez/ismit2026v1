# Directive: Process Data and Create Report

## Goal
Take raw data from various sources, clean it, analyze it, and generate a structured report in Google Sheets.

## Inputs
- **Data source**: Path to raw data file(s) in `.tmp/`
- **Report type**: Summary, detailed analysis, or comparison
- **Output destination**: Google Sheet ID or "create new"
- **Filters/criteria**: Any specific filtering or grouping rules

## Tools to Use
- `execution/process_data.py` - Data cleaning and analysis
- `execution/upload_to_sheets.py` - Google Sheets integration
- Requires: `credentials.json` and `token.json` for Google API access

## Process
1. **Load data**: Read from `.tmp/` intermediate files
2. **Clean data**: 
   - Remove duplicates
   - Handle missing values
   - Standardize formats (dates, numbers, text)
3. **Analyze**:
   - Calculate metrics (totals, averages, counts)
   - Group/aggregate as needed
   - Identify patterns or outliers
4. **Format for output**: Structure data for Google Sheets
5. **Upload**: Use `execution/upload_to_sheets.py` to push to cloud
6. **Return link**: Provide shareable link to deliverable

## Outputs
- **Intermediate**: `.tmp/processed_[timestamp].csv` - Cleaned data
- **Deliverable**: Google Sheet with formatted report (shareable link)

## Edge Cases
- **Large datasets**: Batch processing if > 1M rows
- **Google API limits**: Max 100 requests/100s (script should handle rate limiting)
- **Permission errors**: Ensure service account has access to target sheet
- **Corrupted data**: Skip bad rows, log errors, continue processing
- **Empty results**: Return clear message if no data meets criteria

## Success Criteria
- All data cleaned and validated
- Report uploaded to Google Sheets successfully
- User can access and understand the deliverable
- No intermediate files left except in `.tmp/`

## Learnings
- Always validate data types before analysis
- Log all cleaning steps for transparency
- Use pandas for efficient data manipulation
- Keep intermediate files until deliverable is confirmed
