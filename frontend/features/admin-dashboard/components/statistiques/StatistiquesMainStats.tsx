import type { StatistiquesData } from "../../types";

interface StatistiquesMainStatsProps {
  data: StatistiquesData;
}

interface MainStatProps {
  label: string;
  value: number;
  description: string;
}

function MainStat({
  label,
  value,
  description,
}: MainStatProps) {
  return (
    <div className="border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function StatistiquesMainStats({
  data,
}: StatistiquesMainStatsProps) {
  const totalSecteur =
    data.etablissements_publics +
    data.etablissements_prives;

  const publicPercentage =
    totalSecteur > 0
      ? (
          (data.etablissements_publics /
            totalSecteur) *
          100
        ).toFixed(1)
      : "0.0";

  const privePercentage =
    totalSecteur > 0
      ? (
          (data.etablissements_prives /
            totalSecteur) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MainStat
        label="Établissements"
        value={
          data.total_etablissements
        }
        description="Total recensé"
      />

      <MainStat
        label="Recensements"
        value={
          data.total_recensements
        }
        description="Total enregistré"
      />

      <MainStat
        label="Secteur public"
        value={
          data.etablissements_publics
        }
        description={`${publicPercentage} % des établissements`}
      />

      <MainStat
        label="Secteur privé"
        value={
          data.etablissements_prives
        }
        description={`${privePercentage} % des établissements`}
      />
    </div>
  );
}