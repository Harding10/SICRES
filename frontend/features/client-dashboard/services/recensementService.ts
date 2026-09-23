import { authClient } from "@/lib/axios";

import type {
  ClientRecensement,
  RecensementSection,
} from "../types";

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getString(
  value: unknown,
): string | undefined {
  return typeof value === "string"
    ? value
    : undefined;
}

function getNumber(
  value: unknown,
  fallback = 0,
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function normalizeSection(
  value: unknown,
): RecensementSection | null {
  if (!isObject(value)) {
    return null;
  }

  const statut = getString(value.statut);

  let normalizedStatut:
    | "complete"
    | "en_cours"
    | "a_completer" = "a_completer";

  if (
    statut === "complete" ||
    statut === "completed" ||
    statut === "complet"
  ) {
    normalizedStatut = "complete";
  } else if (
    statut === "en_cours" ||
    statut === "en-cours" ||
    statut === "current"
  ) {
    normalizedStatut = "en_cours";
  }

  return {
    id:
      getString(value.id) ||
      getString(value.code) ||
      "",

    label:
      getString(value.label) ||
      getString(value.nom) ||
      getString(value.titre) ||
      "Section",

    description:
      getString(value.description) ||
      undefined,

    statut: normalizedStatut,

    progression:
      value.progression !== undefined
        ? getNumber(value.progression)
        : undefined,
  };
}

function normalizeRecensement(
  responseData: unknown,
): ClientRecensement {
  let data: Record<string, unknown> = {};

  if (isObject(responseData)) {
    if (isObject(responseData.data)) {
      data = responseData.data;
    } else if (isObject(responseData.recensement)) {
      data = responseData.recensement;
    } else {
      data = responseData;
    }
  }

  const rawSections = Array.isArray(data.sections)
    ? data.sections
    : [];

  return {
    id: getNumber(data.id),

    campagne_id:
      data.campagne_id !== undefined
        ? getNumber(data.campagne_id)
        : undefined,

    campagne_nom:
      getString(data.campagne_nom) ||
      getString(data.campagne) ||
      undefined,

    annee_scolaire:
      getString(data.annee_scolaire) ||
      undefined,

    statut:
      getString(data.statut) as ClientRecensement["statut"],

    progression: Math.min(
      100,
      Math.max(
        0,
        getNumber(data.progression),
      ),
    ),

    derniere_mise_a_jour:
      getString(
        data.derniere_mise_a_jour,
      ) || undefined,

    date_soumission:
      getString(data.date_soumission) ||
      undefined,

    sections: rawSections
      .map(normalizeSection)
      .filter(
        (
          section,
        ): section is RecensementSection =>
          section !== null,
      ),
  };
}

export async function getClientRecensement(): Promise<ClientRecensement> {
  const response = await authClient.get(
    "/api/client/recensement",
  );

  return normalizeRecensement(
    response.data,
  );
}