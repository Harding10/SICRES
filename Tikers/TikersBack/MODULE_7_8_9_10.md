# ✅ MODULE 7 - VALIDATION | 📈 MODULE 8 - DASHBOARD | 📊 MODULE 9 - STATS | 💾 MODULE 10 - EXPORTS

## VAL-001: Backend - Declaration Validation Workflow

**Priorité:** 🔴 HIGH | **Dépendances:** DECL-003 | **Durée:** 2 jours

### Endpoint
```
POST /api/declarations/{id}/validate
{ "approved": true, "notes": "..." }

POST /api/declarations/{id}/reject
{ "reason": "Documents incomplets", "notes": "..." }
```

### Logic
- [ ] Admin approves/rejects submitted declarations
- [ ] Update status: pending_review → validated/rejected
- [ ] Track who validated and when
- [ ] Send notification to school
- [ ] Log in audit table

### Database Changes
```sql
ALTER TABLE declarations 
ADD COLUMN validated_by BIGINT,
ADD COLUMN validated_at TIMESTAMP,
ADD COLUMN rejection_reason TEXT;
```

---

## VAL-002: Backend - Rejection & Correction Requests

**Priorité:** 🟡 MEDIUM | **Dépendances:** VAL-001 | **Durée:** 1-2 jours

### Features
- [ ] Rejection stores detailed reason
- [ ] School receives notification with reason
- [ ] School can resubmit corrected declaration
- [ ] Track correction history (how many times resubmitted)
- [ ] API endpoint to get correction reasons

---

## DASH-001: Backend - Dashboard Statistics Endpoints

**Priorité:** 🔴 HIGH | **Dépendances:** DECL-001, CAMPAIGN-002 | **Durée:** 2 jours

### Endpoints
```
GET /api/dashboard/stats
{
  "total_schools": 250,
  "public_schools": 180,
  "private_schools": 70,
  "total_students": 45000,
  "total_teachers": 2100,
  "participation_rate": 85.5,
  "submitted_declarations": 212,
  "validated_declarations": 180,
  "pending_declarations": 32,
  "rejected_declarations": 5
}

GET /api/dashboard/by-level
{
  "primaire": { schools: 100, students: 20000 },
  "secondaire": { schools: 100, students: 20000 },
  "technique": { schools: 50, students: 5000 }
}

GET /api/dashboard/by-type
{
  "public": { count: 180, students: 35000 },
  "private": { count: 70, students: 10000 }
}

GET /api/dashboard/by-city
{
  "Yamoussoukro": { count: 50, participation: 95 },
  "Abidjan": { count: 150, participation: 82 },
  ...
}
```

### Caching
- [ ] Use Redis cache for expensive queries
- [ ] Invalidate cache when declarations change
- [ ] Cache valid for 1 hour (configurable)

---

## STAT-001: Backend - Statistics Engine

**Priorité:** 🔴 HIGH | **Dépendances:** DASH-001 | **Durée:** 2-3 jours

### Features
- [ ] Distribution by education level
- [ ] Geographic aggregation by city/district
- [ ] Student/teacher ratio analysis
- [ ] Infrastructure availability stats
- [ ] Evolution year-over-year

### Endpoints
```
GET /api/statistics/distribution?year=2026&type=level
GET /api/statistics/geographic?year=2026
GET /api/statistics/evolution?campaign_id=1&previous_campaign_id=2
GET /api/statistics/infrastructure?year=2026
```

---

## STAT-003: Backend - Comparative Analysis

**Priorité:** 🟡 MEDIUM | **Dépendances:** STAT-001 | **Durée:** 2 jours

### Features
- [ ] Compare campaigns year-over-year
- [ ] Identify trends (increasing/decreasing)
- [ ] Anomaly detection (sudden changes)
- [ ] Top/bottom schools by metrics

---

## EXPORT-001: Backend - Export to Excel

**Priorité:** 🔴 HIGH | **Dépendances:** STAT-001 | **Durée:** 2 jours

### Endpoint
```
GET /api/exports/excel?year=2026&type=schools
Response: Excel file download
```

### Content
- [ ] School list sheet
- [ ] Declarations summary
- [ ] Statistics sheet
- [ ] Infrastructure analysis
- [ ] Formatted, colored, professional

### Library
- [ ] Use `laravel-excel` or `phpoffice/phpspreadsheet`

---

## EXPORT-002: Backend - Export to PDF

**Priorité:** 🔴 HIGH | **Dépendances:** EXPORT-001 | **Durée:** 2-3 jours

### Endpoint
```
GET /api/exports/pdf?year=2026&type=report
Response: PDF file download
```

### Content
- [ ] Campaign title and dates
- [ ] Key statistics and KPIs
- [ ] Charts/graphs
- [ ] Summary analysis
- [ ] Official letterhead and signature line

### Library
- [ ] Use `barryvdh/laravel-dompdf`

---

## EXPORT-003: Backend - CSV Data Export

**Priorité:** 🟡 MEDIUM | **Dépendances:** EXPORT-001 | **Durée:** 1 day

### Endpoint
```
GET /api/exports/csv?year=2026&type=declarations
Response: CSV file download
```

### Content
- [ ] Raw declaration data
- [ ] School registry
- [ ] Statistics in table format
- [ ] Data interchange format

