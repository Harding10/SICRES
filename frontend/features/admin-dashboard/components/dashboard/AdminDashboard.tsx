"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Clock3,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  getDashboard,
  normalizeStatistiquesResponse,
  Statistiques,
} from "../../services/dashboardService";

const INITIAL_STATISTICS: Statistiques = {
  total_etablissements: 0,
  etablissements_publics: 0,
  etablissements_prives: 0,
  etablissements_a_verifier: 0,
  total_recensements: 0,
  recensements_valides: 0,
  recensements_en_cours: 0,
  recensements_a_traiter: 0,
  campagnes_actives: 0,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value);
}

export default function AdminDashboard() {
  const [statistics, setStatistics] =
    useState<Statistiques>(INITIAL_STATISTICS);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const response = await getDashboard();

      const normalized =
        normalizeStatistiquesResponse(response);

      setStatistics(normalized);
    } catch (err) {
      console.error("Erreur dashboard :", err);

      setError(
        "Impossible de charger les données du tableau de bord."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* =====================================================
       * EN-TÊTE
       * ===================================================== */}

      <section className="border border-[#123524] bg-[#123524] px-6 py-6 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/70">
              <BarChart3 size={15} />
              Administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tableau de bord
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Vue opérationnelle de la situation actuelle de la
              commune et des actions nécessitant votre attention.
            </p>

            {statistics.commune && (
              <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
                <Building2 size={14} />
                Commune : {statistics.commune}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => void loadDashboard()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#123524] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Actualiser
          </button>
        </div>
      </section>

      {/* =====================================================
       * ERREUR
       * ===================================================== */}

      {error && (
        <section className="border border-gray-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                <AlertCircle size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Données indisponibles
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="inline-flex items-center justify-center gap-2 bg-[#123524] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0d291b]"
            >
              <RefreshCw size={14} />
              Réessayer
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
       * CHARGEMENT
       * ===================================================== */}

      {loading && !error && (
        <section className="border border-gray-200 bg-white px-6 py-8">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <RefreshCw
              size={18}
              className="animate-spin"
            />
            Chargement des données...
          </div>
        </section>
      )}

      {/* =====================================================
       * CONTENU OPÉRATIONNEL
       * ===================================================== */}

      {!loading && !error && (
        <>
          {/* -------------------------------------------------
           * INDICATEURS DE PILOTAGE
           * ------------------------------------------------- */}

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Situation actuelle
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Principaux indicateurs nécessaires au suivi
                quotidien de la plateforme.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 xl:grid-cols-4">
              <div className="bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Établissements
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatNumber(
                    statistics.total_etablissements
                  )}
                </p>

                <a
                  href="/etablissements"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#123524] hover:underline"
                >
                  Consulter
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Recensements
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatNumber(
                    statistics.total_recensements
                  )}
                </p>

                <a
                  href="/recensements"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#123524] hover:underline"
                >
                  Consulter
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  À traiter
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatNumber(
                    statistics.recensements_a_traiter
                  )}
                </p>

                <a
                  href="/recensements"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#123524] hover:underline"
                >
                  Traiter
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Campagnes actives
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatNumber(
                    statistics.campagnes_actives
                  )}
                </p>

                <a
                  href="/campagnes"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#123524] hover:underline"
                >
                  Consulter
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------
           * ACTIONS REQUISES
           * ------------------------------------------------- */}

          <section className="border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Actions requises
                </h2>

                <p className="text-xs text-gray-500">
                  Éléments nécessitant votre attention.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              <a
                href="/recensements"
                className="group flex items-center justify-between border border-gray-200 bg-gray-50 px-4 py-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Clock3
                    size={17}
                    className="text-gray-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Recensements à traiter
                    </p>

                    <p className="text-xs text-gray-500">
                      Accéder aux recensements concernés.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatNumber(
                      statistics.recensements_a_traiter
                    )}
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-gray-400 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </a>

              <a
                href="/etablissements"
                className="group flex items-center justify-between border border-gray-200 bg-gray-50 px-4 py-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle
                    size={17}
                    className="text-gray-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Établissements à vérifier
                    </p>

                    <p className="text-xs text-gray-500">
                      Vérifier les établissements concernés.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatNumber(
                      statistics.etablissements_a_verifier
                    )}
                  </span>

                  <ArrowRight
                    size={15}
                    className="text-gray-400 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </a>
            </div>
          </section>

          {/* -------------------------------------------------
           * ÉTAT DES OPÉRATIONS
           * ------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                  <ClipboardCheck size={18} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Recensements en cours
                  </h2>

                  <p className="text-xs text-gray-500">
                    État opérationnel du recensement.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 border border-gray-200 divide-x divide-gray-200">
                <div className="p-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {formatNumber(
                      statistics.recensements_valides
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Validés
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {formatNumber(
                      statistics.recensements_en_cours
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    En cours
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {formatNumber(
                      statistics.recensements_a_traiter
                    )}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    À traiter
                  </p>
                </div>
              </div>

              <a
                href="/recensements"
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#123524] hover:underline"
              >
                Ouvrir les recensements
                <ArrowRight size={13} />
              </a>
            </section>

            <section className="border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                  <Megaphone size={18} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Campagnes
                  </h2>

                  <p className="text-xs text-gray-500">
                    Situation actuelle des campagnes.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-4xl font-bold text-gray-900">
                  {formatNumber(
                    statistics.campagnes_actives
                  )}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  campagne(s) active(s)
                </p>
              </div>

              <a
                href="/campagnes"
                className="mt-6 inline-flex items-center gap-2 border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Gérer les campagnes
                <ArrowRight size={15} />
              </a>
            </section>
          </div>

          {/* -------------------------------------------------
           * SYNTHÈSE OPÉRATIONNELLE
           * ------------------------------------------------- */}

          <section className="border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                <Activity size={18} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Synthèse opérationnelle
                </h2>

                <p className="text-xs text-gray-500">
                  Accès rapide aux principaux modules de gestion.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href="/etablissements"
                className="flex items-center justify-between border border-gray-200 px-4 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Building2
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="text-sm font-semibold text-gray-900">
                    Établissements
                  </span>
                </div>

                <ArrowRight
                  size={15}
                  className="text-gray-400"
                />
              </a>

              <a
                href="/recensements"
                className="flex items-center justify-between border border-gray-200 px-4 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <ClipboardCheck
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="text-sm font-semibold text-gray-900">
                    Recensements
                  </span>
                </div>

                <ArrowRight
                  size={15}
                  className="text-gray-400"
                />
              </a>

              <a
                href="/statistiques"
                className="flex items-center justify-between border border-gray-200 px-4 py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="text-sm font-semibold text-gray-900">
                    Analyse statistique
                  </span>
                </div>

                <ArrowRight
                  size={15}
                  className="text-gray-400"
                />
              </a>
            </div>
          </section>
        </>
      )}
    </div>
  );
}