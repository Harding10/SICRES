import { authClient } from "@/lib/axios";

export interface ClientDashboardData {
  etablissement: {
    id: number;
    nom: string;
    type?: string;
    responsable?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    statut?: string;
  };

  recensement: {
    progression: number;
    statut: string;
    derniere_mise_a_jour?: string;
  };

  campagne: {
    id?: number;
    nom?: string;
    date_debut?: string;
    date_fin?: string;
    statut?: string;
  } | null;

  notifications: Array<{
    id: number;
    titre: string;
    message: string;
    date?: string;
    lu?: boolean;
  }>;
}

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
  fallback = "",
): string {
  return typeof value === "string"
    ? value
    : fallback;
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

function normalizeDashboardResponse(
  responseData: unknown,
): ClientDashboardData {
  let data: Record<string, unknown> = {};

  if (isObject(responseData)) {
    if (isObject(responseData.data)) {
      data = responseData.data;
    } else {
      data = responseData;
    }
  }

  const rawEtablissement =
    isObject(data.etablissement)
      ? data.etablissement
      : isObject(data.establishment)
        ? data.establishment
        : {};

  const rawRecensement =
    isObject(data.recensement)
      ? data.recensement
      : {};

  const rawCampagne =
    isObject(data.campagne)
      ? data.campagne
      : null;

  const rawNotifications =
    Array.isArray(data.notifications)
      ? data.notifications
      : [];

  return {
    etablissement: {
      id: getNumber(rawEtablissement.id),

      nom:
        getString(rawEtablissement.nom) ||
        getString(rawEtablissement.nom_officiel) ||
        getString(rawEtablissement.nom_usuel),

      type: getString(rawEtablissement.type),

      responsable: getString(
        rawEtablissement.responsable,
      ),

      adresse: getString(
        rawEtablissement.adresse,
      ),

      telephone: getString(
        rawEtablissement.telephone,
      ),

      email: getString(
        rawEtablissement.email,
      ),

      statut: getString(
        rawEtablissement.statut,
      ),
    },

    recensement: {
      progression: getNumber(
        rawRecensement.progression,
      ),

      statut: getString(
        rawRecensement.statut,
      ),

      derniere_mise_a_jour:
        getString(
          rawRecensement.derniere_mise_a_jour,
        ) || undefined,
    },

    campagne: rawCampagne
      ? {
          id:
            getNumber(rawCampagne.id) ||
            undefined,

          nom:
            getString(rawCampagne.nom) ||
            getString(rawCampagne.titre),

          date_debut:
            getString(
              rawCampagne.date_debut,
            ) || undefined,

          date_fin:
            getString(
              rawCampagne.date_fin,
            ) || undefined,

          statut:
            getString(
              rawCampagne.statut,
            ) || undefined,
        }
      : null,

    notifications: rawNotifications
      .filter(isObject)
      .map((notification) => ({
        id: getNumber(notification.id),

        titre: getString(
          notification.titre,
        ),

        message: getString(
          notification.message,
        ),

        date:
          getString(notification.date) ||
          undefined,

        lu:
          typeof notification.lu === "boolean"
            ? notification.lu
            : undefined,
      })),
  };
}

export async function getClientDashboard(): Promise<ClientDashboardData> {
  const response = await authClient.get(
    "/api/client/dashboard",
  );

  return normalizeDashboardResponse(
    response.data,
  );
}