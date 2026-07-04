-- Enable trigram extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Candidate search indexes
CREATE INDEX IF NOT EXISTS candidate_fullname_trgm_idx
ON "Candidate"
USING gin ("fullName" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS candidate_email_trgm_idx
ON "Candidate"
USING gin ("email" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS candidate_phone_trgm_idx
ON "Candidate"
USING gin ("phone" gin_trgm_ops);