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

export type SecteurEtablissement = "public" | "prive" | "";

export type StatutEtablissement =
  | "actif"
  | "a_verifier"
  | "inactif"
  | "ferme"
  | "";

export interface Etablissement {
  id: number;

  code_etablissement?: string;

  sigle?: string;

  nom?: string;

  nom_officiel?: string;

  nom_usuel?: string;

  type?: string;

  types?: TypeEtablissement[];

  secteur?: SecteurEtablissement;

  statut?: StatutEtablissement;

  responsable?: string;

  adresse?: string;

  telephone?: string;

  email?: string;

  dren?: string;

  iepp?: string;

  rattachement_technique?: string;

  rattachement_professionnel?: string;

  rattachement_insertion?: string;

  rattachement_superieur?: string;

  sous_prefecture?: string;

  localite?: string;

  latitude?: number;

  longitude?: number;

  precision_gps?: number;
}

export interface EtablissementsResponse {
  data?: Etablissement[];

  etablissements?: Etablissement[];

  results?: Etablissement[];

  count?: number;

  total?: number;

  publics?: number;

  prives?: number;

  a_verifier?: number;
}

export interface EtablissementForm {
  code_etablissement: string;

  sigle: string;

  nom_officiel: string;

  nom_usuel: string;

  nom: string;

  types: TypeEtablissement[];

  secteur: SecteurEtablissement;

  statut: StatutEtablissement;

  responsable: string;

  adresse: string;

  telephone: string;

  email: string;

  dren: string;

  iepp: string;

  rattachement_technique: string;

  rattachement_professionnel: string;

  rattachement_insertion: string;

  rattachement_superieur: string;

  sous_prefecture: string;

  localite: string;

  latitude: string;

  longitude: string;

  precision_gps: string;
}

export const emptyEtablissementForm: EtablissementForm = {
  code_etablissement: "",

  sigle: "",

  nom_officiel: "",

  nom_usuel: "",

  nom: "",

  types: [],

  secteur: "",

  statut: "",

  responsable: "",

  adresse: "",

  telephone: "",

  email: "",

  dren: "",

  iepp: "",

  rattachement_technique: "",

  rattachement_professionnel: "",

  rattachement_insertion: "",

  rattachement_superieur: "",

  sous_prefecture: "",

  localite: "",

  latitude: "",

  longitude: "",

  precision_gps: "",
};

export interface EtablissementsStatistics {
  total: number;

  publics: number;

  prives: number;

  a_verifier: number;
}

/**
 * Document associé à un établissement.
 *
 * Les données réelles seront fournies par l'API Laravel.
 * Le frontend se contente de les afficher et de gérer les interactions.
 */
export interface EtablissementDocument {
  id: number | string;

  name: string;

  description?: string;

  type?: string;

  size?: number;

  createdAt?: string;

  downloadUrl?: string;
}

export interface Campagne {
  id: number;

  nom?: string;

  titre?: string;

  description?: string;

  date_debut?: string;

  date_fin?: string;

  statut?: string;
}

export interface Recensement {
  id: number;

  etablissement?: string;

  etablissement_nom?: string;

  campagne?: string;

  campagne_nom?: string;

  date?: string;

  progression?: number;

  statut?: string;
}

export interface RecensementsStatistics {
  total: number;

  valides: number;

  enCours: number;

  aTraiter: number;
}

export type StatutRecensement =
  | "brouillon"
  | "en_cours"
  | "a_completer"
  | "soumis"
  | "en_verification"
  | "valide"
  | "rejete"
  | "";

export interface RecensementSection {
  id: string;
  label: string;
  description?: string;
  statut: "complete" | "en_cours" | "a_completer";
  progression?: number;
}

export interface ClientRecensement {
  id: number;

  campagne_id?: number;

  campagne_nom?: string;

  annee_scolaire?: string;

  statut: StatutRecensement;

  progression: number;

  derniere_mise_a_jour?: string;

  date_soumission?: string;

  sections?: RecensementSection[];
}