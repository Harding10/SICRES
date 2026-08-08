"use client";

import { Etablissement } from "../types";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  data: Etablissement[];
  onEdit: (etablissement: Etablissement) => void;
  onDelete: (id: number) => void;
}

export default function EtablissementTable({
  data,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">
                Code
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Établissement
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Type
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Niveau
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Directeur
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Commune
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Téléphone
              </th>

              <th className="px-6 py-4 text-center font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.code}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.nom}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.type === "Public"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.niveau}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.directeur}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.commune}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.telephone}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* MODIFIER */}
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        title="Modifier"
                        aria-label={`Modifier ${item.nom}`}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* SUPPRIMER */}
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        title="Supprimer"
                        aria-label={`Supprimer ${item.nom}`}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Aucun établissement trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}