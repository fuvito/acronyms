-- Create the acronyms table
CREATE TABLE IF NOT EXISTS acronym (
    id BIGSERIAL PRIMARY KEY,
    acronym VARCHAR(100) NOT NULL,
    definition VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_acronym_definition UNIQUE (acronym, definition)
);

-- Create an index on the acronym column for faster lookups
CREATE INDEX IF NOT EXISTS idx_acronym ON acronym(acronym);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_acronym_updated_at ON acronym;
CREATE TRIGGER update_acronym_updated_at
BEFORE UPDATE ON acronym
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
-- INSERT INTO acronym (acronym, definition, description) VALUES 
-- ('API', 'Application Programming Interface', 'A set of rules that allows different software applications to communicate with each other'),
-- ('REST', 'Representational State Transfer', 'An architectural style for designing networked applications'),
-- ('SQL', 'Structured Query Language', 'A standard language for managing and manipulating relational databases');
