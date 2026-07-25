# 📄 MODULE 6 - GESTION DOCUMENTAIRE (Backend)

## DOC-001: Backend - Create Document Model & Storage

**Priorité:** 🔴 HIGH | **Dépendances:** DECL-001 | **Durée:** 2 jours

### Database Schema
```sql
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    declaration_id BIGINT NOT NULL REFERENCES declarations(id),
    type VARCHAR(100), -- decree, approval, plan, photos, reports
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    version INT DEFAULT 1,
    validation_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    uploaded_by BIGINT REFERENCES users(id),
    validated_by BIGINT REFERENCES users(id),
    rejection_reason TEXT,
    uploaded_at TIMESTAMP,
    validated_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_doc_declaration ON documents(declaration_id);
CREATE INDEX idx_doc_status ON documents(validation_status);
```

### File Storage
- [ ] Use Laravel Storage (S3 or local)
- [ ] Directory structure: `/declarations/{campaign_id}/{school_id}/{doc_type}/`
- [ ] Secure: use signed URLs, no direct access

