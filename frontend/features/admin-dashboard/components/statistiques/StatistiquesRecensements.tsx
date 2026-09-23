import { ClipboardList } from "lucide-react";

interface StatistiquesRecensementsProps {
  total: number;
  valides: number;
  enCours: number;
  aTraiter: number;
}

export default function StatistiquesRecensements({
  total,
  valides,
  enCours,
  aTraiter,
}: StatistiquesRecensementsProps) {
  const validePercentage =
    total > 0
      ? (valides / total) * 100
      : 0;

  const enCoursPercentage =
    total > 0
      ? (enCours / total) * 100
      : 0;

  const aTraiterPercentage =
    total > 0
      ? (aTraiter / total) * 100
      : 0;

  return (
    <div className="border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          État des recensements
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Suivi de l'avancement des opérations.
        </p>
      </div>

      {total === 0 ? (
        <div className="mt-6 border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <ClipboardList
            size={24}
            className="mx-auto text-gray-400"
          />

          <p className="mt-3 text-sm font-medium text-gray-600">
            Aucun recensement disponible
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Les statistiques seront calculées automatiquement à partir des données reçues.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <ProgressRow
            label="Validés"
            value={valides}
            percentage={
              validePercentage
            }
          />

          <ProgressRow
            label="En cours"
            value={enCours}
            percentage={
              enCoursPercentage
            }
          />

          <ProgressRow
            label="À traiter"
            value={aTraiter}
            percentage={
              aTraiterPercentage
            }
          />
        </div>
      )}
    </div>
  );
}

interface ProgressRowProps {
  label: string;
  value: number;
  percentage: number;
}

function ProgressRow({
  label,
  value,
  percentage,
}: ProgressRowProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          {label}
        </span>

        <span className="text-sm font-semibold text-gray-900">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#123524]"
          style={{
            width: `${Math.min(
              Math.max(
                percentage,
                0,
              ),
              100,
            )}%`,
          }}
        />
      </div>
    </div>
  );
}