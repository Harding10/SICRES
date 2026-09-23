"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { getClientRecensement } from "../../services/recensementService";
import type { ClientRecensement } from "../../types";

import ClientRecensementLoading from "./ClientRecensementLoading";
import ClientRecensementError from "./ClientRecensementError";

function getStatutLabel(
  statut: ClientRecensement["statut"],
) {
  switch (statut) {
    case "brouillon":
      return "Brouillon";
    case "en_cours":
      return "En cours";
    case "a_completer":
      return "À compléter";
    case "soumis":
      return "Soumis";
    case "en_verification":
      return "En vérification";
    case "valide":
      return "Validé";
    case "rejete":
      return "Rejeté";
    default:
      return "Non renseigné";
  }
}

function getStatutClass(
  statut: ClientRecensement["statut"],
) {
  switch (statut) {
    case "valide":
      return "text-green-700";

    case "soumis":
    case "en_verification":
      return "text-blue-700";

    case "en_cours":
      return "text-amber-700";

    case "a_completer":
    case "rejete":
      return "text-red-700";

    default:
      return "text-gray-600";
  }
}

export default function RecensementPage() {
  const [recensement, setRecensement] =
    useState<ClientRecensement | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecensement = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getClientRecensement();

      setRecensement(data);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des recensements :",
        err,
      );

      setRecensement(null);

      setError(
        "Les informations de vos recensements ne sont pas disponibles.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecensement();
  }, [loadRecensement]);

  if (loading) {
    return <ClientRecensementLoading />;
  }

  if (error || !recensement) {
    return (
      <div className="space-y-6">
        <section className="border border-gray-200 bg-white px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Recensements
          </p>

          <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
            Recensements de l'établissement
          </h1>
        </section>

        <ClientRecensementError
          message={
            error ||
            "Aucun recensement n'est disponible."
          }
          onRetry={loadRecensement}
        />
      </div>
    );
  }

  const progression = Math.min(
    100,
    Math.max(0, recensement.progression || 0),
  );

  const sections = recensement.sections || [];

  const sectionsCompletes = sections.filter(
    (section) => section.statut === "complete",
  ).length;

  const sectionsTotal = sections.length;

  const progressionSections =
    sectionsTotal > 0
      ? Math.round(
          (sectionsCompletes / sectionsTotal) * 100,
        )
      : progression;

  const sectionsEnCours = sections.filter(
    (section) => section.statut === "en_cours",
  ).length;

  const sectionsACompleter = sections.filter(
    (section) => section.statut === "a_completer",
  ).length;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Recensements
            </p>

            <h1 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
              Recensements de l'établissement
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Suivez l'état de vos recensements et consultez
              votre historique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/recensement/historique"
              className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-[#123524]"
            >
              Historique
            </Link>

            <Link
              href="/recensement/formulaire"
              className="bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
              style={{ color: "#ffffff" }}
            >
              + Recenser
            </Link>
          </div>
        </div>
      </section>

      {/* Campagne actuelle */}
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Recensement actuel
            </p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              {recensement.campagne_nom ||
                "Campagne en cours"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Année scolaire :{" "}
              {recensement.annee_scolaire ||
                "Non renseignée"}
            </p>
          </div>

          <p
            className={`text-sm font-semibold ${getStatutClass(
              recensement.statut,
            )}`}
          >
            {getStatutLabel(recensement.statut)}
          </p>
        </div>
      </section>

      {/* Statistiques */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-gray-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Progression
            </p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {progression}%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Avancement global du recensement
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Sections complètes
            </p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {sectionsCompletes}
              {sectionsTotal > 0 &&
                ` / ${sectionsTotal}`}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {progressionSections}% des sections complétées
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Sections en cours
            </p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {sectionsEnCours}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Sections actuellement renseignées
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              À compléter
            </p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {sectionsACompleter}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Sections nécessitant encore des informations
            </p>
          </div>
        </div>
      </section>

      {/* Progression globale */}
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Progression du recensement
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {progression}% des informations attendues sont
              renseignées.
            </p>
          </div>

          <span className="text-sm font-semibold text-gray-900">
            {progression}%
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-[#123524] transition-all"
            style={{ width: `${progression}%` }}
          />
        </div>
      </section>

      {/* Dernière mise à jour */}
      <section className="border border-gray-200 bg-white px-5 py-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Dernière mise à jour
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {recensement.derniere_mise_a_jour ||
                "Aucune mise à jour enregistrée"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Date de soumission
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {recensement.date_soumission ||
                "Pas encore soumis"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}