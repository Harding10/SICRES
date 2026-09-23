import { apiClient } from "@/lib/axios";

export interface DashboardResponse {
  data?: unknown;
  total_etablissements?: number;
  etablissements_publics?: number;
  etablissements_prives?: number;
  etablissements_a_verifier?: number;
  total_recensements?: number;
  recensements_valides?: number;
  recensements_en_cours?: number;
  recensements_a_traiter?: number;
  campagnes_actives?: number;
  commune?: string;
}

export interface Statistiques {
  total_etablissements: number;
  etablissements_publics: number;
  etablissements_prives: number;
  etablissements_a_verifier: number;
  total_recensements: number;
  recensements_valides: number;
  recensements_en_cours: number;
  recensements_a_traiter: number;
  campagnes_actives: number;
  commune?: string;
}

export interface Campagne {
  id: number;
  nom?: string;
  titre?: string;
  description?: string;
  date_debut?: string;
  date_fin?: string;
  debut?: string;
  fin?: string;
  statut?: string;
}

export interface CampagnesStatistics {
  total: number;
  actives: number;
  terminees: number;
  planifiees: number;
}

export async function getDashboard() {
  const response = await apiClient.get("/dashboard");

  return response.data;
}

export async function getCampagnes() {
  const response = await apiClient.get("/campagnes");

  return response.data;
}

export function normalizeCampagnesResponse(
  responseData: unknown
): {
  campagnes: Campagne[];
  statistics: CampagnesStatistics;
} {
  let campagnes: Campagne[] = [];

  if (Array.isArray(responseData)) {
    campagnes = responseData as Campagne[];
  } else if (
    responseData &&
    typeof responseData === "object"
  ) {
    const data = responseData as {
      data?: unknown;
      campagnes?: unknown;
    };

    if (Array.isArray(data.data)) {
      campagnes = data.data as Campagne[];
    } else if (Array.isArray(data.campagnes)) {
      campagnes = data.campagnes as Campagne[];
    }
  }

  const normaliseStatut = (statut?: string) =>
    statut?.trim().toLowerCase() || "";

  const actives = campagnes.filter((campagne) => {
    const statut = normaliseStatut(campagne.statut);

    return (
      statut === "active" ||
      statut === "actif" ||
      statut === "en cours"
    );
  }).length;

  const terminees = campagnes.filter((campagne) => {
    const statut = normaliseStatut(campagne.statut);

    return (
      statut === "terminée" ||
      statut === "terminee" ||
      statut === "terminé" ||
      statut === "termine"
    );
  }).length;

  const planifiees = campagnes.filter((campagne) => {
    const statut = normaliseStatut(campagne.statut);

    return (
      statut === "planifiée" ||
      statut === "planifiee" ||
      statut === "planifié" ||
      statut === "planifie"
    );
  }).length;

  return {
    campagnes,
    statistics: {
      total: campagnes.length,
      actives,
      terminees,
      planifiees,
    },
  };
}

export async function getStatistiques() {
  const response = await apiClient.get("/statistiques");

  return response.data;
}

export function normalizeStatistiquesResponse(
  responseData: unknown
): Statistiques {
  let data: Record<string, unknown> = {};

  if (
    responseData &&
    typeof responseData === "object"
  ) {
    const response = responseData as {
      data?: unknown;
    };

    if (
      response.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data)
    ) {
      data = response.data as Record<string, unknown>;
    } else {
      data = responseData as Record<string, unknown>;
    }
  }

  return {
    total_etablissements:
      Number(data.total_etablissements) || 0,

    etablissements_publics:
      Number(data.etablissements_publics) || 0,

    etablissements_prives:
      Number(data.etablissements_prives) || 0,

    etablissements_a_verifier:
      Number(data.etablissements_a_verifier) || 0,

    total_recensements:
      Number(data.total_recensements) || 0,

    recensements_valides:
      Number(data.recensements_valides) || 0,

    recensements_en_cours:
      Number(data.recensements_en_cours) || 0,

    recensements_a_traiter:
      Number(data.recensements_a_traiter) || 0,

    campagnes_actives:
      Number(data.campagnes_actives) || 0,

    commune:
      typeof data.commune === "string"
        ? data.commune
        : undefined,
  };
}