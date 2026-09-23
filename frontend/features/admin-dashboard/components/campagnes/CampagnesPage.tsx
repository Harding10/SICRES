"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCampagnes,
  normalizeCampagnesResponse,
} from "../../services/campagneService";

import CampagnesHeader from "./CampagnesHeader";
import CampagnesStats from "./CampagnesStats";
import CampagnesToolbar from "./CampagnesToolbar";
import CampagnesTable from "./CampagnesTable";
import CampagnesLoadingState from "./CampagnesLoadingState";
import CampagnesErrorState from "./CampagnesErrorState";
import CampagnesEmptyState from "./CampagnesEmptyState";

import type { Campagne } from "../../types";

export default function CampagnesPage() {
  const [campagnes, setCampagnes] =
    useState<Campagne[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadCampagnes() {
    try {
      setLoading(true);
      setError(null);

      const response =
        await getCampagnes();

      const normalized =
        normalizeCampagnesResponse(
          response,
        );

      setCampagnes(
        normalized.campagnes,
      );
    } catch (err) {
      console.error(
        "Erreur lors du chargement des campagnes :",
        err,
      );

      setCampagnes([]);

      setError(
        "Les données des campagnes ne sont pas disponibles depuis le serveur.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void loadCampagnes();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================================
   * RECHERCHE
   * ========================================================= */

  const filteredCampagnes =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      if (!value) {
        return campagnes;
      }

      return campagnes.filter(
        (campagne) => {
          return (
            campagne.nom
              ?.toLowerCase()
              .includes(value) ||
            campagne.titre
              ?.toLowerCase()
              .includes(value) ||
            campagne.description
              ?.toLowerCase()
              .includes(value) ||
            campagne.statut
              ?.toLowerCase()
              .includes(value)
          );
        },
      );
    }, [campagnes, search]);

  /* =========================================================
   * STATISTIQUES
   * ========================================================= */

  const statistics =
    useMemo(() => {
      const total =
        campagnes.length;

      const actives =
        campagnes.filter(
          (campagne) => {
            const statut =
              campagne.statut
                ?.trim()
                .toLowerCase();

            return (
              statut === "active" ||
              statut === "actif" ||
              statut === "en cours"
            );
          },
        ).length;

      const planifiees =
        campagnes.filter(
          (campagne) => {
            const statut =
              campagne.statut
                ?.trim()
                .toLowerCase();

            return (
              statut === "planifiée" ||
              statut === "planifiee" ||
              statut === "planifié" ||
              statut === "planifie"
            );
          },
        ).length;

      const terminees =
        campagnes.filter(
          (campagne) => {
            const statut =
              campagne.statut
                ?.trim()
                .toLowerCase();

            return (
              statut === "terminée" ||
              statut === "terminee" ||
              statut === "terminé" ||
              statut === "termine"
            );
          },
        ).length;

      return {
        total,
        actives,
        planifiees,
        terminees,
      };
    }, [campagnes]);

  /* =========================================================
   * INTERFACE
   * ========================================================= */

  return (
    <div className="space-y-6">
      <CampagnesHeader
        loading={loading}
        onRefresh={loadCampagnes}
      />

      <CampagnesStats
        total={statistics.total}
        actives={statistics.actives}
        planifiees={
          statistics.planifiees
        }
        terminees={
          statistics.terminees
        }
        loading={loading}
      />

      <div className="overflow-hidden border border-gray-200 bg-white">
        <CampagnesToolbar
          search={search}
          onSearchChange={setSearch}
          loading={loading}
          onRefresh={loadCampagnes}
        />

        {error && (
          <CampagnesErrorState
            message={error}
            onRetry={loadCampagnes}
          />
        )}

        {!error && loading && (
          <CampagnesLoadingState />
        )}

        {!error &&
          !loading &&
          filteredCampagnes.length ===
            0 && (
            <CampagnesEmptyState
              search={search}
            />
          )}

        {!error &&
          !loading &&
          filteredCampagnes.length >
            0 && (
            <CampagnesTable
              campagnes={
                filteredCampagnes
              }
            />
          )}
      </div>
    </div>
  );
}