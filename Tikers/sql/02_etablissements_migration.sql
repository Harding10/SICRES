-- ============================================
-- SICRES: Établissements (Schools) Table
-- ============================================

CREATE TABLE IF NOT EXISTS etablissements (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('public', 'privé')),
    level VARCHAR(100) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address TEXT,
    director_id BIGINT,
    director_name VARCHAR(255),
    director_phone VARCHAR(20),
    director_email VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_year SMALLINT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (director_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_etablissements_type ON etablissements(type);
CREATE INDEX IF NOT EXISTS idx_etablissements_city ON etablissements(city);
CREATE INDEX IF NOT EXISTS idx_etablissements_level ON etablissements(level);
CREATE INDEX IF NOT EXISTS idx_etablissements_director_id ON etablissements(director_id);
CREATE INDEX IF NOT EXISTS idx_etablissements_status ON etablissements(status);
CREATE INDEX IF NOT EXISTS idx_etablissements_deleted_at ON etablissements(deleted_at);

