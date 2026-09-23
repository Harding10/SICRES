import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import type { Recensement } from "../../types";

import RecensementStatusBadge from "./RecensementStatusBadge";

interface RecensementsTableProps {
  recensements: Recensement[];
}

export default function RecensementsTable({
  recensements,
}: RecensementsTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Établissement
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Campagne
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Progression
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Statut
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {recensements.map((recensement) => (
              <tr
                key={recensement.id}
                className="border-b border-gray-100 transition hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {recensement.etablissement ||
                    recensement.etablissement_nom ||
                    "—"}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {recensement.campagne ||
                    recensement.campagne_nom ||
                    "—"}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {recensement.date || "—"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#123524]"
                        style={{
                          width:
                            typeof recensement.progression ===
                            "number"
                              ? `${Math.min(
                                  Math.max(
                                    recensement.progression,
                                    0
                                  ),
                                  100
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>

                    <span className="text-sm text-gray-600">
                      {typeof recensement.progression ===
                      "number"
                        ? `${recensement.progression}%`
                        : "—"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <RecensementStatusBadge
                    statut={recensement.statut}
                  />
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    className="p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#123524]"
                    aria-label="Voir le recensement"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
        <p className="text-xs text-gray-500">
          {recensements.length} résultat
          {recensements.length > 1
            ? "s"
            : ""}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-300"
            aria-label="Page précédente"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="flex h-8 min-w-8 items-center justify-center bg-[#123524] px-2 text-xs font-medium text-white">
            1
          </span>

          <button
            type="button"
            disabled
            className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-300"
            aria-label="Page suivante"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}