"use client";

import EtablissementDocuments from "@/features/client-dashboard/components/etablissements/EtablissementDocuments";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Mon établissement
        </p>

        <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
          Mes documents
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Retrouvez les documents associés à votre établissement.
        </p>
      </div>

      <EtablissementDocuments />
    </div>
  );
}