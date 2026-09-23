interface StatCardProps {
label: string;
value: number;
description: string;
loading: boolean;
}

export default function StatCard({
label,
value,
description,
loading,
}: StatCardProps) {
return (
<div className="border border-gray-200 bg-white px-5 py-4 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
{label}
</p>

  <p className="mt-2 text-2xl font-bold text-gray-900">
    {loading ? "—" : new Intl.NumberFormat("fr-FR").format(value)}
  </p>

  <p className="mt-1 text-xs text-gray-500">
    {description}
  </p>
</div>

);
}