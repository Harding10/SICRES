-- ============================================
-- SICRES: Roles & Permissions System
-- ============================================

-- 1. Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create pivot table: role_permission
CREATE TABLE IF NOT EXISTS role_permission (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- 4. Add role_id to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id BIGINT;
ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS fk_users_role_id 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL;

-- ============================================
-- Insert default roles
-- ============================================
INSERT INTO roles (name, display_name, description) VALUES
    ('admin', 'Admin Communal', 'Administrateur de la plateforme commune'),
    ('school_director', 'Responsable Établissement', 'Directeur ou responsable d''établissement scolaire')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Insert permissions
-- ============================================
INSERT INTO permissions (name, description) VALUES
    -- User management
    ('users.list', 'Voir la liste des utilisateurs'),
    ('users.create', 'Créer un nouvel utilisateur'),
    ('users.update', 'Modifier un utilisateur'),
    ('users.delete', 'Supprimer un utilisateur'),
    
    -- School management
    ('schools.list', 'Voir la liste des établissements'),
    ('schools.create', 'Créer un établissement'),
    ('schools.update', 'Modifier un établissement'),
    ('schools.delete', 'Supprimer un établissement'),
    ('schools.view_all', 'Voir tous les établissements'),
    
    -- Campaign management
    ('campaigns.list', 'Voir la liste des campagnes'),
    ('campaigns.create', 'Créer une campagne'),
    ('campaigns.update', 'Modifier une campagne'),
    ('campaigns.delete', 'Supprimer une campagne'),
    ('campaigns.open', 'Ouvrir/Fermer une campagne'),
    
    -- Declaration management
    ('declarations.list', 'Voir les déclarations'),
    ('declarations.create', 'Créer une déclaration'),
    ('declarations.update', 'Modifier une déclaration'),
    ('declarations.submit', 'Soumettre une déclaration'),
    ('declarations.validate', 'Valider une déclaration'),
    ('declarations.reject', 'Rejeter une déclaration'),
    
    -- Document management
    ('documents.list', 'Voir les documents'),
    ('documents.upload', 'Charger des documents'),
    ('documents.approve', 'Approuver des documents'),
    ('documents.delete', 'Supprimer des documents'),
    
    -- Analytics & Reports
    ('analytics.view', 'Voir les statistiques'),
    ('reports.generate', 'Générer des rapports'),
    ('reports.export', 'Exporter des données')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Assign permissions to Admin role
-- ============================================
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- ============================================
-- Assign permissions to School Director role
-- ============================================
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p 
WHERE r.name = 'school_director' AND p.name IN (
    'schools.update',
    'campaigns.list',
    'declarations.list',
    'declarations.create',
    'declarations.update',
    'declarations.submit',
    'documents.list',
    'documents.upload',
    'analytics.view'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

