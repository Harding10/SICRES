import { authClient } from "@/lib/axios";

import type { Etablissement } from "../types";

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
): number | undefined {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : undefined;
}

function getStringArray(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string",
  );
}

function normalizeEtablissement(
  responseData: unknown,
): Etablissement {
  let data: Record<string, unknown> = {};

  if (isObject(responseData)) {
    if (isObject(responseData.data)) {
      data = responseData.data;
    } else if (
      isObject(responseData.etablissement)
    ) {
      data = responseData.etablissement;
    } else if (
      isObject(responseData.establishment)
    ) {
      data = responseData.establishment;
    } else {
      data = responseData;
    }
  }

  return {
    id: getNumber(data.id) ?? 0,

    code_etablissement:
      getString(data.code_etablissement),

    sigle:
      getString(data.sigle),

    nom_officiel:
      getString(data.nom_officiel),

    nom_usuel:
      getString(data.nom_usuel),

    nom:
      getString(data.nom),

    types:
      getStringArray(data.types) as Etablissement["types"],

    type:
      getString(data.type),

    secteur:
      getString(data.secteur) as Etablissement["secteur"],

    responsable:
      getString(data.responsable),

    statut:
      getString(data.statut) as Etablissement["statut"],

    adresse:
      getString(data.adresse),

    telephone:
      getString(data.telephone),

    email:
      getString(data.email),

    dren:
      getString(data.dren),

    iepp:
      getString(data.iepp),

    rattachement_technique:
      getString(data.rattachement_technique),

    rattachement_professionnel:
      getString(data.rattachement_professionnel),

    rattachement_insertion:
      getString(data.rattachement_insertion),

    rattachement_superieur:
      getString(data.rattachement_superieur),

    sous_prefecture:
      getString(data.sous_prefecture),

    localite:
      getString(data.localite),

    latitude:
      getNumber(data.latitude),

    longitude:
      getNumber(data.longitude),

    precision_gps:
      getNumber(data.precision_gps),
  };
}

export async function getClientEtablissement(): Promise<Etablissement> {
  const response = await authClient.get(
    "/api/client/etablissement",
  );

  return normalizeEtablissement(response.data);
}

export async function updateClientEtablissement(
  data: Partial<Etablissement>,
): Promise<Etablissement> {
  const response = await authClient.put(
    "/api/client/etablissement",
    data,
  );

  return normalizeEtablissement(response.data);
}