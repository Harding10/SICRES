import { apiClient } from "@/lib/axios";

import type {
  Recensement,
  RecensementsStatistics,
} from "../types";

export async function getRecensements() {
  const response =
    await apiClient.get("/recensements");

  return response.data;
}

export function normalizeRecensementsResponse(
  responseData: unknown,
): {
  recensements: Recensement[];
  statistics: RecensementsStatistics;
} {
  let recensements: Recensement[] = [];

  if (Array.isArray(responseData)) {
    recensements =
      responseData as Recensement[];
  } else if (
    responseData &&
    typeof responseData === "object"
  ) {
    const data = responseData as {
      data?: unknown;
      recensements?: unknown;
    };

    if (Array.isArray(data.data)) {
      recensements =
        data.data as Recensement[];
    } else if (
      Array.isArray(data.recensements)
    ) {
      recensements =
        data.recensements as Recensement[];
    }
  }

  const valides =
    recensements.filter((item) => {
      const statut =
        item.statut
          ?.trim()
          .toLowerCase();

      return (
        statut === "validé" ||
        statut === "valide"
      );
    }).length;

  const enCours =
    recensements.filter((item) => {
      const statut =
        item.statut
          ?.trim()
          .toLowerCase();

      return statut === "en cours";
    }).length;

  const aTraiter =
    recensements.filter((item) => {
      const statut =
        item.statut
          ?.trim()
          .toLowerCase();

      return (
        statut === "à traiter" ||
        statut === "a traiter"
      );
    }).length;

  return {
    recensements,

    statistics: {
      total: recensements.length,
      valides,
      enCours,
      aTraiter,
    },
  };
}