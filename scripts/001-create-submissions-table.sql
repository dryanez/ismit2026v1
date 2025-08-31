-- Create submissions table for startup pitch submissions
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  startup_name VARCHAR(255) NOT NULL,
  presenter_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  video_url TEXT,
  video_filename VARCHAR(255),
  elevator_pitch TEXT NOT NULL,
  congress_themes TEXT[], -- Array of themes: AI, robotics, surgery, med-tech, digital health
  submission_status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_registration_number ON submissions(registration_number);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(submission_status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_submissions_updated_at 
    BEFORE UPDATE ON submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
