-- ============================================
-- SICRES: Documents & Files
-- ============================================

CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    declaration_id BIGINT NOT NULL REFERENCES declarations(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    version INT DEFAULT 1,
    validation_status VARCHAR(20) DEFAULT 'pending' CHECK (validation_status IN ('pending', 'approved', 'rejected')),
    uploaded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    validated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    rejection_reason TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doc_declaration ON documents(declaration_id);
CREATE INDEX IF NOT EXISTS idx_doc_status ON documents(validation_status);
CREATE INDEX IF NOT EXISTS idx_doc_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_doc_uploaded_by ON documents(uploaded_by);

