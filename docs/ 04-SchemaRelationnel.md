# 04 — Schema Relationnel (PostgreSQL)

> **Projet :** SICRES
> **SGBD :** PostgreSQL 17
> **Derniere mise a jour :** Juillet 2026

---

## Convention de nommage

| Element | Convention | Exemple |
|---------|-----------|---------|
| Tables | `snake_case`, pluriel | `etablissements` |
| Colonnes | `snake_case` | `date_soumission` |
| Cles primaires | `id` (serial/bigserial) | `id BIGSERIAL` |
| Cles etrangeres | `{table_singulier}_id` | `etablissement_id` |
| Index | `idx_{table}_{colonne}` | `idx_declarations_statut` |
| Contraintes | `{table}_{colonne}_fk` | `declarations_etablissement_fk` |
| Enums | `{table}_{colonne}_enum` | `declarations_statut_enum` |

---

## Schema SQL complet

### Table : `users`

```sql
CREATE TABLE users (
    id             BIGSERIAL PRIMARY KEY,
    nom            VARCHAR(100)  NOT NULL,
    prenom         VARCHAR(100)  NOT NULL,
    email          VARCHAR(255)  NOT NULL UNIQUE,
    password       VARCHAR(255)  NOT NULL,
    role           VARCHAR(30)   NOT NULL DEFAULT 'lecteur'
                   CHECK (role IN ('admin', 'gestionnaire', 'directeur', 'validateur', 'lecteur')),
    statut         VARCHAR(20)   NOT NULL DEFAULT 'actif'
                   CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    region         VARCHAR(100)  NULL,
    telephone      VARCHAR(20)   NULL,
    avatar_url     TEXT          NULL,
    derniere_connexion TIMESTAMPTZ NULL,
    email_verified_at  TIMESTAMPTZ NULL,
    remember_token     VARCHAR(100) NULL,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    deleted_at     TIMESTAMPTZ   NULL     -- Soft delete
);

CREATE INDEX idx_users_email    ON users(email);
CREATE INDEX idx_users_role     ON users(role);
CREATE INDEX idx_users_region   ON users(region);
CREATE INDEX idx_users_statut   ON users(statut);
```

---

### Table : `etablissements`

```sql
CREATE TABLE etablissements (
    id             BIGSERIAL PRIMARY KEY,
    code           VARCHAR(30)   NOT NULL UNIQUE,  -- ex: ES-2024-001
    nom            VARCHAR(255)  NOT NULL,
    type           VARCHAR(30)   NOT NULL
                   CHECK (type IN ('hopital', 'clinique', 'centre_sante', 'dispensaire', 'maternite', 'autre')),
    secteur        VARCHAR(30)   NOT NULL
                   CHECK (secteur IN ('public', 'prive', 'prive_non_lucratif', 'militaire')),
    region         VARCHAR(100)  NOT NULL,
    province       VARCHAR(100)  NULL,
    ville          VARCHAR(100)  NOT NULL,
    adresse        TEXT          NULL,
    telephone      VARCHAR(20)   NULL,
    email          VARCHAR(255)  NULL,
    site_web       VARCHAR(255)  NULL,
    capacite_lits  INTEGER       NULL CHECK (capacite_lits >= 0),
    statut         VARCHAR(20)   NOT NULL DEFAULT 'actif'
                   CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    latitude       DECIMAL(10,7) NULL,
    longitude      DECIMAL(10,7) NULL,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    deleted_at     TIMESTAMPTZ   NULL
);

CREATE INDEX idx_etablissements_code    ON etablissements(code);
CREATE INDEX idx_etablissements_region  ON etablissements(region);
CREATE INDEX idx_etablissements_type    ON etablissements(type);
CREATE INDEX idx_etablissements_secteur ON etablissements(secteur);
CREATE INDEX idx_etablissements_statut  ON etablissements(statut);
```

---

### Table : `user_etablissement` (pivot)

```sql
-- Gestionnaires affectes a des etablissements
CREATE TABLE user_etablissement (
    id               BIGSERIAL PRIMARY KEY,
    user_id          BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    etablissement_id BIGINT NOT NULL REFERENCES etablissements(id) ON DELETE CASCADE,
    role_local       VARCHAR(30) NOT NULL DEFAULT 'gestionnaire'
                     CHECK (role_local IN ('directeur', 'gestionnaire', 'saisisseur')),
    date_affectation DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, etablissement_id)
);

CREATE INDEX idx_ue_user          ON user_etablissement(user_id);
CREATE INDEX idx_ue_etablissement ON user_etablissement(etablissement_id);
```

---

### Table : `campagnes`

```sql
CREATE TABLE campagnes (
    id              BIGSERIAL PRIMARY KEY,
    titre           VARCHAR(255)  NOT NULL,
    slug            VARCHAR(255)  NOT NULL UNIQUE,  -- URL-friendly
    annee           SMALLINT      NOT NULL,
    periode         VARCHAR(20)   NOT NULL
                    CHECK (periode IN ('annuelle', 'semestrielle', 'trimestrielle', 'mensuelle')),
    date_ouverture  DATE          NOT NULL,
    date_cloture    DATE          NOT NULL,
    date_limite     DATE          NULL,
    statut          VARCHAR(20)   NOT NULL DEFAULT 'brouillon'
                    CHECK (statut IN ('brouillon', 'ouverte', 'fermee', 'archivee')),
    description     TEXT          NULL,
    created_by      BIGINT        NOT NULL REFERENCES users(id),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    CONSTRAINT campagnes_dates_check CHECK (date_cloture > date_ouverture)
);

CREATE INDEX idx_campagnes_statut ON campagnes(statut);
CREATE INDEX idx_campagnes_annee  ON campagnes(annee);
```

---

### Table : `indicateurs`

```sql
CREATE TABLE indicateurs (
    id           BIGSERIAL PRIMARY KEY,
    campagne_id  BIGINT       NOT NULL REFERENCES campagnes(id) ON DELETE CASCADE,
    code         VARCHAR(30)  NOT NULL,
    libelle      VARCHAR(255) NOT NULL,
    description  TEXT         NULL,
    type_valeur  VARCHAR(20)  NOT NULL
                 CHECK (type_valeur IN ('entier', 'decimal', 'texte', 'booleen', 'date', 'pourcentage')),
    unite        VARCHAR(50)  NULL,   -- ex: 'patients', '%', 'lits'
    obligatoire  BOOLEAN      NOT NULL DEFAULT TRUE,
    formule      TEXT         NULL,   -- Formule de calcul si derive
    valeur_min   DECIMAL      NULL,
    valeur_max   DECIMAL      NULL,
    ordre        SMALLINT     NOT NULL DEFAULT 0,
    section      VARCHAR(100) NULL,   -- Groupe/section de l'indicateur
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    UNIQUE (campagne_id, code)
);

CREATE INDEX idx_indicateurs_campagne ON indicateurs(campagne_id);
CREATE INDEX idx_indicateurs_code     ON indicateurs(code);
```

---

### Table : `declarations`

```sql
CREATE TABLE declarations (
    id               BIGSERIAL PRIMARY KEY,
    numero           VARCHAR(50)   NOT NULL UNIQUE,  -- ex: DECL-2024-A-001-042
    etablissement_id BIGINT        NOT NULL REFERENCES etablissements(id),
    campagne_id      BIGINT        NOT NULL REFERENCES campagnes(id),
    soumis_par       BIGINT        NULL REFERENCES users(id),
    valide_par       BIGINT        NULL REFERENCES users(id),
    statut           VARCHAR(20)   NOT NULL DEFAULT 'brouillon'
                     CHECK (statut IN ('brouillon', 'soumise', 'en_validation', 'validee', 'rejetee')),
    date_soumission  TIMESTAMPTZ   NULL,
    date_validation  TIMESTAMPTZ   NULL,
    commentaire      TEXT          NULL,   -- Commentaire du validateur
    donnees          JSONB         NOT NULL DEFAULT '{}',  -- Valeurs des indicateurs
    score_completude DECIMAL(5,2)  NULL CHECK (score_completude BETWEEN 0 AND 100),
    ip_soumission    VARCHAR(45)   NULL,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    -- Un etablissement ne peut soumettre qu'une declaration par campagne
    UNIQUE (etablissement_id, campagne_id)
);

CREATE INDEX idx_declarations_etablissement ON declarations(etablissement_id);
CREATE INDEX idx_declarations_campagne      ON declarations(campagne_id);
CREATE INDEX idx_declarations_statut        ON declarations(statut);
CREATE INDEX idx_declarations_date          ON declarations(date_soumission);
-- Index GIN pour la recherche dans le JSON des donnees
CREATE INDEX idx_declarations_donnees       ON declarations USING GIN (donnees);
```

---

### Table : `valeurs_indicateurs`

```sql
-- Stockage structure (alternatif au JSONB dans declarations)
CREATE TABLE valeurs_indicateurs (
    id             BIGSERIAL PRIMARY KEY,
    declaration_id BIGINT       NOT NULL REFERENCES declarations(id) ON DELETE CASCADE,
    indicateur_id  BIGINT       NOT NULL REFERENCES indicateurs(id),
    valeur_texte   TEXT         NULL,
    valeur_nombre  DECIMAL      NULL,
    valeur_bool    BOOLEAN      NULL,
    valeur_date    DATE         NULL,
    est_vide       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    UNIQUE (declaration_id, indicateur_id)
);

CREATE INDEX idx_vi_declaration  ON valeurs_indicateurs(declaration_id);
CREATE INDEX idx_vi_indicateur   ON valeurs_indicateurs(indicateur_id);
```

---

### Table : `documents`

```sql
CREATE TABLE documents (
    id               BIGSERIAL PRIMARY KEY,
    documentable_type VARCHAR(100) NOT NULL,  -- 'declaration' | 'etablissement'
    documentable_id   BIGINT       NOT NULL,  -- Polymorphique
    uploaded_by       BIGINT       NOT NULL REFERENCES users(id),
    nom_fichier       VARCHAR(255) NOT NULL,
    nom_stockage      VARCHAR(255) NOT NULL,  -- Nom sur le disque/S3
    chemin            TEXT         NOT NULL,
    type_mime         VARCHAR(100) NOT NULL,
    taille            INTEGER      NOT NULL CHECK (taille > 0),
    type_document     VARCHAR(30)  NOT NULL
                      CHECK (type_document IN ('rapport', 'annexe', 'certificat', 'autorisation', 'autre')),
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_documentable ON documents(documentable_type, documentable_id);
CREATE INDEX idx_documents_uploader     ON documents(uploaded_by);
```

---

### Table : `notifications`

```sql
CREATE TABLE notifications (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    type          VARCHAR(100) NOT NULL,  -- Classe PHP de la notification
    notifiable_type VARCHAR(100) NOT NULL DEFAULT 'App\Models\User',
    notifiable_id   BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    data          JSONB        NOT NULL DEFAULT '{}',
    read_at       TIMESTAMPTZ  NULL,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_notifiable ON notifications(notifiable_type, notifiable_id);
CREATE INDEX idx_notifications_read_at    ON notifications(read_at);
```

---

### Table : `activite_logs` (Audit trail)

```sql
CREATE TABLE activite_logs (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT       NULL REFERENCES users(id) ON DELETE SET NULL,
    action       VARCHAR(100) NOT NULL,  -- ex: 'declaration.soumise'
    description  TEXT         NULL,
    sujet_type   VARCHAR(100) NULL,      -- Modele concerne
    sujet_id     BIGINT       NULL,      -- ID du modele
    payload      JSONB        NOT NULL DEFAULT '{}',
    ip_address   VARCHAR(45)  NULL,
    user_agent   TEXT         NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_logs_user     ON activite_logs(user_id);
CREATE INDEX idx_logs_action   ON activite_logs(action);
CREATE INDEX idx_logs_sujet    ON activite_logs(sujet_type, sujet_id);
CREATE INDEX idx_logs_date     ON activite_logs(created_at);
```

---

### Tables Laravel (systeme)

```sql
-- Sessions (cache)
CREATE TABLE sessions (
    id            VARCHAR(255) PRIMARY KEY,
    user_id       BIGINT       NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address    VARCHAR(45)  NULL,
    user_agent    TEXT         NULL,
    payload       TEXT         NOT NULL,
    last_activity INTEGER      NOT NULL
);
CREATE INDEX idx_sessions_user         ON sessions(user_id);
CREATE INDEX idx_sessions_last_activity ON sessions(last_activity);

-- Jobs (files d'attente)
CREATE TABLE jobs (
    id           BIGSERIAL    PRIMARY KEY,
    queue        VARCHAR(255) NOT NULL,
    payload      TEXT         NOT NULL,
    attempts     SMALLINT     NOT NULL DEFAULT 0,
    reserved_at  INTEGER      NULL,
    available_at INTEGER      NOT NULL,
    created_at   INTEGER      NOT NULL
);
CREATE INDEX idx_jobs_queue ON jobs(queue);

-- Failed jobs (erreurs)
CREATE TABLE failed_jobs (
    id         BIGSERIAL    PRIMARY KEY,
    uuid       VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT         NOT NULL,
    queue      TEXT         NOT NULL,
    payload    TEXT         NOT NULL,
    exception  TEXT         NOT NULL,
    failed_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Migrations (suivi)
CREATE TABLE migrations (
    id        SERIAL       PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch     INTEGER      NOT NULL
);

-- Password resets
CREATE TABLE password_reset_tokens (
    email      VARCHAR(255) PRIMARY KEY,
    token      VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ  NULL
);
```

---

## Diagramme des relations (ERD)

```
users ──────────────────── user_etablissement ──────────── etablissements
  │                                                               │
  │ (created_by)                                                  │
  ▼                                                               │
campagnes ──────────────── indicateurs                            │
  │                                                               │
  │                        declarations ◄────────────────────────┘
  └──────────────────────► declarations
                               │
                               ├── valeurs_indicateurs
                               ├── documents
                               └── notifications ──► users
                               
activite_logs ──► users
```

---

## Resume des tables

| Table | Lignes estimees | Croissance | Role |
|-------|----------------|-----------|------|
| `users` | < 1 000 | Faible | Gestion des comptes |
| `etablissements` | ~500 | Faible | Referentiel des structures |
| `user_etablissement` | ~1 000 | Faible | Affectations |
| `campagnes` | ~50/an | Constante | Periodes de collecte |
| `indicateurs` | ~100/campagne | Constante | Grille de saisie |
| `declarations` | ~500/campagne | Forte | Donnees collectees |
| `valeurs_indicateurs` | ~50 000/campagne | Forte | Valeurs structurees |
| `documents` | Variable | Forte | Pieces jointes |
| `notifications` | Variable | Forte | Messagerie systeme |
| `activite_logs` | Variable | Tres forte | Audit complet |

---

## Strategie d'index

- **Cles etrangeres** : Toutes les FK ont un index associe.
- **Filtres frequents** : `statut`, `region`, `campagne_id`, `etablissement_id`.
- **Recherche full-text** : Index GIN sur `declarations.donnees` (JSONB).
- **Soft deletes** : Colonnes `deleted_at` sur `users` et `etablissements`.
- **Timestamps** : Tous les enregistrements ont `created_at` / `updated_at`.

---

*Schema Relationnel SICRES — PostgreSQL 17 — Juillet 2026*
