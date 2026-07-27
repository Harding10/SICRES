# 01 — Vue d'ensemble de l'architecture SICRES

> **Projet :** Systeme de Recensement des Etablissements Scolaires
> **Maintainer :** BEH DEGRY JEREMIE HARDING
> **Mise a jour :** Juillet 2026

---

## Table des matieres

1. [Contexte et objectifs](#1-contexte-et-objectifs)
2. [Architecture globale](#2-architecture-globale)
3. [Principes architecturaux](#3-principes-architecturaux)
4. [Vue logique — couches applicatives](#4-vue-logique--couches-applicatives)
5. [Vue physique — infrastructure Docker](#5-vue-physique--infrastructure-docker)
6. [Flux de donnees](#6-flux-de-donnees)
7. [Choix technologiques](#7-choix-technologiques)
8. [Contraintes et exigences non fonctionnelles](#8-contraintes-et-exigences-non-fonctionnelles)

---

## 1. Contexte et objectifs

SICRES est une application metier d'Etat destinee au **Ministere de l'Education Nationale
du Cameroun**. Elle remplace un processus manuel (papier et tableurs) par une plateforme
numerique centralisee.

### Objectifs principaux

| Objectif | Description |
|----------|-------------|
| **Collecte** | Permettre aux etablissements de soumettre leurs declarations annuelles |
| **Validation** | Workflow de validation multi-niveaux (etablissement → direction regionale → ministere) |
| **Statistiques** | Generer des rapports et tableaux de bord pour les decideurs |
| **Historique** | Conserver l'historique des campagnes de recensement |
| **Securite** | Controler les acces par role (RBAC) |

---

## 2. Architecture globale

SICRES adopte une **architecture client-serveur** avec separation stricte du frontend
et du backend, communiquant via une API REST securisee par Laravel Sanctum.

```
                       INTERNET / INTRANET
                              |
                         [ Nginx ]
                         :80 / :443
                         Reverse Proxy
                              |
              ┌───────────────┴───────────────┐
              |                               |
         /api/*                        /* (autres routes)
              |                               |
       [ PHP-FPM :9000 ]            [ Next.js :3000 ]
         Laravel 13                   React 19 / TS
         API REST                     Interface web
              |
    ┌─────────┴──────────┐
    |                    |
[ PostgreSQL :5432 ]  [ Redis :6379 ]
  Base de donnees       Cache / Sessions
                        Files d'attente
```

### Acces utilisateurs

| Type d'utilisateur | Acces | Description |
|--------------------|-------|-------------|
| Agent d'etablissement | Frontend (navigateur) | Saisie des declarations |
| Directeur regional | Frontend (navigateur) | Validation des declarations |
| Administrateur national | Frontend (navigateur) | Gestion complete |
| Developpeur | Makefile + Docker | Developpement et maintenance |

---

## 3. Principes architecturaux

### 3.1 Separation des preoccupations (SoC)

Le backend **ne sert que de l'API JSON** — il ne genere aucun HTML.
Le frontend est une SPA autonome qui consomme cette API.
Cette separation permet de scaler independamment chaque partie.

### 3.2 Architecture modulaire (Feature-based)

Le backend Laravel est organise par **modules metier** plutot que par type technique :

```
app/
├── Modules/
│   ├── Auth/           → Authentification
│   ├── Etablissement/  → CRUD etablissements
│   ├── Declaration/    → Campagnes de recensement
│   ├── User/           → Gestion des utilisateurs
│   └── Reporting/      → Statistiques et exports
```

Chaque module contient ses propres : Controllers, Services, Repositories, DTO, Policies.

### 3.3 Infrastructure immuable (Docker)

Toute l'infrastructure est definie en code (IaC) via Docker Compose.
Aucune configuration manuelle de serveur n'est necessaire.

### 3.4 Secrets jamais commites

Les mots de passe et cles API restent dans des fichiers `.env` ignores par Git.

---

## 4. Vue logique — couches applicatives

```
┌─────────────────────────────────────────────────────────────┐
│                   COUCHE PRESENTATION                        │
│              Next.js 15 + React 19 + TypeScript              │
│         Pages · Composants · Hooks · Contextes              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/JSON (Sanctum)
┌──────────────────────────▼──────────────────────────────────┐
│                   COUCHE API (Laravel 13)                    │
│              Controllers · Form Requests · Resources         │
├─────────────────────────────────────────────────────────────┤
│                   COUCHE METIER                              │
│              Services · Policies · Events · Jobs            │
├─────────────────────────────────────────────────────────────┤
│                   COUCHE DONNEES                             │
│              Repositories · Eloquent ORM · DTO              │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   COUCHE PERSISTANCE                         │
│         PostgreSQL 17        Redis 7                         │
│         (donnees metier)     (cache / sessions / queues)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Vue physique — infrastructure Docker

Voir le document detaille : [04-Architecture-docker.md](./04-Architecture-docker.md)

```
┌─────────────────────────────────────────────────────────────┐
│                   RESEAU sicres_network                      │
│                    (172.20.0.0/16)                          │
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐  │
│  │  Nginx   │   │ PHP-FPM  │   │  Queue   │   │ Next.js │  │
│  │  :80/443 │──▶│  :9000   │   │  Worker  │   │  :3000  │  │
│  └──────────┘   └────┬─────┘   └────┬─────┘   └─────────┘  │
│                      │              │                        │
│          ┌───────────┼──────────────┘                       │
│          │           │                                       │
│  ┌───────▼──┐  ┌─────▼────┐  ┌─────────────┐               │
│  │PostgreSQL│  │  Redis   │  │   Mailpit   │               │
│  │  :5432   │  │  :6379   │  │  :8025/1025 │               │
│  └──────────┘  └──────────┘  └─────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

**Services Docker :**

| Conteneur | Image | Role | Statut |
|-----------|-------|------|--------|
| `sicres_nginx` | nginx:1.27-alpine | Reverse proxy HTTP | :80, :443 |
| `sicres_php` | php:8.4-fpm (custom) | API Laravel (FPM) | :9000 |
| `sicres_queue` | meme image PHP | Worker queues | interne |
| `sicres_postgres` | postgres:17-alpine | Base de donnees | :5433 |
| `sicres_redis` | redis:7-alpine | Cache/Sessions/Queues | :6379 |
| `sicres_mailpit` | axllent/mailpit | Emails de dev | :8025 |
| `sicres_frontend` | node:22-alpine (custom) | Interface Next.js | :3000 |

---

## 6. Flux de donnees

### Requete API standard (exemple : liste des etablissements)

```
1. Utilisateur → navigateur → GET http://localhost/api/etablissements

2. Nginx recoit la requete sur :80
   └── Route /api/* → FastCGI vers php:9000

3. PHP-FPM (Laravel) traite la requete :
   ├── Middleware : authentification Sanctum (token de session)
   ├── Controller : EtablissementController@index
   ├── Service : EtablissementService (logique metier)
   ├── Repository : EtablissementRepository
   │   └── Eloquent → requete SQL vers PostgreSQL
   └── Resource : EtablissementResource → JSON

4. Reponse JSON → Nginx → Navigateur

5. Next.js recoit le JSON et affiche les donnees
```

### Envoi de declaration (avec job asynchrone)

```
1. Utilisateur soumet un formulaire → POST /api/declarations

2. Laravel Controller → Service → sauvegarde en BDD
   └── dispatch(new DeclarationSoumiseJob()) → Redis Queue

3. Queue Worker (sicres_queue) :
   ├── Traitement asynchrone (validation metier approfondie)
   ├── Envoi d'email de confirmation via Mailpit
   └── Mise a jour statut → BDD

4. Frontend consulte le statut via polling ou websockets
```

---

## 7. Choix technologiques

Voir les ADR (Architecture Decision Records) pour le detail de chaque decision :

| Decision | Document ADR |
|----------|-------------|
| Choix de Laravel (backend) | [ADR-001](../adr/ADR-001-Laravel.md) |
| Choix de Next.js (frontend) | [ADR-002](../adr/ADR-002-NextJS.md) |
| Choix de PostgreSQL (base de donnees) | [ADR-003](../adr/ADR-003-PostgreSQL.md) |
| Choix de Docker (infrastructure) | [ADR-004](../adr/ADR-004-Docker.md) |
| Choix de l'API REST | [ADR-005](../adr/ADR-005-REST.md) |
| Architecture modulaire | [ADR-006](../adr/ADR-006-Architecture-Modulaire.md) |

---

## 8. Contraintes et exigences non fonctionnelles

| Exigence | Cible | Mesure |
|----------|-------|--------|
| **Performance** | < 500ms par requete API | Laravel Telescope + OPcache |
| **Disponibilite** | 99.5% en heures ouvrables | Health checks + restart auto |
| **Securite** | Acces par role (RBAC) | Laravel Policies + Sanctum |
| **Scalabilite** | Support de 50+ etablissements simultanes | Queue workers + Redis |
| **Maintenance** | Deploiement zero-downtime | Multi-stage Docker + migrations |
| **Portabilite** | Fonctionne sur tout OS avec Docker | Docker Compose |

---

*Architecture definie par l'equipe technique SICRES — Juillet 2026*
