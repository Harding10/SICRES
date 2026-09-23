import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
} from "lucide-react";

import type { Campagne } from "../../types";

import CampagneStatusBadge from "./CampagneStatusBadge";

interface CampagnesTableProps {
  campagnes: Campagne[];
}

export default function CampagnesTable({
  campagnes,
}: CampagnesTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Campagne
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Description
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Période
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Statut
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {campagnes.map(
              (campagne) => (
                <tr
                  key={campagne.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      {campagne.nom ||
                        campagne.titre ||
                        "—"}
                    </span>
                  </td>

                  <td className="max-w-[300px] px-6 py-4 text-sm text-gray-600">
                    <span className="line-clamp-2">
                      {campagne.description ||
                        "—"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays
                        size={16}
                        className="text-gray-400"
                      />

                      <span>
                        {campagne.date_debut ||
                          campagne.debut ||
                          "—"}

                        {" → "}

                        {campagne.date_fin ||
                          campagne.fin ||
                          "—"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <CampagneStatusBadge
                      statut={
                        campagne.statut
                      }
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#123524]"
                        aria-label="Voir la campagne"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        className="p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#123524]"
                        aria-label="Modifier la campagne"
                      >
                        <Pencil size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
        <p className="text-xs text-gray-500">
          {campagnes.length} résultat
          {campagnes.length > 1
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