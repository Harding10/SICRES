import type { ReactNode } from "react";

/* =========================================================
 * TYPES D'ÉTABLISSEMENTS
 * ========================================================= */

export type TypeEtablissement =
  | "prescolaire"
  | "primaire"
  | "college"
  | "lycee"
  | "enseignement_technique"
  | "enseignement_professionnel"
  | "formation_insertion"
  | "universite"
  | "grande_ecole";

/* =========================================================
 * NIVEAUX / DIPLÔMES
 * ========================================================= */

export type NiveauEtablissement =
  | "petite_section"
  | "moyenne_section"
  | "grande_section"
  | "cp1"
  | "cp2"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "2nde"
  | "1ere"
  | "terminale"
  | "licence"
  | "master"
  | "doctorat"
  | "bts"
  | "bachelor"
  | "ingenieur"
  | "autre_formation";

/* =========================================================
 * DOMAINES — FORMATION / INSERTION PROFESSIONNELLE
 * ========================================================= */

export type DomaineFormationInsertion =
  | "agriculture"
  | "artisanat"
  | "batiment"
  | "menuiserie"
  | "mecanique"
  | "soudure"
  | "electricite"
  | "plomberie"
  | "couture"
  | "coiffure"
  | "esthetique"
  | "cuisine"
  | "patisserie"
  | "informatique"
  | "commerce"
  | "hotellerie"
  | "restauration"
  | "sport"
  | "football"
  | "autre";

/* =========================================================
 * DOMAINES — ENSEIGNEMENT PROFESSIONNEL
 * ========================================================= */

export type DomaineEnseignementProfessionnel =
  | "agriculture"
  | "industrie"
  | "batiment"
  | "mecanique"
  | "electricite"
  | "informatique"
  | "commerce"
  | "gestion"
  | "hotellerie"
  | "restauration"
  | "sante"
  | "autre";

/* =========================================================
 * ÉTABLISSEMENT
 * ========================================================= */

export interface Etablissement {
  id: number;

  /* ---------------------------------------------------------
   * Identification
   * --------------------------------------------------------- */

  code_etablissement?: string;

  sigle?: string;

  nom_officiel?: string;

  nom_usuel?: string;

  /**
   * Champ historique conservé pour compatibilité
   * avec les anciennes parties du frontend/backend.
   */
  nom: string;

  /* ---------------------------------------------------------
   * Classification
   * --------------------------------------------------------- */

  type?: string;

  types?: TypeEtablissement[];

  secteur?: "public" | "prive";

  /* ---------------------------------------------------------
   * Informations générales
   * --------------------------------------------------------- */

  responsable?: string;

  statut?: string;

  adresse?: string;

  telephone?: string;

  email?: string;

  /* ---------------------------------------------------------
   * Enseignement
   * --------------------------------------------------------- */

  niveaux?: NiveauEtablissement[];

  /* ---------------------------------------------------------
   * Formation / insertion professionnelle
   * --------------------------------------------------------- */

  domaines_formation_insertion?: DomaineFormationInsertion[];

  /* ---------------------------------------------------------
   * Enseignement professionnel
   * --------------------------------------------------------- */

  domaines_enseignement_professionnel?: DomaineEnseignementProfessionnel[];

  /* ---------------------------------------------------------
   * Rattachements institutionnels
   * --------------------------------------------------------- */

  dren?: string;

  iepp?: string;

  rattachement_technique?: string;

  rattachement_professionnel?: string;

  rattachement_insertion?: string;

  rattachement_superieur?: string;

  /* ---------------------------------------------------------
   * Localisation
   * --------------------------------------------------------- */

  sous_prefecture?: string;

  localite?: string;

  latitude?: number;

  longitude?: number;

  precision_gps?: number;
}

/* =========================================================
 * FORMULAIRE ÉTABLISSEMENT
 * ========================================================= */

export interface EtablissementForm {
  /* ---------------------------------------------------------
   * Identification
   * --------------------------------------------------------- */

  code_etablissement: string;

  sigle: string;

  nom_officiel: string;

  nom_usuel: string;

  /**
   * Champ de compatibilité avec l'ancien formulaire.
   * Il est aligné sur nom_officiel lors de la soumission.
   */
  nom: string;

  /* ---------------------------------------------------------
   * Classification
   * --------------------------------------------------------- */

  types: TypeEtablissement[];

  niveaux: NiveauEtablissement[];

  /* ---------------------------------------------------------
   * Domaines
   * --------------------------------------------------------- */

  domaines_formation_insertion: DomaineFormationInsertion[];

  domaines_enseignement_professionnel: DomaineEnseignementProfessionnel[];

  /* ---------------------------------------------------------
   * Informations générales
   * --------------------------------------------------------- */

  responsable: string;

  statut:
    | "actif"
    | "a_verifier"
    | "inactif"
    | "ferme"
    | "";

  secteur:
    | "public"
    | "prive"
    | "";

  adresse: string;

  telephone: string;

  email: string;

  /* ---------------------------------------------------------
   * Rattachements
   * --------------------------------------------------------- */

  dren: string;

  iepp: string;

  rattachement_technique: string;

  rattachement_professionnel: string;

  rattachement_insertion: string;

  rattachement_superieur: string;

  /* ---------------------------------------------------------
   * Localisation
   * --------------------------------------------------------- */

  sous_prefecture: string;

  localite: string;

  latitude: string;

  longitude: string;

  precision_gps: string;
}

/* =========================================================
 * FORMULAIRE VIDE
 * ========================================================= */

export const emptyEtablissementForm: EtablissementForm = {
  /* Identification */

  code_etablissement: "",

  sigle: "",

  nom_officiel: "",

  nom_usuel: "",

  nom: "",

  /* Classification */

  types: [],

  niveaux: [],

  /* Domaines */

  domaines_formation_insertion: [],

  domaines_enseignement_professionnel: [],

  /* Informations générales */

  responsable: "",

  statut: "",

  secteur: "",

  adresse: "",

  telephone: "",

  email: "",

  /* Rattachements */

  dren: "",

  iepp: "",

  rattachement_technique: "",

  rattachement_professionnel: "",

  rattachement_insertion: "",

  rattachement_superieur: "",

  /* Localisation */

  sous_prefecture: "",

  localite: "",

  latitude: "",

  longitude: "",

  precision_gps: "",
};

/* =========================================================
 * RÉPONSE API — ÉTABLISSEMENTS
 * ========================================================= */

export interface EtablissementsResponse {
  /**
   * Format principal attendu.
   */
  data?: Etablissement[];

  /**
   * Formats alternatifs possibles.
   */
  etablissements?: Etablissement[];

  results?: Etablissement[];

  /**
   * Nombre total éventuellement fourni
   * directement par l'API.
   */
  count?: number;

  total?: number;

  /**
   * Statistiques éventuellement fournies par l'API.
   */
  statistics?: EtablissementsStatistics;

  /**
   * Ces champs peuvent être fournis par une
   * ancienne version de l'API.
   */
  publics?: number;

  prives?: number;

  a_verifier?: number;
}

/* =========================================================
 * STATISTIQUES — ÉTABLISSEMENTS
 * ========================================================= */

export interface EtablissementsStatistics {
  total: number;

  actifs: number;

  a_verifier: number;

  inactifs: number;
}

/* =========================================================
 * RECENSEMENT
 * ========================================================= */

export interface Recensement {
  id: number;

  /* ---------------------------------------------------------
   * Établissement
   * --------------------------------------------------------- */

  etablissement?: string;

  etablissement_nom?: string;

  /* ---------------------------------------------------------
   * Campagne
   * --------------------------------------------------------- */

  campagne?: string;

  campagne_nom?: string;

  /* ---------------------------------------------------------
   * Recensement
   * --------------------------------------------------------- */

  date?: string;

  progression?: number;

  statut?: string;
}

/* =========================================================
 * STATISTIQUES — RECENSEMENTS
 * ========================================================= */

export interface RecensementsStatistics {
  total: number;

  valides: number;

  enCours: number;

  aTraiter: number;
}

/* =========================================================
 * CAMPAGNE
 * ========================================================= */

export interface Campagne {
  id: number;

  nom: string;

  /**
   * Certains endpoints peuvent utiliser "titre"
   * au lieu de "nom".
   */
  titre?: string;

  description?: string;

  date_debut?: string;

  date_fin?: string;

  /**
   * Compatibilité avec d'anciens formats API.
   */
  debut?: string;

  fin?: string;

  statut?: string;
}

/* =========================================================
 * STATISTIQUES — CAMPAGNES
 * ========================================================= */

export interface CampagnesStatistics {
  total: number;

  actives: number;

  planifiees: number;

  terminees: number;
}

/* =========================================================
 * STATISTIQUES GLOBALES
 * ========================================================= */

export interface StatistiquesData {
  /* ---------------------------------------------------------
   * Établissements
   * --------------------------------------------------------- */

  total_etablissements: number;

  etablissements_publics: number;

  etablissements_prives: number;

  etablissements_a_verifier: number;

  /* ---------------------------------------------------------
   * Recensements
   * --------------------------------------------------------- */

  total_recensements: number;

  recensements_valides: number;

  recensements_en_cours: number;

  recensements_a_traiter: number;

  /* ---------------------------------------------------------
   * Campagnes
   * --------------------------------------------------------- */

  campagnes_actives: number;

  /* ---------------------------------------------------------
   * Contexte communal
   * --------------------------------------------------------- */

  commune?: string;
}

/* =========================================================
 * CHAMP DE FORMULAIRE GÉNÉRIQUE
 * ========================================================= */

export interface EtablissementFormField {
  name: string;

  label: string;

  type?: string;

  placeholder?: string;

  required?: boolean;

  options?: Array<{
    value: string;
    label: string;
  }>;

  icon?: ReactNode;
}