import { apiClient } from "@/lib/axios";

import type { StatistiquesData } from "../types";

/* =========================================================
 * RÉCUPÉRATION DES STATISTIQUES
 * ========================================================= */

export async function getStatistiques() {
  const response =
    await apiClient.get("/statistiques");

  return response.data;
}

/* =========================================================
 * NORMALISATION DE LA RÉPONSE API
 * ========================================================= */

export function normalizeStatistiquesResponse(
  responseData: unknown,
): StatistiquesData {
  let data: Record<
    string,
    unknown
  > = {};

  if (
    responseData &&
    typeof responseData === "object"
  ) {
    const response =
      responseData as {
        data?: unknown;
      };

    if (
      response.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data)
    ) {
      data =
        response.data as Record<
          string,
          unknown
        >;
    } else {
      data =
        responseData as Record<
          string,
          unknown
        >;
    }
  }

  return {
    total_etablissements:
      Number(
        data.total_etablissements,
      ) || 0,

    etablissements_publics:
      Number(
        data.etablissements_publics,
      ) || 0,

    etablissements_prives:
      Number(
        data.etablissements_prives,
      ) || 0,

    etablissements_a_verifier:
      Number(
        data.etablissements_a_verifier,
      ) || 0,

    total_recensements:
      Number(
        data.total_recensements,
      ) || 0,

    recensements_valides:
      Number(
        data.recensements_valides,
      ) || 0,

    recensements_en_cours:
      Number(
        data.recensements_en_cours,
      ) || 0,

    recensements_a_traiter:
      Number(
        data.recensements_a_traiter,
      ) || 0,

    campagnes_actives:
      Number(
        data.campagnes_actives,
      ) || 0,

    commune:
      typeof data.commune ===
      "string"
        ? data.commune
        : undefined,
  };
}