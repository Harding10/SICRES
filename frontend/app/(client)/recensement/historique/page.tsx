"use client";

import Link from "next/link";

export default function RecensementHistoriquePage() {
  return (
    <div className="space-y-6">
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Recensements
            </p>

            <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
              Historique des recensements
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Consultez les recensements réalisés précédemment
              pour votre établissement.
            </p>
          </div>

          <Link
            href="/recensement/formulaire"
            className="bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
            style={{ color: "#ffffff" }}
          >
            + Recenser
          </Link>
        </div>
      </section>

      <section className="border border-gray-200 bg-white px-5 py-10 text-center">
        <p className="text-sm font-medium text-gray-700">
          Aucun historique disponible
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Les anciens recensements seront affichés ici
          lorsqu'ils seront disponibles.
        </p>
      </section>
    </div>
  );
}