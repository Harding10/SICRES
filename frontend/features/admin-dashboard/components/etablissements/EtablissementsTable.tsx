"use client";

import {
  Edit3,
  Eye,
  Search,
} from "lucide-react";

import type {
  Etablissement,
  TypeEtablissement,
} from "../../types";

import StatusBadge from "./StatusBadge";

interface EtablissementsTableProps {
  etablissements: Etablissement[];
  search: string;
  onSearchChange: (value: string) => void;
  onView: (etablissement: Etablissement) => void;
  onEdit: (etablissement: Etablissement) => void;
}

const TYPE_LABELS: Record<TypeEtablissement, string> = {
  prescolaire: "Préscolaire",
  primaire: "Primaire",
  college: "Collège",
  lycee: "Lycée",
  enseignement_technique: "Enseignement technique",
  enseignement_professionnel: "Enseignement professionnel",
  formation_insertion: "Formation / insertion",
  universite: "Université",
  grande_ecole: "Grande école",
};

function getTypeLabel(type: string): string {
  if (type in TYPE_LABELS) {
    return TYPE_LABELS[type as TypeEtablissement];
  }

  return type;
}

function formatTypes(etablissement: Etablissement): string[] {
  if (etablissement.types?.length) {
    return etablissement.types.map(getTypeLabel);
  }

  if (etablissement.type) {
    return [getTypeLabel(etablissement.type)];
  }

  return [];
}

function getDisplayName(
  etablissement: Etablissement,
): string {
  return (
    etablissement.nom_officiel ||
    etablissement.nom_usuel ||
    etablissement.nom ||
    "Sans nom"
  );
}

function getSecondaryName(
  etablissement: Etablissement,
): string | null {
  const officiel =
    etablissement.nom_officiel ||
    etablissement.nom;

  const usuel = etablissement.nom_usuel;

  if (
    usuel &&
    officiel &&
    usuel.toLowerCase() !== officiel.toLowerCase()
  ) {
    return usuel;
  }

  return null;
}

function formatStatut(statut?: string): string {
  switch (statut) {
    case "actif":
      return "Actif";

    case "a_verifier":
      return "À vérifier";

    case "inactif":
      return "Inactif";

    case "ferme":
      return "Fermé";

    default:
      return statut || "Non renseigné";
  }
}

export default function EtablissementsTable({
  etablissements,
  search,
  onSearchChange,
  onView,
  onEdit,
}: EtablissementsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="relative max-w-xl">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Rechercher par code, nom, sigle, type, localité..."
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {etablissements.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Search size={21} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            Aucun établissement trouvé
          </h3>

          <p className="mt-1 max-w-md text-sm text-gray-500">
            Aucun établissement ne correspond aux critères
            de recherche.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Établissement
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Code / Sigle
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Types
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Secteur
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Localisation
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Statut
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {etablissements.map((etablissement) => {
                const types =
                  formatTypes(etablissement);

                const displayName =
                  getDisplayName(etablissement);

                const secondaryName =
                  getSecondaryName(etablissement);

                return (
                  <tr
                    key={etablissement.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 align-top">
                      <div className="min-w-[240px]">
                        <p className="font-semibold text-gray-900">
                          {displayName}
                        </p>

                        {secondaryName && (
                          <p className="mt-1 text-xs text-gray-500">
                            Nom usuel : {secondaryName}
                          </p>
                        )}

                        {etablissement.responsable && (
                          <p className="mt-1 text-xs text-gray-500">
                            Responsable :{" "}
                            {etablissement.responsable}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">
                          {etablissement.code_etablissement ||
                            "—"}
                        </p>

                        {etablissement.sigle && (
                          <p className="text-xs font-semibold uppercase text-gray-500">
                            {etablissement.sigle}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex max-w-[260px] flex-wrap gap-1.5">
                        {types.length > 0 ? (
                          types.map((type) => (
                            <span
                              key={type}
                              className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700"
                            >
                              {type}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            —
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <span className="text-sm text-gray-700">
                        {etablissement.secteur ===
                        "public"
                          ? "Public"
                          : etablissement.secteur ===
                              "prive"
                            ? "Privé"
                            : "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="min-w-[170px]">
                        {etablissement.localite && (
                          <p className="text-sm font-medium text-gray-800">
                            {etablissement.localite}
                          </p>
                        )}

                        {etablissement.sous_prefecture && (
                          <p className="mt-1 text-xs text-gray-500">
                            {etablissement.sous_prefecture}
                          </p>
                        )}

                        {!etablissement.localite &&
                          !etablissement.sous_prefecture && (
                            <span className="text-sm text-gray-400">
                              —
                            </span>
                          )}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <StatusBadge
                        status={formatStatut(
                          etablissement.statut,
                        )}
                      />
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onView(etablissement)
                          }
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                          title="Voir"
                        >
                          <Eye size={16} />
                          Voir
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onEdit(etablissement)
                          }
                          className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-800 px-3 text-sm font-medium text-white transition hover:bg-slate-700"
                          title="Modifier"
                        >
                          <Edit3 size={16} />
                          Modifier
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}