import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

interface Recensement {
  progression: number;
  statut: string;
  derniere_mise_a_jour?: string;
}

interface ClientRecensementStatusProps {
  recensement: Recensement;
}

function normalizeProgression(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

function getStatusStyle(statut?: string) {
  const value = statut?.trim().toLowerCase() || "";

  if (
    value === "validé" ||
    value === "valide" ||
    value === "terminé" ||
    value === "termine"
  ) {
    return {
      label: statut,
      className: "bg-green-50 text-green-700",
    };
  }

  if (
    value === "en cours" ||
    value === "en-cours"
  ) {
    return {
      label: statut,
      className: "bg-blue-50 text-blue-700",
    };
  }

  if (
    value === "à traiter" ||
    value === "a traiter" ||
    value === "à compléter" ||
    value === "a completer"
  ) {
    return {
      label: statut,
      className: "bg-orange-50 text-orange-700",
    };
  }

  return {
    label: statut || "Non renseigné",
    className: "bg-gray-100 text-gray-600",
  };
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

export default function ClientRecensementStatus({
  recensement,
}: ClientRecensementStatusProps) {
  const progress = normalizeProgression(recensement.progression);
  const status = getStatusStyle(recensement.statut);

  return (
    <section className="border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
              <ClipboardCheck
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                État de mon recensement
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Suivez l'avancement de votre dossier.
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Progression
          </span>

          <span className="text-sm font-semibold text-gray-800">
            {progress}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#123524] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Statut
            </p>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {status.label}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Dernière mise à jour
            </p>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {formatDate(recensement.derniere_mise_a_jour)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Link
            href="/recensement"
            className="inline-flex items-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white"
            style={{ color: "#ffffff" }}
          >
            <span className="!text-white">
              Consulter le recensement
            </span>

            <ArrowRight
              size={15}
              strokeWidth={1.8}
              className="!text-white"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}