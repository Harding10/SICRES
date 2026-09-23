import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";

interface Establishment {
  id: number;
  nom: string;
  type?: string;
  responsable?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  statut?: string;
}

interface ClientAccountCardProps {
  establishment: Establishment;
}

function formatValue(value?: string) {
  return value && value.trim() ? value : "Non renseigné";
}

export default function ClientAccountCard({
  establishment,
}: ClientAccountCardProps) {
  return (
    <section className="border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Mon établissement
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-gray-900">
            {establishment.nom || "Établissement"}
          </h2>
        </div>

        <Link
          href="/etablissement/modifier"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#123524] hover:underline"
        >
          Modifier les informations
          <ArrowRight size={15} strokeWidth={1.8} />
        </Link>
      </div>

      <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Identifiant
          </p>

          <p className="mt-1.5 text-sm font-semibold text-gray-800">
            {establishment.id}
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Type
          </p>

          <p className="mt-1.5 text-sm font-semibold text-gray-800">
            {formatValue(establishment.type)}
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Responsable
          </p>

          <p className="mt-1.5 text-sm font-semibold text-gray-800">
            {formatValue(establishment.responsable)}
          </p>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Statut
          </p>

          <p className="mt-1.5 text-sm font-semibold text-gray-800">
            {formatValue(establishment.statut)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-gray-100 border-t border-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex items-center gap-3 px-5 py-4">
          <MapPin
            size={17}
            strokeWidth={1.8}
            className="shrink-0 text-gray-400"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Adresse
            </p>

            <p className="mt-1 truncate text-sm text-gray-700">
              {formatValue(establishment.adresse)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <Phone
            size={17}
            strokeWidth={1.8}
            className="shrink-0 text-gray-400"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Téléphone
            </p>

            <p className="mt-1 truncate text-sm text-gray-700">
              {formatValue(establishment.telephone)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}