export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Tableau de bord
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Vue d'ensemble des établissements recensés dans la commune.
        </p>
      </div>

      {/* CARTES STATISTIQUES */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            Établissements
          </p>

          <p className="mt-2 text-3xl font-bold text-[#123524]">
            2
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Établissements recensés
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            Établissements publics
          </p>

          <p className="mt-2 text-3xl font-bold text-[#123524]">
            1
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Secteur public
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            Établissements privés
          </p>

          <p className="mt-2 text-3xl font-bold text-[#123524]">
            1
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Secteur privé
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">
            Commune
          </p>

          <p className="mt-2 text-xl font-bold text-[#123524]">
            Port-Bouët
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Zone de recensement
          </p>
        </div>
      </div>

      {/* CONTENU */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Activité récente
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Les données de recensement apparaîtront ici.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Répartition des établissements
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Les statistiques apparaîtront ici.
          </p>
        </div>
      </div>
    </div>
  );
}