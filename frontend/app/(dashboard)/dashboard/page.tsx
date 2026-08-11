import {
  Building2,
  Building,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  ClipboardCheck,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const statistics = [
    {
      label: "Établissements",
      value: "2",
      description: "Établissements recensés",
      icon: Building2,
      iconClass: "bg-[#3b8c7d]/10 text-[#3b8c7d]",
    },
    {
      label: "Établissements publics",
      value: "1",
      description: "Secteur public",
      icon: Building,
      iconClass: "bg-[#3b8c7d]/10 text-[#3b8c7d]",
    },
    {
      label: "Établissements privés",
      value: "1",
      description: "Secteur privé",
      icon: GraduationCap,
      iconClass: "bg-[#FFA800]/10 text-[#FFA800]",
    },
    {
      label: "Commune",
      value: "Port-Bouët",
      description: "Zone de recensement",
      icon: MapPin,
      iconClass: "bg-[#FFA800]/10 text-[#FFA800]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* EN-TÊTE */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-[#3b8c7d]">
            Vue d'ensemble
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-gray-900)] sm:text-3xl">
            Tableau de bord
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Vue d'ensemble des établissements recensés dans la commune.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#3b8c7d]/10 bg-[#3b8c7d]/5 px-3 py-2">
          <Activity size={17} className="text-[#3b8c7d]" />

          <span className="text-xs font-medium text-[#3b8c7d]">
            Données du recensement
          </span>
        </div>
      </div>

      {/* CARTES STATISTIQUES */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3b8c7d]/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={21} strokeWidth={2} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-gray-300 transition-colors group-hover:text-[#3b8c7d]"
                />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-gray-900)]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ACTIVITÉ RÉCENTE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--color-gray-900)]">
                Activité récente
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Suivi des dernières opérations de recensement.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b8c7d]/10">
              <ClipboardCheck
                size={20}
                className="text-[#3b8c7d]"
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Activity size={21} className="text-[#3b8c7d]" />
            </div>

            <p className="mt-4 text-sm font-medium text-[var(--color-gray-900)]">
              Aucune activité récente
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-500">
              Les nouvelles opérations de recensement apparaîtront
              automatiquement dans cette section.
            </p>
          </div>
        </div>

        {/* RÉPARTITION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--color-gray-900)]">
                Répartition
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Par secteur
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA800]/10">
              <Building2
                size={20}
                className="text-[#FFA800]"
              />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* PUBLIC */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Public
                </span>

                <span className="text-sm font-semibold text-[var(--color-gray-900)]">
                  1
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-1/2 rounded-full bg-[#3b8c7d]" />
              </div>
            </div>

            {/* PRIVÉ */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Privé
                </span>

                <span className="text-sm font-semibold text-[var(--color-gray-900)]">
                  1
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-1/2 rounded-full bg-[#FFA800]" />
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Total
              </span>

              <span className="text-lg font-bold text-[var(--color-gray-900)]">
                2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}