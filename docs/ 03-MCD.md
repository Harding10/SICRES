# 03 — Modele Conceptuel de Donnees (MCD)

> **Projet :** SICRES — Systeme d'Information de Collecte et de Reporting des Etablissements de Sante
> **Derniere mise a jour :** Juillet 2026

---

## Vue d'ensemble

Le MCD de SICRES modélise les entites metier du systeme de reporting des etablissements de sante.
Il identifie les objets du domaine, leurs attributs, et les relations qui les lient.

---

## Entites principales

### 1. UTILISATEUR
Represente les personnes qui interagissent avec le systeme.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| nom | Chaine | NOT NULL | Nom de famille |
| prenom | Chaine | NOT NULL | Prenom |
| email | Chaine | UNIQUE, NOT NULL | Adresse email |
| mot_de_passe | Chaine | NOT NULL | Hash bcrypt |
| role | Enum | NOT NULL | admin / gestionnaire / directeur / lecteur |
| statut | Enum | NOT NULL | actif / inactif / suspendu |
| derniere_connexion | Datetime | NULLABLE | Date de derniere connexion |

---

### 2. ETABLISSEMENT
Represente une structure de sante enregistree dans le systeme.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| code | Chaine | UNIQUE, NOT NULL | Code national (ex: ES-2024-001) |
| nom | Chaine | NOT NULL | Denomination officielle |
| type | Enum | NOT NULL | hopital / clinique / centre / dispensaire |
| secteur | Enum | NOT NULL | public / prive / prive_non_lucratif |
| region | Chaine | NOT NULL | Region administrative |
| ville | Chaine | NOT NULL | Commune |
| adresse | Texte | NULLABLE | Adresse postale complete |
| telephone | Chaine | NULLABLE | Numero de contact |
| email | Chaine | NULLABLE | Email institutionnel |
| statut | Enum | NOT NULL | actif / inactif / suspendu |
| capacite_lits | Entier | NULLABLE | Nombre de lits disponibles |
| latitude | Decimal | NULLABLE | Coordonnee GPS latitude |
| longitude | Decimal | NULLABLE | Coordonnee GPS longitude |

---

### 3. CAMPAGNE
Represente une periode de collecte de donnees.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| titre | Chaine | NOT NULL | Intitule de la campagne |
| annee | Entier | NOT NULL | Annee de reference (ex: 2024) |
| periode | Enum | NOT NULL | annuelle / semestrielle / trimestrielle |
| date_ouverture | Date | NOT NULL | Debut de la saisie |
| date_cloture | Date | NOT NULL | Fin de la saisie |
| date_limite | Date | NULLABLE | Date limite de soumission |
| statut | Enum | NOT NULL | brouillon / ouverte / fermee / archivee |
| description | Texte | NULLABLE | Instructions pour les etablissements |

---

### 4. DECLARATION
Represente la soumission des donnees d'un etablissement pour une campagne.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| numero | Chaine | UNIQUE, NOT NULL | Reference unique (ex: DECL-2024-001-042) |
| statut | Enum | NOT NULL | brouillon / soumise / en_validation / validee / rejetee |
| date_soumission | Datetime | NULLABLE | Horodatage de la soumission |
| date_validation | Datetime | NULLABLE | Horodatage de la validation |
| commentaire | Texte | NULLABLE | Observations du validateur |
| donnees | JSON | NOT NULL | Contenu de la declaration (indicateurs) |
| score_completude | Decimal | NULLABLE | Taux de completude en % |

---

### 5. INDICATEUR
Represente un indicateur de sante a renseigner lors d'une declaration.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| code | Chaine | UNIQUE, NOT NULL | Code de reference (ex: IND-001) |
| libelle | Chaine | NOT NULL | Libelle de l'indicateur |
| description | Texte | NULLABLE | Explication detaillee |
| type_valeur | Enum | NOT NULL | entier / decimal / texte / booleen / date |
| unite | Chaine | NULLABLE | Unite de mesure (ex: %, patients, lits) |
| obligatoire | Booleen | NOT NULL | Champ requis ou optionnel |
| formule | Texte | NULLABLE | Formule de calcul si derive |
| ordre | Entier | NOT NULL | Ordre d'affichage |

---

### 6. DOCUMENT
Fichiers joints aux declarations ou etablissements.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| nom_fichier | Chaine | NOT NULL | Nom original du fichier |
| chemin | Chaine | NOT NULL | Chemin de stockage (S3 ou local) |
| type_mime | Chaine | NOT NULL | Type MIME (application/pdf, ...) |
| taille | Entier | NOT NULL | Taille en octets |
| type_document | Enum | NOT NULL | rapport / annexe / certificat / autre |

---

### 7. NOTIFICATION
Messages systeme envoyes aux utilisateurs.

| Attribut | Type | Contrainte | Description |
|----------|------|-----------|-------------|
| id | Entier | PK, Auto | Identifiant unique |
| type | Enum | NOT NULL | info / avertissement / validation / rejet |
| titre | Chaine | NOT NULL | Intitule de la notification |
| contenu | Texte | NOT NULL | Corps du message |
| lu | Booleen | NOT NULL | Lu ou non |
| lu_le | Datetime | NULLABLE | Date de lecture |

---

## Relations entre entites

```
UTILISATEUR ──── gere ────────────────► ETABLISSEMENT
      │                                       │
      │ soumet                                │ participe
      ▼                                       ▼
  DECLARATION ◄──────────── CAMPAGNE ─────────────
      │
      │ contient
      ▼
  INDICATEUR (via VALEUR_INDICATEUR)
      │
  DOCUMENT (joint a la declaration)
      │
  NOTIFICATION (envoyee a l'utilisateur responsable)
```

---

## Associations et cardinalites

| Association | Entite A | Cardinalite | Entite B | Description |
|-------------|----------|-------------|----------|-------------|
| gere | UTILISATEUR | 1,N | ETABLISSEMENT | Un gestionnaire peut gerer plusieurs etablissements |
| administre | UTILISATEUR | 0,N | ETABLISSEMENT | Un directeur administre son etablissement |
| appartient | ETABLISSEMENT | 0,N | REGION | Un etablissement est dans une region |
| participe | CAMPAGNE | 1,N | ETABLISSEMENT | Une campagne cible plusieurs etablissements |
| soumet | ETABLISSEMENT | 0,N | DECLARATION | Un etablissement peut faire plusieurs declarations |
| concerne | DECLARATION | N,1 | CAMPAGNE | Une declaration est liee a une campagne |
| renseigne | DECLARATION | 1,N | INDICATEUR | Une declaration contient plusieurs indicateurs |
| valide | UTILISATEUR | 0,N | DECLARATION | Un validateur peut valider plusieurs declarations |
| joint | DECLARATION | 0,N | DOCUMENT | Une declaration peut avoir des pieces jointes |
| recoit | UTILISATEUR | 0,N | NOTIFICATION | Un utilisateur peut recevoir des notifications |

---

## Diagramme textuel (notation UML simplifiee)

```
+-------------------+       +----------------------+       +-------------------+
|    UTILISATEUR    |       |    ETABLISSEMENT     |       |     CAMPAGNE      |
+-------------------+       +----------------------+       +-------------------+
| # id              |       | # id                 |       | # id              |
| nom               |1    N | code (UNIQUE)        |N     N| titre             |
| prenom            |───────| nom                  |───────| annee             |
| email (UNIQUE)    |       | type                 |       | periode           |
| role              |       | secteur              |       | date_ouverture    |
| statut            |       | region               |       | date_cloture      |
+-------------------+       | ville                |       | statut            |
         │                  | statut               |       +-------------------+
         │ soumet           +----------------------+                │
         │                            │                             │
         ▼                            │ soumet                      │ concerne
+-------------------+                 │                             │
|   DECLARATION     |◄────────────────┘◄──────────────────────────┘
+-------------------+
| # id              |       +----------------------+
| numero (UNIQUE)   |       |     INDICATEUR       |
| statut            |1    N +----------------------+
| date_soumission   |───────| # id                 |
| donnees (JSON)    |       | code (UNIQUE)        |
| score_completude  |       | libelle              |
+-------------------+       | type_valeur          |
         │                  | obligatoire          |
         │ joint            +----------------------+
         ▼
+-------------------+       +-------------------+
|    DOCUMENT       |       |   NOTIFICATION    |
+-------------------+       +-------------------+
| # id              |       | # id              |
| nom_fichier       |       | type              |
| chemin            |       | titre             |
| type_mime         |       | contenu           |
| type_document     |       | lu                |
+-------------------+       +-------------------+
```

---

## Regles de gestion metier

1. **Un etablissement ne peut soumettre qu'une seule declaration par campagne.**
2. **Une declaration ne peut etre soumise que si la campagne est en statut `ouverte`.**
3. **Seul un utilisateur avec le role `validateur` ou `admin` peut changer le statut d'une declaration vers `validee` ou `rejetee`.**
4. **Un etablissement `inactif` ne peut pas participer a une campagne.**
5. **Le score de completude est calcule automatiquement en fonction des indicateurs obligatoires remplis.**
6. **La date de cloture d'une campagne doit etre posterieure a sa date d'ouverture.**
7. **Un utilisateur ne peut gerer que les etablissements de sa region (sauf admin).**

---

*Document MCD — SICRES — Juillet 2026*
