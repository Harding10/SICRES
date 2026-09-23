interface RecensementsStatsProps {
  total: number;
  valides: number;
  enCours: number;
  aTraiter: number;
  loading: boolean;
}

interface StatItemProps {
  label: string;
  value: number;
  description: string;
  loading: boolean;
}

function StatItem({
  label,
  value,
  description,
  loading,
}: StatItemProps) {
  return (
    <div className="border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {loading ? "—" : value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function RecensementsStats({
  total,
  valides,
  enCours,
  aTraiter,
  loading,
}: RecensementsStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatItem
        label="Total"
        value={total}
        description="Recensements enregistrés"
        loading={loading}
      />

      <StatItem
        label="Validés"
        value={valides}
        description="Recensements validés"
        loading={loading}
      />

      <StatItem
        label="En cours"
        value={enCours}
        description="Recensements en cours"
        loading={loading}
      />

      <StatItem
        label="À traiter"
        value={aTraiter}
        description="Recensements à traiter"
        loading={loading}
      />
    </div>
  );
}