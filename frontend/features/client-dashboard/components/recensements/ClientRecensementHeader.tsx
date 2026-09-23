"use client";

interface ClientRecensementHeaderProps {
  campagneNom?: string;
  anneeScolaire?: string;
}

export default function ClientRecensementHeader({
  campagneNom,
  anneeScolaire,
}: ClientRecensementHeaderProps) {
  return (
    <section className="border border-gray-200 bg-white px-5 py-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Recensement
        </p>

        <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
          Mon recensement
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Complétez les données annuelles de votre établissement.
        </p>

        {(campagneNom || anneeScolaire) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {campagneNom && (
              <span>
                Campagne :{" "}
                <strong className="font-semibold text-gray-700">
                  {campagneNom}
                </strong>
              </span>
            )}

            {anneeScolaire && (
              <span>
                Année scolaire :{" "}
                <strong className="font-semibold text-gray-700">
                  {anneeScolaire}
                </strong>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}