"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getRecensements,
  normalizeRecensementsResponse,
} from "../../services/recensementService";

import RecensementsHeader from "./RecensementsHeader";
import RecensementsStats from "./RecensementsStats";
import RecensementsToolbar from "./RecensementsToolbar";
import RecensementsTable from "./RecensementsTable";
import RecensementsLoadingState from "./RecensementsLoadingState";
import RecensementsErrorState from "./RecensementsErrorState";
import RecensementsEmptyState from "./RecensementsEmptyState";

import type { Recensement } from "../../types";

export default function RecensementsPage() {
  const [recensements, setRecensements] = useState<
    Recensement[]
  >([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  async function loadRecensements() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getRecensements();

      const normalized =
        normalizeRecensementsResponse(
          response,
        );

      setRecensements(
        normalized.recensements,
      );
    } catch (err) {
      console.error(
        "Erreur lors du chargement des recensements :",
        err,
      );

      setRecensements([]);

      setError(
        "Les recensements ne sont pas disponibles depuis le serveur.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRecensements();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const filteredRecensements =
    useMemo(() => {
      const value = search
        .trim()
        .toLowerCase();

      if (!value) {
        return recensements;
      }

      return recensements.filter(
        (recensement) => {
          return (
            recensement.etablissement
              ?.toLowerCase()
              .includes(value) ||
            recensement.etablissement_nom
              ?.toLowerCase()
              .includes(value) ||
            recensement.campagne
              ?.toLowerCase()
              .includes(value) ||
            recensement.campagne_nom
              ?.toLowerCase()
              .includes(value) ||
            recensement.statut
              ?.toLowerCase()
              .includes(value)
          );
        },
      );
    }, [recensements, search]);

  const statistics =
    useMemo(() => {
      const total =
        recensements.length;

      const valides =
        recensements.filter(
          (item) => {
            const statut =
              item.statut
                ?.trim()
                .toLowerCase();

            return (
              statut === "validé" ||
              statut === "valide"
            );
          },
        ).length;

      const enCours =
        recensements.filter(
          (item) => {
            const statut =
              item.statut
                ?.trim()
                .toLowerCase();

            return statut === "en cours";
          },
        ).length;

      const aTraiter =
        recensements.filter(
          (item) => {
            const statut =
              item.statut
                ?.trim()
                .toLowerCase();

            return (
              statut === "à traiter" ||
              statut === "a traiter"
            );
          },
        ).length;

      return {
        total,
        valides,
        enCours,
        aTraiter,
      };
    }, [recensements]);

  return (
    <div className="space-y-6">
      <RecensementsHeader
        loading={loading}
        onRefresh={loadRecensements}
      />

      <RecensementsStats
        total={statistics.total}
        valides={statistics.valides}
        enCours={statistics.enCours}
        aTraiter={statistics.aTraiter}
        loading={loading}
      />

      <div className="overflow-hidden border border-gray-200 bg-white">
        <RecensementsToolbar
          search={search}
          onSearchChange={setSearch}
          loading={loading}
          onRefresh={loadRecensements}
        />

        {error && (
          <RecensementsErrorState
            message={error}
            onRetry={loadRecensements}
          />
        )}

        {!error && loading && (
          <RecensementsLoadingState />
        )}

        {!error &&
          !loading &&
          filteredRecensements.length ===
            0 && (
            <RecensementsEmptyState
              search={search}
            />
          )}

        {!error &&
          !loading &&
          filteredRecensements.length >
            0 && (
            <RecensementsTable
              recensements={
                filteredRecensements
              }
            />
          )}
      </div>
    </div>
  );
}