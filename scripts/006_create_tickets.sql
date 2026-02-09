-- Create tickets table for digital ticket management
-- This stores all issued tickets with QR codes for check-in

CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Ticket identification
  ticket_number VARCHAR(20) UNIQUE NOT NULL, -- Human readable: ISMIT-2026-XXXX
  qr_code_data TEXT NOT NULL, -- Encrypted/signed data for QR code
  
  -- Link to order
  order_id VARCHAR(100) NOT NULL,
  
  -- Attendee information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  affiliation VARCHAR(255),
  country VARCHAR(10),
  
  -- Ticket details
  ticket_type VARCHAR(100) NOT NULL, -- e.g., "iSMIT Member", "Student/Resident"
  base_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Add-ons (stored as JSON array)
  add_ons JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled', 'refunded')),
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by VARCHAR(100),
  
  -- Wallet pass tracking
  apple_pass_serial VARCHAR(100),
  google_pass_id VARCHAR(100),
  
  -- Email tracking
  email_sent_at TIMESTAMP WITH TIME ZONE,
  email_resend_id VARCHAR(100),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_number ON tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_tickets_order_id ON tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_email ON tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_qr_code ON tickets(qr_code_data);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS tickets_updated_at ON tickets;
CREATE TRIGGER tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_tickets_updated_at();

-- Create check-in log table for audit trail
CREATE TABLE IF NOT EXISTS ticket_check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id),
  action VARCHAR(20) NOT NULL CHECK (action IN ('check_in', 'undo_check_in')),
  performed_by VARCHAR(100),
  device_info TEXT,
  location VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_check_ins_ticket_id ON ticket_check_ins(ticket_id);

-- RLS Policies (adjust based on your auth setup)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_check_ins ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for API)
CREATE POLICY "Service role can manage tickets" ON tickets
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage check-ins" ON ticket_check_ins
  FOR ALL
  USING (true)
  WITH CHECK (true);
