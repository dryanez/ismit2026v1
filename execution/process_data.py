#!/usr/bin/env python3
"""
Data processing script - deterministic data manipulation layer
Cleans, transforms, and analyzes data
"""

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional

try:
    import pandas as pd
except ImportError:
    print("ERROR: Required packages not installed. Run: pip install pandas")
    sys.exit(1)


# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class DataProcessor:
    """Deterministic data processing tool"""
    
    def __init__(self, input_path: str):
        self.input_path = Path(input_path)
        self.df: Optional[pd.DataFrame] = None
        self.metadata: Dict[str, Any] = {}
    
    def load_data(self) -> bool:
        """Load data from file (JSON, CSV, or Excel)"""
        try:
            suffix = self.input_path.suffix.lower()
            
            if suffix == '.json':
                with open(self.input_path, 'r') as f:
                    data = json.load(f)
                    
                # Handle nested JSON from scraper
                if isinstance(data, dict) and 'data' in data:
                    self.metadata = {k: v for k, v in data.items() if k != 'data'}
                    self.df = pd.DataFrame(data['data'])
                else:
                    self.df = pd.DataFrame(data)
            
            elif suffix == '.csv':
                self.df = pd.read_csv(self.input_path)
            
            elif suffix in ['.xlsx', '.xls']:
                self.df = pd.read_excel(self.input_path)
            
            else:
                logger.error(f"Unsupported file format: {suffix}")
                return False
            
            logger.info(f"Loaded {len(self.df)} rows, {len(self.df.columns)} columns")
            return True
            
        except Exception as e:
            logger.error(f"Failed to load data: {e}")
            return False
    
    def clean_data(self, remove_duplicates: bool = True, fill_na: Optional[str] = None) -> pd.DataFrame:
        """Clean and standardize data"""
        if self.df is None:
            logger.error("No data loaded")
            return pd.DataFrame()
        
        original_rows = len(self.df)
        
        # Remove duplicates
        if remove_duplicates:
            self.df = self.df.drop_duplicates()
            logger.info(f"Removed {original_rows - len(self.df)} duplicate rows")
        
        # Handle missing values
        if fill_na is not None:
            self.df = self.df.fillna(fill_na)
            logger.info(f"Filled NA values with: {fill_na}")
        
        # Strip whitespace from string columns
        string_columns = self.df.select_dtypes(include=['object']).columns
        for col in string_columns:
            self.df[col] = self.df[col].apply(lambda x: x.strip() if isinstance(x, str) else x)
        
        logger.info("Data cleaning complete")
        return self.df
    
    def analyze_data(self) -> Dict[str, Any]:
        """Generate basic statistics and insights"""
        if self.df is None:
            return {}
        
        analysis = {
            'row_count': len(self.df),
            'column_count': len(self.df.columns),
            'columns': list(self.df.columns),
            'dtypes': {col: str(dtype) for col, dtype in self.df.dtypes.items()},
            'missing_values': self.df.isnull().sum().to_dict(),
            'memory_usage': f"{self.df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB"
        }
        
        # Numeric column statistics
        numeric_cols = self.df.select_dtypes(include=['number']).columns
        if len(numeric_cols) > 0:
            analysis['numeric_summary'] = self.df[numeric_cols].describe().to_dict()
        
        logger.info("Data analysis complete")
        return analysis
    
    def save_data(self, output_path: Path, format: str = 'csv') -> bool:
        """Save processed data"""
        if self.df is None:
            logger.error("No data to save")
            return False
        
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            if format == 'csv':
                self.df.to_csv(output_path, index=False)
            elif format == 'json':
                result = {
                    'processed_at': datetime.now().isoformat(),
                    'row_count': len(self.df),
                    'data': self.df.to_dict(orient='records')
                }
                result.update(self.metadata)
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(result, f, indent=2, ensure_ascii=False)
            elif format == 'excel':
                self.df.to_excel(output_path, index=False)
            else:
                logger.error(f"Unsupported format: {format}")
                return False
            
            logger.info(f"Saved processed data to: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save data: {e}")
            return False


def main():
    parser = argparse.ArgumentParser(description='Process and analyze data')
    parser.add_argument('input', help='Input file path (JSON, CSV, or Excel)')
    parser.add_argument('--output', '-o', help='Output file path (default: .tmp/processed_TIMESTAMP.csv)')
    parser.add_argument('--format', '-f', choices=['csv', 'json', 'excel'], default='csv',
                       help='Output format')
    parser.add_argument('--no-duplicates', action='store_true', help='Remove duplicate rows')
    parser.add_argument('--fill-na', help='Fill missing values with specified value')
    parser.add_argument('--analyze', action='store_true', help='Print data analysis')
    
    args = parser.parse_args()
    
    # Default output path
    if not args.output:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        ext = {'csv': '.csv', 'json': '.json', 'excel': '.xlsx'}[args.format]
        args.output = f'.tmp/processed_{timestamp}{ext}'
    
    # Execute processing
    processor = DataProcessor(args.input)
    
    if not processor.load_data():
        sys.exit(1)
    
    # Clean data
    processor.clean_data(
        remove_duplicates=args.no_duplicates,
        fill_na=args.fill_na
    )
    
    # Analyze if requested
    if args.analyze:
        analysis = processor.analyze_data()
        print("\n=== Data Analysis ===")
        print(json.dumps(analysis, indent=2))
        print()
    
    # Save results
    output_path = Path(args.output)
    success = processor.save_data(output_path, format=args.format)
    
    if success:
        print(json.dumps({
            'status': 'success',
            'input_file': str(processor.input_path),
            'output_file': str(output_path),
            'rows_processed': len(processor.df)
        }))
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
