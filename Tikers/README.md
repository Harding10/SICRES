# 📋 SICRES - TICKETS DE DÉVELOPPEMENT

Bienvenue dans le système de gestion des tickets du projet SICRES!

## 📂 STRUCTURE DES DOSSIERS

```
Tikers/
├── PHASES_DE_DÉVELOPPEMENT.md       ← 📌 LIRE D'ABORD - Vue d'ensemble des 5 phases
├── README.md                        ← Ce fichier
├── TikerFront/                      ← Tickets Frontend (Next.js)
│   ├── MODULE_1_AUTHENTIFICATION.md
│   ├── MODULE_2_UTILISATEURS.md
│   ├── MODULE_3_ETABLISSEMENTS.md
│   └── MODULE_4_5_6_7_8_9_10.md
├── TikersBack/                      ← Tickets Backend (Laravel)
│   ├── MODULE_1_AUTHENTIFICATION.md
│   ├── MODULE_2_UTILISATEURS.md
│   ├── MODULE_3_ETABLISSEMENTS.md
│   ├── MODULE_4_CAMPAGNES.md
│   ├── MODULE_5_DECLARATIONS.md
│   ├── MODULE_6_DOCUMENTS.md
│   └── MODULE_7_8_9_10.md
└── sql/                             ← Migrations SQL PostgreSQL
    ├── 01_roles_permissions_migration.sql
    ├── 02_etablissements_migration.sql
    ├── 03_campaigns_declarations_migration.sql
    └── 04_documents_migration.sql
```

## 🚀 COMMENT UTILISER CE GUIDE

### 1️⃣ Lire la Vision Globale
Commencez par **PHASES_DE_DÉVELOPPEMENT.md** pour comprendre:
- Les 5 phases de développement
- Les dépendances critiques
- La timeline estimée
- Les acceptance criteria par phase

### 2️⃣ Consulter les Tickets
Chaque ticket inclut:
- **Priorité** (HIGH 🔴 ou MEDIUM 🟡)
- **Dépendances** - quels tickets doivent être faits avant
- **Durée estimée** (en jours)
- **Tâches techniques** - checklist détaillée
- **API Endpoints** - format de requêtes/réponses
- **Files à créer/modifier** - structure du code
- **Tests à réaliser** - vérification de qualité
- **Notes** - informations importantes

### 3️⃣ SQL Migrations
Les fichiers SQL contiennent:
- Création des tables
- Relations et contraintes
- Indexes pour performance
- Données de démo (seeders)

**Appliquer dans l'ordre:**
1. `01_roles_permissions_migration.sql` - RBAC setup
2. `02_etablissements_migration.sql` - Schools table
3. `03_campaigns_declarations_migration.sql` - Core business logic
4. `04_documents_migration.sql` - Document management

## 📊 RÉSUMÉ DES 44 TICKETS

### Par Module
| Module | Count | Priority |
|--------|-------|----------|
| 🔐 Authentification | 3 | HIGH |
| 👥 Utilisateurs | 4 | HIGH |
| 🏫 Établissements | 6 | HIGH |
| 📅 Campagnes | 5 | HIGH |
| 📝 Déclarations | 6 | HIGH |
| 📄 Documents | 5 | HIGH |
| ✅ Validation | 4 | HIGH |
| 📈 Dashboard | 3 | MEDIUM |
| 📊 Statistiques | 4 | MEDIUM |
| 💾 Exports | 4 | MEDIUM |
| **TOTAL** | **44** | **28 HIGH, 16 MEDIUM** |

### Par Type
- **Backend:** 24 tickets
- **Frontend:** 20 tickets

## 🔄 DÉPENDANCES CRITIQUES

```
PHASE 1 (Foundation)
  AUTH-001 → AUTH-002, AUTH-003
  USER-001 → USER-002
  SCHOOL-001 → SCHOOL-002, SCHOOL-003
           ↓
PHASE 2 (Core Business)
  CAMPAIGN-001 → CAMPAIGN-002, CAMPAIGN-003
  DECL-001 → DECL-002 → DECL-003
  DOC-001 → DOC-002
           ↓
PHASE 3 (Validation & UI)
  VAL-001 → VAL-002
  Front forms & admin interfaces
           ↓
PHASE 4 (Analytics)
  DASH-001 → STAT-001 → EXPORT-001 → EXPORT-002
```

## ✅ CHECKLIST D'IMPLÉMENTATION

### Phase 1: Foundation (2-3 sem)
- [ ] AUTH-001, AUTH-002, AUTH-003
- [ ] USER-001, USER-002
- [ ] SCHOOL-001, SCHOOL-002, SCHOOL-003
- [ ] All frontend auth pages & forms

**Acceptance:** Auth works, roles set, schools CRUD works

### Phase 2: Core (2-3 sem)
- [ ] CAMPAIGN-001, CAMPAIGN-002, CAMPAIGN-003
- [ ] DECL-001, DECL-002, DECL-003
- [ ] DOC-001, DOC-002
- [ ] DECL-006 (audit)
- [ ] All campaign & declaration forms

**Acceptance:** Campaigns & declarations fully functional

### Phase 3: Validation (2-3 sem)
- [ ] VAL-001, VAL-002
- [ ] DOC-003, DOC-005
- [ ] Admin validation dashboard
- [ ] School correction interface

**Acceptance:** Full validation workflow working

### Phase 4: Analytics (1-2 sem)
- [ ] DASH-001, DASH-002, DASH-003
- [ ] STAT-001, STAT-003
- [ ] STAT-002, STAT-004
- [ ] EXPORT-001, EXPORT-002, EXPORT-003

**Acceptance:** Dashboards & exports working

### Phase 5: Polish (Variable)
- [ ] Tests (unit, integration, e2e)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Deployment setup

## 🛠️ TECHNOLOGIES

### Backend
- **Framework:** Laravel 13
- **Database:** PostgreSQL
- **Auth:** Laravel Sanctum
- **API:** RESTful

### Frontend
- **Framework:** Next.js 19 (React)
- **Styling:** Tailwind CSS
- **HTTP:** Axios
- **State:** React Context / TanStack Query

## 📚 RESSOURCES

- **Cahier des Charges:** `/docs/SICRES_Cahier_des_Charges_Fonctionnel.pdf`
- **Architecture Plan:** `/PHASES_DE_DÉVELOPPEMENT.md`
- **SQL Schemas:** `/sql/*.sql`

## 👥 RÔLES & PERMISSIONS

### Administrateur Communal (admin)
- Voir tous les établissements
- Créer/modifier/supprimer campagnes
- Valider/rejeter déclarations
- Approuver documents
- Générer rapports
- Voir statistiques complètes

### Responsable Établissement (school_director)
- Modifier profil de l'établissement
- Créer/modifier déclarations
- Soumettre déclarations
- Charger documents
- Voir notifications

## 🤝 WORKFLOW TYPIQUE

```
1. PROFIL (Permanent)
   - Établissement crée compte
   - Admin approuve

2. CAMPAGNE
   - Admin crée campagne (ex: 2026)
   - Admin ouvre campagne
   - Notifications envoyées aux écoles

3. DÉCLARATION
   - École crée déclaration (brouillon)
   - École complète et soumet
   - Admin valide ou rejette

4. DOCUMENTS
   - École ajoute pièces justificatives
   - Admin approuve documents

5. VALIDATION
   - Admin approuve déclaration complète
   - École reçoit confirmation

6. REPORTING
   - Statistiques calculées
   - Rapports générés
   - Données exportées
```

## 📞 SUPPORT

Pour des questions sur:
- **Architecture:** Voir PHASES_DE_DÉVELOPPEMENT.md
- **Implémentation:** Voir fichiers module spécifiques
- **Database:** Voir fichiers SQL dans `/sql/`
- **API:** Voir endpoints dans tickets

---

**Créé:** 2026-07-23 | **Version:** 1.0
**Responsable:** Chef de Projet SICRES

