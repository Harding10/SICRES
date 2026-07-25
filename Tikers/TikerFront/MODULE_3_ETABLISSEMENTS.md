# 🏫 MODULE 3 - GESTION ÉTABLISSEMENTS (Frontend)

## SCHOOL-004: Frontend - School Profile Creation

**Priorité:** 🔴 HIGH | **Dépendances:** AUTH-003, SCHOOL-002 | **Durée:** 2-3 jours

### Components
- [ ] `app/schools/create/page.tsx`
- [ ] `components/Schools/SchoolForm.tsx`

### Form Fields
```
Code: [______________]
Nom: [______________]
Type: [Public v] [Privé]
Niveau: [Primaire v]
Ville: [______________]
Adresse: [______________]
Téléphone: [______________]
Email: [______________]
Année de création: [1990]

Directeur:
Nom: [______________]
Téléphone: [______________]
Email: [______________]

[Créer Établissement]
```

### Features
- [ ] Form validation
- [ ] Code uniqueness check
- [ ] Submit to POST `/api/schools`
- [ ] Success notification
- [ ] Redirect to dashboard/view

---

## SCHOOL-005: Frontend - Admin School List & Search

**Priorité:** 🟡 MEDIUM | **Dépendances:** AUTH-003, SCHOOL-002 | **Durée:** 2-3 jours

### Pages & Components
- [ ] `app/admin/schools/page.tsx`
- [ ] `components/Schools/SchoolList.tsx`
- [ ] `components/Schools/SchoolFilters.tsx`

### Features
- [ ] Paginated table of schools
- [ ] Filters: Type (Public/Privé), Level, City, Status
- [ ] Search by code or name
- [ ] Action buttons: View, Edit, Delete
- [ ] Bulk actions: Archive, Export
- [ ] Sort by columns

### UI
```
Filtres:
[Type: All v] [Niveau: All v] [Ville: All v] [Statut: Actif v]
[Search: ________] [Rechercher]

┌──────────────────────────────────────────────────────┐
│ Code │ Nom │ Type │ Niveau │ Ville │ Statut │ Actions│
├──────────────────────────────────────────────────────┤
│ SC01 │École A │Pub │Prim │Yam │Actif │▼ Edit Del│
└──────────────────────────────────────────────────────┘

[<< Prev] 1 2 3 [Next >>]
```

---

## SCHOOL-006: Frontend - School Detail View

**Priorité:** 🟡 MEDIUM | **Dépendances:** SCHOOL-005 | **Durée:** 1-2 jours

### Pages
- [ ] `app/admin/schools/[id]/page.tsx`
- [ ] Show all school info
- [ ] Tab: Historique (linked campaigns, declarations)
- [ ] Edit button
- [ ] Delete button

