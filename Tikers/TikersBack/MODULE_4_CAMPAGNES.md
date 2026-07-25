# 📅 MODULE 4 - GESTION DES CAMPAGNES (Backend)

## CAMPAIGN-001: Backend - Create Campaign Model

**Priorité:** 🔴 HIGH | **Dépendances:** SCHOOL-001 | **Durée:** 2-3 jours

### Database Schema
```sql
CREATE TABLE campaigns (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reference_year SMALLINT NOT NULL,
    opening_date TIMESTAMP NOT NULL,
    closing_date TIMESTAMP NOT NULL,
    status ENUM('draft', 'active', 'closed') DEFAULT 'draft',
    is_archived BOOLEAN DEFAULT FALSE,
    archived_at TIMESTAMP,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_reference_year ON campaigns(reference_year);
CREATE INDEX idx_campaigns_is_archived ON campaigns(is_archived);
```

### Model & Migrations
- [ ] Create `app/Models/Campaign.php`
  - Relations: `hasMany(Declaration)`, `belongsTo(User, 'created_by')`
  - Scopes: `active()`, `draft()`, `closed()`, `archived()`, `currentYear()`
  - Accessors: `isOpen()`, `isClosed()`, `isDraft()`
- [ ] Create migration file

---

## CAMPAIGN-002: Backend - Campaign CRUD & Scheduling

**Priorité:** 🔴 HIGH | **Dépendances:** CAMPAIGN-001 | **Durée:** 3-4 jours

### API Endpoints
```
GET /api/campaigns
Query: status, year, is_archived
Response: paginated list

POST /api/campaigns
{
  "title": "Campagne de Recensement 2026",
  "description": "...",
  "reference_year": 2026,
  "opening_date": "2026-08-01T00:00:00Z",
  "closing_date": "2026-12-31T23:59:59Z"
}
Response: 201 { id, ... }

PUT /api/campaigns/{id}
Response: 200 { ... }

DELETE /api/campaigns/{id}
Response: 204

POST /api/campaigns/{id}/archive
Response: 200 { message: "archived" }
```

### Scheduled Jobs
- [ ] Create `app/Jobs/OpenCampaignJob.php`
  - Triggered by opening_date
  - Updates status to 'active'
  - Send notifications to schools

- [ ] Create `app/Jobs/CloseCampaignJob.php`
  - Triggered by closing_date
  - Updates status to 'closed'
  - Archive pending declarations
  - Send summary email to admin

### Controller & Requests
- [ ] `CampaignController` - CRUD operations
- [ ] `StoreCampaignRequest` - validation
- [ ] `UpdateCampaignRequest` - validation

### Tests
- [ ] CRUD operations work
- [ ] Can't change dates if campaign has declarations
- [ ] Jobs fire at correct times
- [ ] Archive works correctly

---

## CAMPAIGN-003: Backend - Campaign Status Management

**Priorité:** 🟡 MEDIUM | **Dépendances:** CAMPAIGN-002 | **Durée:** 1-2 jours

### State Machine
```
draft → active → closed → archived
  ↑                ↓
  └────────────────┘ (reopen)
```

### Validation Rules
- [ ] Can't transition if declaration status conflicts
- [ ] Can't delete campaign with declarations
- [ ] Admin only can force state changes
- [ ] Log all transitions

### Endpoints
```
POST /api/campaigns/{id}/open
POST /api/campaigns/{id}/close
POST /api/campaigns/{id}/reopen
POST /api/campaigns/{id}/archive
```

