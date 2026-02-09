#!/usr/bin/env python3
"""
Supabase operations script - deterministic database layer
Handles all CRUD operations with Supabase
"""

import argparse
import json
import logging
import os
import sys
from typing import Dict, List, Optional, Any

try:
    from supabase import create_client, Client
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: Required packages not installed. Run: pip install supabase python-dotenv")
    sys.exit(1)


# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SupabaseManager:
    """Deterministic Supabase database operations"""
    
    def __init__(self):
        url = os.getenv('SUPABASE_URL')
        key = os.getenv('SUPABASE_ANON_KEY')
        
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file")
        
        self.client: Client = create_client(url, key)
        logger.info("Connected to Supabase")
    
    def insert(self, table: str, data: List[Dict]) -> Dict[str, Any]:
        """Insert records into table"""
        try:
            response = self.client.table(table).insert(data).execute()
            logger.info(f"Inserted {len(data)} records into {table}")
            return {
                'status': 'success',
                'operation': 'insert',
                'rows_affected': len(data),
                'data': response.data
            }
        except Exception as e:
            logger.error(f"Insert failed: {e}")
            return {
                'status': 'error',
                'operation': 'insert',
                'error': str(e)
            }
    
    def update(self, table: str, data: Dict, filters: Dict) -> Dict[str, Any]:
        """Update records matching filters"""
        try:
            query = self.client.table(table).update(data)
            
            # Apply filters
            for key, value in filters.items():
                query = query.eq(key, value)
            
            response = query.execute()
            logger.info(f"Updated records in {table}")
            return {
                'status': 'success',
                'operation': 'update',
                'rows_affected': len(response.data),
                'data': response.data
            }
        except Exception as e:
            logger.error(f"Update failed: {e}")
            return {
                'status': 'error',
                'operation': 'update',
                'error': str(e)
            }
    
    def upsert(self, table: str, data: List[Dict]) -> Dict[str, Any]:
        """Insert or update records (requires unique constraint)"""
        try:
            response = self.client.table(table).upsert(data).execute()
            logger.info(f"Upserted {len(data)} records into {table}")
            return {
                'status': 'success',
                'operation': 'upsert',
                'rows_affected': len(data),
                'data': response.data
            }
        except Exception as e:
            logger.error(f"Upsert failed: {e}")
            return {
                'status': 'error',
                'operation': 'upsert',
                'error': str(e)
            }
    
    def delete(self, table: str, filters: Dict) -> Dict[str, Any]:
        """Delete records matching filters"""
        try:
            query = self.client.table(table).delete()
            
            # Apply filters
            for key, value in filters.items():
                query = query.eq(key, value)
            
            response = query.execute()
            logger.info(f"Deleted records from {table}")
            return {
                'status': 'success',
                'operation': 'delete',
                'rows_affected': len(response.data),
                'data': response.data
            }
        except Exception as e:
            logger.error(f"Delete failed: {e}")
            return {
                'status': 'error',
                'operation': 'delete',
                'error': str(e)
            }
    
    def select(self, table: str, columns: str = '*', filters: Optional[Dict] = None, limit: Optional[int] = None) -> Dict[str, Any]:
        """Query records from table"""
        try:
            query = self.client.table(table).select(columns)
            
            # Apply filters if provided
            if filters:
                for key, value in filters.items():
                    query = query.eq(key, value)
            
            # Apply limit if provided
            if limit:
                query = query.limit(limit)
            
            response = query.execute()
            logger.info(f"Retrieved {len(response.data)} records from {table}")
            return {
                'status': 'success',
                'operation': 'select',
                'rows_returned': len(response.data),
                'data': response.data
            }
        except Exception as e:
            logger.error(f"Select failed: {e}")
            return {
                'status': 'error',
                'operation': 'select',
                'error': str(e)
            }


def main():
    parser = argparse.ArgumentParser(description='Supabase database operations')
    parser.add_argument('operation', choices=['insert', 'update', 'upsert', 'delete', 'select'],
                       help='Database operation to perform')
    parser.add_argument('table', help='Table name')
    parser.add_argument('--data', '-d', help='JSON data for insert/update/upsert (file path or JSON string)')
    parser.add_argument('--filters', '-f', help='JSON filters for update/delete/select', default='{}')
    parser.add_argument('--columns', '-c', default='*', help='Columns to select (comma-separated or *)')
    parser.add_argument('--limit', '-l', type=int, help='Limit number of results for select')
    
    args = parser.parse_args()
    
    # Parse filters
    try:
        filters = json.loads(args.filters)
    except json.JSONDecodeError:
        logger.error("Invalid JSON in filters argument")
        sys.exit(1)
    
    # Parse data
    data = None
    if args.data:
        # Check if it's a file path
        if os.path.isfile(args.data):
            with open(args.data, 'r') as f:
                data = json.load(f)
        else:
            # Try parsing as JSON string
            try:
                data = json.loads(args.data)
            except json.JSONDecodeError:
                logger.error("Invalid JSON in data argument")
                sys.exit(1)
    
    # Execute operation
    try:
        db = SupabaseManager()
        
        if args.operation == 'insert':
            if not data:
                logger.error("Insert requires --data argument")
                sys.exit(1)
            result = db.insert(args.table, data if isinstance(data, list) else [data])
        
        elif args.operation == 'update':
            if not data or not filters:
                logger.error("Update requires --data and --filters arguments")
                sys.exit(1)
            result = db.update(args.table, data, filters)
        
        elif args.operation == 'upsert':
            if not data:
                logger.error("Upsert requires --data argument")
                sys.exit(1)
            result = db.upsert(args.table, data if isinstance(data, list) else [data])
        
        elif args.operation == 'delete':
            if not filters:
                logger.error("Delete requires --filters argument")
                sys.exit(1)
            result = db.delete(args.table, filters)
        
        elif args.operation == 'select':
            result = db.select(args.table, args.columns, filters, args.limit)
        
        # Output result
        print(json.dumps(result, indent=2))
        
        # Exit with appropriate code
        sys.exit(0 if result['status'] == 'success' else 1)
        
    except Exception as e:
        logger.error(f"Operation failed: {e}")
        print(json.dumps({
            'status': 'error',
            'error': str(e)
        }))
        sys.exit(1)


if __name__ == '__main__':
    main()
