-- ============================================
-- SICRES: Campaigns & Declarations
-- ============================================

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reference_year SMALLINT NOT NULL,
    opening_date TIMESTAMP NOT NULL,
    closing_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
    is_archived BOOLEAN DEFAULT FALSE,
    archived_at TIMESTAMP,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_reference_year ON campaigns(reference_year);
CREATE INDEX IF NOT EXISTS idx_campaigns_is_archived ON campaigns(is_archived);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_by ON campaigns(created_by);

-- Declarations Table
CREATE TABLE IF NOT EXISTS declarations (
    id BIGSERIAL PRIMARY KEY,
    campaign_id BIGINT NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    etablissement_id BIGINT NOT NULL REFERENCES etablissements(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending_review', 'validated', 'rejected')),
    
    -- Effectifs
    student_count INT,
    teacher_count INT,
    admin_staff_count INT,
    
    -- Infrastructure
    classrooms_count INT,
    laboratories_count INT,
    libraries_count INT,
    sports_facilities TEXT,
    
    -- Observations
    priority_needs TEXT,
    observations TEXT,
    
    -- Validation
    submitted_at TIMESTAMP,
    validated_at TIMESTAMP,
    validated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    rejection_reason TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(campaign_id, etablissement_id)
);

CREATE INDEX IF NOT EXISTS idx_decl_campaign ON declarations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_decl_school ON declarations(etablissement_id);
CREATE INDEX IF NOT EXISTS idx_decl_status ON declarations(status);
CREATE INDEX IF NOT EXISTS idx_decl_submitted_at ON declarations(submitted_at);

-- Declaration Audit Table
CREATE TABLE IF NOT EXISTS declaration_audits (
    id BIGSERIAL PRIMARY KEY,
    declaration_id BIGINT NOT NULL REFERENCES declarations(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_decl_audit_declaration ON declaration_audits(declaration_id);
CREATE INDEX IF NOT EXISTS idx_decl_audit_user ON declaration_audits(user_id);
CREATE INDEX IF NOT EXISTS idx_decl_audit_created_at ON declaration_audits(created_at);

