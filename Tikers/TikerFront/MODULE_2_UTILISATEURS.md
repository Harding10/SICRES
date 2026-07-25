# 👥 MODULE 2 - GESTION UTILISATEURS (Frontend)

## USER-003: Frontend - User Registration Form

**Priorité:** 🔴 HIGH | **Dépendances:** AUTH-001, USER-002 | **Durée:** 2-3 jours

### Description
Build signup form avec validation, email verification flow et API integration.

### Tâches
- [ ] Créer `app/auth/register/page.tsx`
- [ ] Créer `components/Auth/RegisterForm.tsx`
  - Fields: name, email, password, password_confirmation
  - Real-time validation
  - Password strength indicator
  - Show/hide password toggle
- [ ] Créer `components/Auth/EmailVerificationStep.tsx`
  - Show message après registration
  - Allow resend verification email
  - Countdown timer (60 sec)
- [ ] Intégrer avec POST `/api/register`
- [ ] Redirection vers verify email page

### UI/UX
```
┌─────────────────────────┐
│    Créer un Compte      │
├─────────────────────────┤
│ Nom Complet             │
│ [__________________]    │
│ Email                   │
│ [__________________]    │
│ Mot de passe            │
│ [__________________]    │
│ █████░░░░░ Moyen       │
│ Confirmer MDP           │
│ [__________________]    │
│ [S'inscrire]            │
│ Vous avez un compte? [Connexion]
└─────────────────────────┘

After submit:
┌─────────────────────────┐
│   Vérifiez votre Email  │
│ Lien envoyé à:          │
│ school@example.com      │
│                         │
│ [Renvoyer] (60s)        │
│ [Changer d'email]       │
└─────────────────────────┘
```

---

## USER-004: Frontend - User Account Management

**Priorité:** 🟡 MEDIUM | **Dépendances:** AUTH-003, USER-001 | **Durée:** 2-3 jours

### Description
Create account settings page pour profile update, password change, et voir écoles assignées.

### Pages & Components
- [ ] `app/account/page.tsx` - Account settings wrapper
- [ ] `components/Account/ProfileForm.tsx` - Edit name, email
- [ ] `components/Account/PasswordForm.tsx` - Change password
- [ ] `components/Account/AssignedSchools.tsx` - List écoles (school directors)
- [ ] `components/Account/DeleteAccount.tsx` - Account deletion

### Features
- [ ] Edit profile (name, email)
- [ ] Change password (old + new)
- [ ] View assigned school(s)
- [ ] Delete account (with confirmation)
- [ ] Show last login date
- [ ] List active sessions

### API Calls
```
PATCH /api/user - Update profile
PUT /api/user/password - Change password
GET /api/user/schools - Get assigned schools
DELETE /api/user - Delete account
```

