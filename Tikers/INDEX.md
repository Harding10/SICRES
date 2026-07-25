# 📑 INDEX COMPLET - SICRES TICKETS

## 🎯 COMMENCER ICI

1. **[README.md](README.md)** - Vue d'ensemble des tickets et structure
2. **[PHASES_DE_DÉVELOPPEMENT.md](PHASES_DE_DÉVELOPPEMENT.md)** - 5 phases avec timeline et dépendances

---

## 🔐 MODULE 1: AUTHENTIFICATION (3 tickets)

### Backend
- **[AUTH-001](TikersBack/MODULE_1_AUTHENTIFICATION.md#auth-001-backend---setup-sanctum-auth-middleware)** - Setup Sanctum + CORS
- Backend: Configure Laravel Sanctum pour l'authentification API
- **Priorité:** 🔴 HIGH | **Durée:** 3-4 jours

### Frontend
- **[AUTH-002](TikerFront/MODULE_1_AUTHENTIFICATION.md#auth-002-frontend---create-login-page)** - Login Page
- Frontend: Build login form + token management
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-001

- **[AUTH-003](TikerFront/MODULE_1_AUTHENTIFICATION.md#auth-003-frontend---implement-auth-middleware)** - Route Protection
- Frontend: Next.js middleware + token refresh + RBAC
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-002

---

## 👥 MODULE 2: GESTION UTILISATEURS (4 tickets)

### Backend
- **[USER-001](TikersBack/MODULE_2_UTILISATEURS.md#user-001-backend---create-user-roles--permissions)** - Roles & Permissions
- Backend: RBAC system avec 2 rôles (admin, school_director)
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-001

- **[USER-002](TikersBack/MODULE_2_UTILISATEURS.md#user-002-backend---user-registration-endpoint)** - Registration Endpoint
- Backend: Endpoint /api/register avec email verification
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** USER-001

### Frontend
- **[USER-003](TikerFront/MODULE_2_UTILISATEURS.md#user-003-frontend---user-registration-form)** - Registration Form
- Frontend: Signup form avec validation
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-001, USER-002

- **[USER-004](TikerFront/MODULE_2_UTILISATEURS.md#user-004-frontend---user-account-management)** - Account Settings
- Frontend: Profile page, change password, view schools
- **Priorité:** 🟡 MEDIUM | **Durée:** 2-3 jours | **Dépend:** AUTH-003, USER-001

---

## 🏫 MODULE 3: GESTION ÉTABLISSEMENTS (6 tickets)

### Backend
- **[SCHOOL-001](TikersBack/MODULE_3_ETABLISSEMENTS.md#school-001-backend---create-school-model--migration)** - School Model
- Backend: Model Établissement avec tous les champs
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-001

- **[SCHOOL-002](TikersBack/MODULE_3_ETABLISSEMENTS.md#school-002-backend---school-crud-endpoints)** - CRUD Endpoints
- Backend: GET, POST, PUT, DELETE /api/schools
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** SCHOOL-001

- **[SCHOOL-003](TikersBack/MODULE_3_ETABLISSEMENTS.md#school-003-backend---school-authorization)** - Authorization
- Backend: Access control (director modifie propre école, admin voit tout)
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** USER-001, SCHOOL-002

### Frontend
- **[SCHOOL-004](TikerFront/MODULE_3_ETABLISSEMENTS.md#school-004-frontend---school-profile-creation)** - Profile Creation Form
- Frontend: Form pour créer établissement
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-003, SCHOOL-002

- **[SCHOOL-005](TikerFront/MODULE_3_ETABLISSEMENTS.md#school-005-frontend---admin-school-list--search)** - School List & Search
- Frontend: Admin dashboard avec liste écoles, filtres, recherche
- **Priorité:** 🟡 MEDIUM | **Durée:** 2-3 jours | **Dépend:** AUTH-003, SCHOOL-002

- **[SCHOOL-006](TikerFront/MODULE_3_ETABLISSEMENTS.md#school-006-frontend---school-detail-view)** - Detail View
- Frontend: Page détail école avec historique
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** SCHOOL-005

---

## 📅 MODULE 4: GESTION CAMPAGNES (5 tickets)

### Backend
- **[CAMPAIGN-001](TikersBack/MODULE_4_CAMPAGNES.md#campaign-001-backend---create-campaign-model)** - Campaign Model
- Backend: Model Campaign avec states (draft/active/closed)
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** SCHOOL-001

- **[CAMPAIGN-002](TikersBack/MODULE_4_CAMPAGNES.md#campaign-002-backend---campaign-crud--scheduling)** - CRUD & Scheduling
- Backend: Endpoints CRUD + jobs pour ouvrir/fermer automatiquement
- **Priorité:** 🔴 HIGH | **Durée:** 3-4 jours | **Dépend:** CAMPAIGN-001

- **[CAMPAIGN-003](TikersBack/MODULE_4_CAMPAGNES.md#campaign-003-backend---campaign-status-management)** - Status Management
- Backend: State machine validation pour transitions
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** CAMPAIGN-002

### Frontend
- **[CAMPAIGN-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#campaign-004-frontend---admin-campaign-manager)** - Admin Campaign Manager
- Frontend: Interface admin pour créer/gérer campagnes
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-003, CAMPAIGN-002

- **[CAMPAIGN-005](TikerFront/MODULE_4_5_6_7_8_9_10.md#campaign-005-frontend---school-campaign-list)** - School Campaign List
- Frontend: Les écoles voient campagnes actives
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** AUTH-003, CAMPAIGN-002

---

## 📝 MODULE 5: GESTION DÉCLARATIONS (6 tickets)

### Backend
- **[DECL-001](TikersBack/MODULE_5_DECLARATIONS.md#decl-001-backend---create-declaration-model)** - Declaration Model
- Backend: Model Declaration lié à Campaign & School
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** CAMPAIGN-001, SCHOOL-001

- **[DECL-002](TikersBack/MODULE_5_DECLARATIONS.md#decl-002-backend---declaration-crud--draft-save)** - CRUD & Draft Save
- Backend: Endpoints CRUD + auto-save brouillon
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** DECL-001

- **[DECL-003](TikersBack/MODULE_5_DECLARATIONS.md#decl-003-backend---declaration-submission)** - Submission
- Backend: Endpoint submit + lock après soumission
- **Priorité:** 🔴 HIGH | **Durée:** 2 jours | **Dépend:** DECL-002

- **[DECL-006](TikersBack/MODULE_5_DECLARATIONS.md#decl-006-backend---declaration-history--audit)** - Audit Trail
- Backend: Logging complet des changements
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** DECL-002

### Frontend
- **[DECL-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#decl-004-frontend---declaration-form)** - Declaration Form
- Frontend: Form pour remplir déclaration avec auto-save
- **Priorité:** 🔴 HIGH | **Durée:** 3-4 jours | **Dépend:** AUTH-003, DECL-002

- **[DECL-005](TikerFront/MODULE_4_5_6_7_8_9_10.md#decl-005-frontend---declaration-status-tracker)** - Status Tracker
- Frontend: Voir statut déclaration par campagne
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** DECL-003

---

## 📄 MODULE 6: GESTION DOCUMENTAIRE (5 tickets)

### Backend
- **[DOC-001](TikersBack/MODULE_6_DOCUMENTS.md#doc-001-backend---create-document-model--storage)** - Document Model
- Backend: Model Document avec versioning
- **Priorité:** 🔴 HIGH | **Durée:** 2 jours | **Dépend:** DECL-001

- **[DOC-002](TikersBack/MODULE_6_DOCUMENTS.md)** - File Upload & Validation
- Backend: Endpoint upload sécurisé avec validation fichier
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** DOC-001

- **[DOC-003](TikersBack/MODULE_6_DOCUMENTS.md)** - Document Access Control
- Backend: Permissions documents (école peut upload, admin approuve)
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** DOC-002, USER-001

### Frontend
- **[DOC-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#doc-004-frontend---document-upload-interface)** - Upload Interface
- Frontend: Drag-drop uploader avec preview
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-003, DOC-002

- **[DOC-005](TikerFront/MODULE_4_5_6_7_8_9_10.md#doc-005-frontend---admin-document-review)** - Admin Review
- Frontend: Interface admin pour approver/rejeter documents
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** DOC-003

---

## ✅ MODULE 7: VALIDATION (4 tickets)

### Backend
- **[VAL-001](TikersBack/MODULE_7_8_9_10.md#val-001-backend---declaration-validation-workflow)** - Validation Workflow
- Backend: Endpoints approve/reject decl + audit trail
- **Priorité:** 🔴 HIGH | **Durée:** 2 jours | **Dépend:** DECL-003

- **[VAL-002](TikersBack/MODULE_7_8_9_10.md#val-002-backend---rejection--correction-requests)** - Rejection & Corrections
- Backend: Allow resubmit après rejection
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** VAL-001

### Frontend
- **[VAL-003](TikerFront/MODULE_4_5_6_7_8_9_10.md#val-003-frontend---admin-validation-dashboard)** - Validation Dashboard
- Frontend: Interface admin pour valider déclarations
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-003, VAL-001

- **[VAL-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#val-004-frontend---school-correction-interface)** - Correction Interface
- Frontend: Écoles voient raison rejet, peuvent résubmettre
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** VAL-002

---

## 📈 MODULE 8: TABLEAU DE BORD (3 tickets)

### Backend
- **[DASH-001](TikersBack/MODULE_7_8_9_10.md#dash-001-backend---dashboard-statistics-endpoints)** - Dashboard Stats
- Backend: Endpoints pour KPIs (écoles, élèves, taux participation)
- **Priorité:** 🔴 HIGH | **Durée:** 2 jours | **Dépend:** DECL-001, CAMPAIGN-002

### Frontend
- **[DASH-002](TikerFront/MODULE_4_5_6_7_8_9_10.md#dash-002-frontend---admin-dashboard)** - Admin Dashboard
- Frontend: Dashboard principal avec KPIs et graphiques
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** AUTH-003, DASH-001

- **[DASH-003](TikerFront/MODULE_4_5_6_7_8_9_10.md#dash-003-frontend---school-personal-dashboard)** - School Dashboard
- Frontend: Dashboard écoles (statuts, deadlines, déclarations)
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** AUTH-003

---

## 📊 MODULE 9: STATISTIQUES (4 tickets)

### Backend
- **[STAT-001](TikersBack/MODULE_7_8_9_10.md#stat-001-backend---statistics-engine)** - Statistics Engine
- Backend: Endpoints distributions, évolution année/année
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** DASH-001

- **[STAT-003](TikersBack/MODULE_7_8_9_10.md#stat-003-backend---comparative-analysis)** - Comparative Analysis
- Backend: Tendances, anomalies, comparaisons inter-campagnes
- **Priorité:** 🟡 MEDIUM | **Durée:** 2 jours | **Dépend:** STAT-001

### Frontend
- **[STAT-002](TikerFront/MODULE_4_5_6_7_8_9_10.md#stat-002-frontend---interactive-analytics)** - Interactive Analytics
- Frontend: Graphiques & visualisations (Chart.js/Recharts)
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** STAT-001

- **[STAT-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#stat-004-frontend---statistical-filters)** - Statistical Filters
- Frontend: Filtres dynamiques (année, niveau, type, ville)
- **Priorité:** 🟡 MEDIUM | **Durée:** 1-2 jours | **Dépend:** STAT-002

---

## 💾 MODULE 10: RAPPORTS & EXPORTS (4 tickets)

### Backend
- **[EXPORT-001](TikersBack/MODULE_7_8_9_10.md#export-001-backend---export-to-excel)** - Excel Export
- Backend: Export listes, données, statistiques en Excel
- **Priorité:** 🔴 HIGH | **Durée:** 2 jours | **Dépend:** STAT-001

- **[EXPORT-002](TikersBack/MODULE_7_8_9_10.md#export-002-backend---export-to-pdf)** - PDF Export
- Backend: Rapports PDF avec graphiques, letterhead, signatures
- **Priorité:** 🔴 HIGH | **Durée:** 2-3 jours | **Dépend:** EXPORT-001

- **[EXPORT-003](TikersBack/MODULE_7_8_9_10.md#export-003-backend---csv-data-export)** - CSV Export
- Backend: Export CSV pour data interchange
- **Priorité:** 🟡 MEDIUM | **Durée:** 1 day | **Dépend:** EXPORT-001

### Frontend
- **[EXPORT-004](TikerFront/MODULE_4_5_6_7_8_9_10.md#export-004-frontend---export-interface)** - Export Interface
- Frontend: Contrôles export (format, date range, type rapport)
- **Priorité:** 🟡 MEDIUM | **Durée:** 1 day | **Dépend:** EXPORT-002

---

## 📊 STATISTIQUES GLOBALES

| Métrique | Valeur |
|----------|--------|
| Total Tickets | 44 |
| Backend | 24 |
| Frontend | 20 |
| Priorité HIGH | 28 |
| Priorité MEDIUM | 16 |
| Durée Totale Estimée | 8-11 semaines |

---

## 🔗 FICHIERS SQL

- **[01_roles_permissions_migration.sql](sql/01_roles_permissions_migration.sql)** - RBAC setup
- **[02_etablissements_migration.sql](sql/02_etablissements_migration.sql)** - Schools table
- **[03_campaigns_declarations_migration.sql](sql/03_campaigns_declarations_migration.sql)** - Core business
- **[04_documents_migration.sql](sql/04_documents_migration.sql)** - Document management

---

**Créé:** 2026-07-23 | **Version:** 1.0

