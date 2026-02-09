# Directive: Store Data in Supabase

## Goal
Save processed data to Supabase database for long-term storage and querying.

## Inputs
- **Table name**: Target Supabase table
- **Data**: Dictionary or list of dictionaries to insert
- **Operation**: insert, update, upsert, or delete
- **Filters**: Conditions for updates/deletes (optional)

## Tools to Use
- `execution/supabase_operations.py` - Database interaction script
- Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (already configured in .env)

## Process
1. **Validate data**: Ensure data matches table schema
2. **Connect to Supabase**: Use credentials from `.env`
3. **Execute operation**:
   - INSERT: Add new records
   - UPDATE: Modify existing records with filters
   - UPSERT: Insert or update based on unique key
   - DELETE: Remove records matching filters
4. **Handle response**: Check for errors, log results
5. **Return summary**: Number of rows affected, any errors

## Outputs
- **No intermediate files**: Direct database operation
- **Deliverable**: Data persisted in Supabase, accessible via SQL or API

## Edge Cases
- **Duplicate keys**: Use upsert if unique constraints exist
- **Schema mismatch**: Validate fields before sending
- **Connection timeout**: Retry with exponential backoff (max 3 attempts)
- **Large batches**: Split into chunks of 1000 records
- **Permission errors**: Check Row Level Security (RLS) policies
- **Type errors**: Ensure dates, JSON, arrays match Postgres types

## Success Criteria
- Data successfully written to database
- No data loss or corruption
- Fast execution (< 5s for < 10k records)
- Clear error messages if something fails

## Learnings
- Supabase has rate limits: 1000 requests/second for anon key
- Always use parameterized queries to avoid SQL injection
- Batch inserts are much faster than individual ones
- Check RLS policies if getting permission errors despite valid credentials
