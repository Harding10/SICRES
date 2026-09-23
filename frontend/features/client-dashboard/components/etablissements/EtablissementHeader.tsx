"use client";

import Link from "next/link";

interface EtablissementHeaderProps {
  establishmentName?: string;
  onEdit?: () => void;
}

export default function EtablissementHeader({
  establishmentName,
  onEdit,
}: EtablissementHeaderProps) {
  return (
    <section className="border border-gray-200 bg-white px-5 py-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Mon établissement
          </p>

          <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
            Informations de l'établissement
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Consultez et mettez à jour les informations officielles
            enregistrées pour votre établissement.
          </p>

          {establishmentName && (
            <p className="mt-2 text-sm font-medium text-gray-700">
              {establishmentName}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/client_dashboard"
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#123524]"
          >
            Retour
          </Link>

          <Link
            href="/etablissement/documents"
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-[#123524]"
          >
            Gérer les documents
          </Link>

          <button
            type="button"
            onClick={onEdit}
            className="bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white"
            style={{ color: "#ffffff" }}
          >
            Modifier
          </button>
        </div>
      </div>
    </section>
  );
}