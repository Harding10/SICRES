"use client";

interface ClientRecensementOverviewProps {
  progression: number;
  statut: string;
  derniereMiseAJour?: string;
  dateSoumission?: string;
}

function normalizeProgression(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

function getStatusLabel(statut?: string) {
  const labels: Record<string, string> = {
    brouillon: "Brouillon",
    en_cours: "En cours",
    a_completer: "À compléter",
    soumis: "Soumis",
    en_verification: "En vérification",
    valide: "Validé",
    rejete: "Rejeté",
  };

  return labels[statut || ""] || "Non renseigné";
}

function getStatusStyle(statut?: string) {
  switch (statut) {
    case "valide":
      return "bg-green-50 text-green-700";

    case "soumis":
    case "en_verification":
      return "bg-blue-50 text-blue-700";

    case "en_cours":
    case "a_completer":
      return "bg-orange-50 text-orange-700";

    case "rejete":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatDate(date?: string) {
  if (!date) {
    return "Non renseignée";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

export default function ClientRecensementOverview({
  progression,
  statut,
  derniereMiseAJour,
  dateSoumission,
}: ClientRecensementOverviewProps) {
  const progress = normalizeProgression(progression);

  return (
    <section className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
        <h2 className="text-base font-bold text-gray-900">
          État du recensement
        </h2>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Progression
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-gray-900">
              {progress}%
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Statut
            </p>

            <span
              className={`mt-1.5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                statut,
              )}`}
            >
              {getStatusLabel(statut)}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Dernière mise à jour
            </p>

            <p className="mt-1.5 text-sm font-semibold text-gray-900">
              {formatDate(derniereMiseAJour)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Date de soumission
            </p>

            <p className="mt-1.5 text-sm font-semibold text-gray-900">
              {formatDate(dateSoumission)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#123524] transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}