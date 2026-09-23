import { apiClient } from "@/lib/axios";

import type {
  Etablissement,
  EtablissementsResponse,
  EtablissementsStatistics,
} from "../types";

/**
 * Récupère les établissements depuis l'API.
 */
export async function getEtablissements(): Promise<EtablissementsResponse> {
  const response =
    await apiClient.get<EtablissementsResponse>(
      "/etablissements",
    );

  return response.data;
}

/**
 * Normalise les différentes structures possibles
 * renvoyées par l'API.
 *
 * Le frontend travaille ensuite toujours avec :
 *
 * {
 *   data: Etablissement[],
 *   statistics: EtablissementsStatistics
 * }
 */
export function normalizeEtablissementsResponse(
  response: EtablissementsResponse,
): {
  data: Etablissement[];
  statistics: EtablissementsStatistics;
} {
  /**
   * Certaines API peuvent renvoyer :
   *
   * data
   * etablissements
   * results
   *
   * On accepte les trois formats.
   */
  const etablissements: Etablissement[] =
    Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.etablissements)
        ? response.etablissements
        : Array.isArray(response.results)
          ? response.results
          : [];

  /**
   * Si l'API fournit déjà des statistiques complètes,
   * on les conserve.
   *
   * Sinon, on les calcule à partir des établissements
   * reçus.
   */
  const statistics: EtablissementsStatistics = {
    total:
      typeof response.statistics?.total === "number"
        ? response.statistics.total
        : typeof response.total === "number"
          ? response.total
          : etablissements.length,

    actifs:
      typeof response.statistics?.actifs === "number"
        ? response.statistics.actifs
        : etablissements.filter(
            (etablissement) =>
              etablissement.statut === "actif",
          ).length,

    a_verifier:
      typeof response.statistics?.a_verifier === "number"
        ? response.statistics.a_verifier
        : etablissements.filter(
            (etablissement) =>
              etablissement.statut === "a_verifier",
          ).length,

    inactifs:
      typeof response.statistics?.inactifs === "number"
        ? response.statistics.inactifs
        : etablissements.filter(
            (etablissement) =>
              etablissement.statut === "inactif" ||
              etablissement.statut === "ferme",
          ).length,
  };

  return {
    data: etablissements,
    statistics,
  };
}