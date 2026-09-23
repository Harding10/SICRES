"use client";

import { useEffect, useState } from "react";

import {
  getClientDashboard,
} from "../../services/clientDashboardService";

import type {
  ClientDashboardData,
} from "../../services/clientDashboardService";

import ClientDashboardHeader from "./ClientDashboardHeader";
import ClientAccountCard from "./ClientAccountCard";
import ClientQuickActions from "./ClientQuickActions";
import ClientRecensementStatus from "./ClientRecensementStatus";
import ClientDashboardLoading from "./ClientDashboardLoading";
import ClientDashboardError from "./ClientDashboardError";

export default function ClientDashboard() {
  const [dashboard, setDashboard] =
    useState<ClientDashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);

      const data = await getClientDashboard();

      setDashboard(data);
    } catch (err) {
      console.error(
        "Erreur lors du chargement du dashboard établissement :",
        err,
      );

      setDashboard(null);

      setError(
        "Les informations de votre établissement ne sont pas disponibles depuis le serveur.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchDashboard();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <ClientDashboardLoading />;
  }

  if (error || !dashboard) {
    return (
      <ClientDashboardError
        message={
          error ||
          "Impossible de charger votre espace établissement."
        }
        onRetry={fetchDashboard}
      />
    );
  }

  const establishment =
    dashboard.etablissement;

  const recensement =
    dashboard.recensement;

  return (
    <div className="space-y-6">
      <ClientDashboardHeader
        establishmentName={
          establishment?.nom ||
          "Votre établissement"
        }
        onRefresh={fetchDashboard}
      />

      <ClientAccountCard
        establishment={establishment}
      />

      <ClientQuickActions />

      <ClientRecensementStatus
        recensement={recensement}
      />
    </div>
  );
}