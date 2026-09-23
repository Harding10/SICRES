import { apiClient } from "@/lib/axios";

import type {
  Campagne,
  CampagnesStatistics,
} from "../types";

/* =========================================================
 * RÉCUPÉRATION DES CAMPAGNES
 * ========================================================= */

export async function getCampagnes() {
  const response =
    await apiClient.get("/campagnes");

  return response.data;
}

/* =========================================================
 * NORMALISATION DE LA RÉPONSE API
 * ========================================================= */

export function normalizeCampagnesResponse(
  responseData: unknown,
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
    } else if (
      Array.isArray(data.campagnes)
    ) {
      campagnes =
        data.campagnes as Campagne[];
    }
  }

  const normaliseStatut = (
    statut?: string,
  ) =>
    statut?.trim().toLowerCase() ?? "";

  const actives =
    campagnes.filter((campagne) => {
      const statut =
        normaliseStatut(
          campagne.statut,
        );

      return (
        statut === "active" ||
        statut === "actif" ||
        statut === "en cours"
      );
    }).length;

  const planifiees =
    campagnes.filter((campagne) => {
      const statut =
        normaliseStatut(
          campagne.statut,
        );

      return (
        statut === "planifiée" ||
        statut === "planifiee" ||
        statut === "planifié" ||
        statut === "planifie"
      );
    }).length;

  const terminees =
    campagnes.filter((campagne) => {
      const statut =
        normaliseStatut(
          campagne.statut,
        );

      return (
        statut === "terminée" ||
        statut === "terminee" ||
        statut === "terminé" ||
        statut === "termine"
      );
    }).length;

  return {
    campagnes,

    statistics: {
      total: campagnes.length,
      actives,
      planifiees,
      terminees,
    },
  };
}