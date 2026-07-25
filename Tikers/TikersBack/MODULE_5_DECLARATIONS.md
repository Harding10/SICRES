# 📝 MODULE 5 - GESTION DES DÉCLARATIONS (Backend)

## DECL-001: Backend - Create Declaration Model

**Priorité:** 🔴 HIGH | **Dépendances:** CAMPAIGN-001, SCHOOL-001 | **Durée:** 2-3 jours

### Database Schema
```sql
CREATE TABLE declarations (
    id BIGSERIAL PRIMARY KEY,
    campaign_id BIGINT NOT NULL REFERENCES campaigns(id),
    etablissement_id BIGINT NOT NULL REFERENCES etablissements(id),
    status ENUM('draft', 'submitted', 'pending_review', 'validated', 'rejected') DEFAULT 'draft',
    
    -- Effectifs
    student_count INT,
    teacher_count INT,
    admin_staff_count INT,
    
    -- Infrastructure
    classrooms_count INT,
    laboratories_count INT,
    libraries_count INT,
    sports_facilities TEXT,
    
    -- Besoins
    priority_needs TEXT,
    observations TEXT,
    
    -- Metadata
    submitted_at TIMESTAMP,
    validated_at TIMESTAMP,
    validated_by BIGINT REFERENCES users(id),
    rejection_reason TEXT,
    
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_decl_campaign ON declarations(campaign_id);
CREATE INDEX idx_decl_school ON declarations(etablissement_id);
CREATE INDEX idx_decl_status ON declarations(status);
CREATE UNIQUE INDEX idx_decl_unique ON declarations(campaign_id, etablissement_id);
```

### Model
- [ ] Create `app/Models/Declaration.php`
- [ ] Relations: `belongsTo(Campaign)`, `belongsTo(Établissement)`, `hasMany(Document)`
- [ ] Scopes: `draft()`, `submitted()`, `pending()`, `validated()`, `rejected()`

---

## DECL-002: Backend - Declaration CRUD & Draft Save

**Priorité:** 🔴 HIGH | **Dépendances:** DECL-001 | **Durée:** 2-3 jours

### API Endpoints
```
POST /api/declarations
{
  "campaign_id": 1,
  "etablissement_id": 1,
  "student_count": 450,
  "teacher_count": 25,
  ...
}

PATCH /api/declarations/{id}/save-draft
(Auto-save every few seconds from frontend)

GET /api/declarations/{id}

PUT /api/declarations/{id}
(Update only if draft status)
```

### Features
- [ ] Draft auto-save from frontend (no submission)
- [ ] Validation on full data before submission
- [ ] Can't modify after submission
- [ ] School can only modify own declarations
- [ ] Version tracking (audit trail)

---

## DECL-003: Backend - Declaration Submission

**Priorité:** 🔴 HIGH | **Dépendances:** DECL-002 | **Durée:** 2 jours

### Endpoint
```
POST /api/declarations/{id}/submit
Response: 200 { status: "submitted" }
```

### Logic
- [ ] Validate all required fields are filled
- [ ] Mark as 'submitted'
- [ ] Lock for editing
- [ ] Record submission timestamp
- [ ] Send notification to admin
- [ ] Create audit log entry

---

## DECL-006: Backend - Declaration History & Audit

**Priorité:** 🟡 MEDIUM | **Dépendances:** DECL-002 | **Durée:** 1-2 jours

### Tables
```sql
CREATE TABLE declaration_audits (
    id BIGSERIAL PRIMARY KEY,
    declaration_id BIGINT REFERENCES declarations(id),
    action VARCHAR(50), -- created, updated, submitted, validated, rejected
    old_values JSONB,
    new_values JSONB,
    user_id BIGINT REFERENCES users(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP
);
```

### Features
- [ ] Log all changes (created, updated, submitted)
- [ ] Store old and new values (JSONB)
- [ ] Track who made the change and when
- [ ] API endpoint to view audit trail
- [ ] Admin can see full history

