"use client";

import type { RecensementSection } from "../../types";

import ClientRecensementSectionCard from "./ClientRecensementSectionCard";

interface ClientRecensementSectionsProps {
  sections: RecensementSection[];
}

export default function ClientRecensementSections({
  sections,
}: ClientRecensementSectionsProps) {
  return (
    <section className="border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Formulaire de recensement
        </p>

        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          Données à renseigner
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Sélectionnez une section pour accéder à son
          formulaire.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-gray-500">
            Aucune section de recensement n'est disponible.
          </p>
        </div>
      ) : (
        <div>
          {sections.map((section) => (
            <ClientRecensementSectionCard
              key={section.id}
              section={section}
            />
          ))}
        </div>
      )}
    </section>
  );
}