interface CampagnesStatsProps {
  total: number;
  actives: number;
  planifiees: number;
  terminees: number;
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

export default function CampagnesStats({
  total,
  actives,
  planifiees,
  terminees,
  loading,
}: CampagnesStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatItem
        label="Total"
        value={total}
        description="Campagnes enregistrées"
        loading={loading}
      />

      <StatItem
        label="Actives"
        value={actives}
        description="Campagnes en cours"
        loading={loading}
      />

      <StatItem
        label="Planifiées"
        value={planifiees}
        description="Campagnes à venir"
        loading={loading}
      />

      <StatItem
        label="Terminées"
        value={terminees}
        description="Campagnes clôturées"
        loading={loading}
      />
    </div>
  );
}