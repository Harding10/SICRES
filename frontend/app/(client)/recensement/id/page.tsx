"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecensementDetailsPage() {
  const params = useParams();

  const id = params.id;

  return (
    <div className="space-y-6">
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Recensements
            </p>

            <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
              Détails du recensement
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Consultez les informations enregistrées pour
              ce recensement.
            </p>
          </div>

          <Link
            href="/recensement/formulaire"
            className="inline-flex shrink-0 items-center justify-center bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
            style={{ color: "#ffffff" }}
          >
            + Nouveau recensement
          </Link>
        </div>
      </section>

      <section className="border border-gray-200 bg-white px-5 py-6">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Recensement
        </p>

        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          Recensement #{id}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Les informations détaillées de ce recensement
          seront affichées ici à partir des données fournies
          par l'API.
        </p>
      </section>
    </div>
  );
}