import { Building2 } from "lucide-react";

interface StatistiquesSecteursProps {
  etablissementsPublics: number;
  etablissementsPrives: number;
}

export default function StatistiquesSecteurs({
  etablissementsPublics,
  etablissementsPrives,
}: StatistiquesSecteursProps) {
  const total =
    etablissementsPublics +
    etablissementsPrives;

  const publicPercentage =
    total > 0
      ? (etablissementsPublics /
          total) *
        100
      : 0;

  const privePercentage =
    total > 0
      ? (etablissementsPrives /
          total) *
        100
      : 0;

  return (
    <div className="border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          Répartition des établissements
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Répartition entre secteur public et secteur privé.
        </p>
      </div>

      {total === 0 ? (
        <div className="mt-6 border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <Building2
            size={24}
            className="mx-auto text-gray-400"
          />

          <p className="mt-3 text-sm font-medium text-gray-600">
            Aucune donnée disponible
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Les statistiques apparaîtront lorsque les établissements seront enregistrés.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Public
              </span>

              <span className="text-sm font-semibold text-gray-900">
                {etablissementsPublics}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#123524]"
                style={{
                  width: `${publicPercentage}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Privé
              </span>

              <span className="text-sm font-semibold text-gray-900">
                {etablissementsPrives}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-400"
                style={{
                  width: `${privePercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Total
              </span>

              <span className="text-lg font-semibold text-gray-900">
                {total}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}