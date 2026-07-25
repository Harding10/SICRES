# 🔐 MODULE 1 - AUTHENTIFICATION (Frontend)

## AUTH-002: Frontend - Create Login Page

**Priorité:** 🔴 HIGH  
**Type:** Frontend  
**Dépendances:** AUTH-001  
**Durée estimée:** 2-3 jours

### Description
Build login form component avec validation d'email/password, intégration avec endpoint `/api/login` et stockage sécurisé des tokens.

### Tâches techniques

#### 1. Login Form Component
- [ ] Créer `components/Auth/LoginForm.tsx`
- [ ] Champs: email, password
- [ ] Validation: Email format, password min 8 chars
- [ ] Submit button disabled pendant requête
- [ ] Messages d'erreur clairs

#### 2. Token Management
- [ ] Créer `utils/auth.ts` avec fonctions:
  - `login(email, password)` - appel /api/login
  - `logout()` - clear token
  - `getToken()` - retrieve from storage
  - `setToken(token)` - secure storage
- [ ] Stocker token en localStorage avec prefix `sicres_`
- [ ] Ajouter token à header Authorization dans Axios

#### 3. Login Page (`app/auth/login/page.tsx`)
- [ ] Layout: centré, branding SICRES
- [ ] Inclure LoginForm component
- [ ] Liens: "Mot de passe oublié", "Pas de compte?"
- [ ] Error messages rouge
- [ ] Loading state

### Fichiers à créer
```
sirfrontend/
├── app/auth/
│   ├── login/page.tsx
│   ├── layout.tsx
├── components/Auth/
│   ├── LoginForm.tsx
│   └── AuthLayout.tsx
├── utils/auth.ts
├── utils/storage.ts
└── context/AuthContext.tsx
```

---

## AUTH-003: Frontend - Implement Auth Middleware

**Priorité:** 🔴 HIGH  
**Type:** Frontend  
**Dépendances:** AUTH-002  
**Durée estimée:** 2-3 jours

### Description
Créer Next.js middleware pour protéger les routes, handle token refresh et rediriger utilisateurs non-authenticés.

### Tâches techniques

#### 1. Route Protection
- [ ] Créer `middleware.ts` à la racine
- [ ] Routes publiques: `/auth/*`, `/`
- [ ] Routes protégées: `/dashboard/*`, `/schools/*`, `/campaigns/*`
- [ ] Routes admin-only: `/admin/*`
- [ ] Redirect non-auth vers `/auth/login`

#### 2. Token Refresh
- [ ] Check token expiration dans middleware
- [ ] Refresh automatique si < 5 min avant expiry
- [ ] Implémenter GET `/api/user` pour validation
- [ ] Logout si refresh fails

#### 3. RBAC (Role-Based Access Control)
- [ ] Middleware check user role
- [ ] Admin routes require `admin` role
- [ ] School routes require `school_director` role
- [ ] Redirect unauthorized → `/dashboard`

#### 4. AuthContext & Hooks
- [ ] `context/AuthContext.tsx`:
  - `user` state
  - `isAuthenticated` state  
  - `role` state
  - `logout()` method
- [ ] Custom hook `useAuth()` pour access anywhere
- [ ] Wrap app avec AuthProvider

### Fichiers à modifier
```
sirfrontend/
├── middleware.ts (create)
├── context/AuthContext.tsx (create)
├── hooks/useAuth.ts (create)
├── utils/auth.ts (enhance)
└── app/layout.tsx (add AuthProvider)
```

### Protected Routes Map
```
PUBLIC:
  /auth/login
  /auth/register
  /auth/recover
  /

PROTECTED (need token):
  /dashboard
  /schools/*
  /campaigns/*
  /declarations/*
  /account/*

ADMIN ONLY:
  /admin/*
  /admin/users
  /admin/validations
  /admin/reports
```

### Test Checklist
- [ ] No token → redirect login
- [ ] Invalid token → redirect login
- [ ] Valid token → allow access
- [ ] Admin routes without admin role → redirect dashboard
- [ ] Token expiry → refresh silently
- [ ] Logout → clear token, redirect login

