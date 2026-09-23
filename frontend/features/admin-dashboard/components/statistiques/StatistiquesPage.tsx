"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getStatistiques,
  normalizeStatistiquesResponse,
} from "../../services/statistiquesService";

import StatistiquesHeader from "./StatistiquesHeader";
import StatistiquesMainStats from "./StatistiquesMainStats";
import StatistiquesSecteurs from "./StatistiquesSecteurs";
import StatistiquesRecensements from "./StatistiquesRecensements";
import StatistiquesInformations from "./StatistiquesInformations";
import StatistiquesLoadingState from "./StatistiquesLoadingState";
import StatistiquesErrorState from "./StatistiquesErrorState";

import type { StatistiquesData } from "../../types";

export default function StatistiquesPage() {
  const [data, setData] =
    useState<StatistiquesData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadStatistiques() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getStatistiques();

      const normalized =
        normalizeStatistiquesResponse(
          response,
        );

      setData(normalized);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des statistiques :",
        err,
      );

      setData(null);

      setError(
        "Les données statistiques ne sont pas disponibles depuis le serveur.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void loadStatistiques();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <StatistiquesHeader
        commune={data?.commune}
        loading={loading}
        onRefresh={loadStatistiques}
      />

      {error && (
        <StatistiquesErrorState
          message={error}
          onRetry={loadStatistiques}
        />
      )}

      {!error &&
        loading &&
        !data && (
          <StatistiquesLoadingState />
        )}

      {!error && data && (
        <>
          <StatistiquesMainStats
            data={data}
          />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <StatistiquesSecteurs
              etablissementsPublics={
                data.etablissements_publics
              }
              etablissementsPrives={
                data.etablissements_prives
              }
            />

            <StatistiquesRecensements
              total={
                data.total_recensements
              }
              valides={
                data.recensements_valides
              }
              enCours={
                data.recensements_en_cours
              }
              aTraiter={
                data.recensements_a_traiter
              }
            />
          </div>

          <StatistiquesInformations
            etablissementsAVerifier={
              data.etablissements_a_verifier
            }
            campagnesActives={
              data.campagnes_actives
            }
            totalRecensements={
              data.total_recensements
            }
            recensementsValides={
              data.recensements_valides
            }
          />
        </>
      )}
    </div>
  );
}