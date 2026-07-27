# ADR-001 — Choix du framework backend : Laravel 13

**Date :** Janvier 2026
**Statut :** Accepte
**Decideurs :** BEH DEGRY JEREMIE HARDING, equipe technique SICRES

---

## Contexte

Le projet SICRES necessite un backend d'API robuste pour gerer la collecte de donnees
des etablissements scolaires camerounais. Nous devions choisir un framework PHP pour
construire cette API RESTful avec authentification, gestion des roles, et jobs asynchrones.

## Options envisagees

| Option | Avantages | Inconvenients |
|--------|-----------|---------------|
| **Laravel 13** | Ecosysteme riche, Sanctum, Queues, eloquent ORM, documentation excellente | Monolithique si mal structure |
| Symfony 7 | Flexibilite maximale, tres enterprise | Courbe d'apprentissage elevee, boilerplate important |
| FastAPI (Python) | Performances elevees, async natif | Equipe non familiarisee avec Python |
| Node.js / Express | JavaScript full-stack | Typage moins strict, ecosysteme moins structure |

## Decision

**Laravel 13** est choisi pour les raisons suivantes :

1. **Sanctum** : Authentification SPA native, parfaite pour Next.js
2. **Eloquent ORM** : Requetes expressives, migrations, factories et seeders
3. **Laravel Queues** : Gestion des jobs asynchrones (envoi d'emails, calculs statistiques)
4. **Policies** : Controle d'acces par role (RBAC) integre
5. **Architecture modulaire** : Compatible avec une organisation Feature-based
6. **Ecosystem** : Horizon (monitoring queues), Telescope (debug), Pint (linting)
7. **Connaissance equipe** : L'equipe maitrise PHP/Laravel

## Consequences

- L'API est 100% JSON — aucun Blade template
- L'authentification utilise Sanctum en mode stateful (session cookie)
- Les jobs lourds (exports, notifications en masse) passent par les queues Redis
- Architecture modulaire (`app/Modules/`) pour eviter le monolithe desorganise
