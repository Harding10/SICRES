"use client";

import { useCallback, useEffect, useState } from "react";

import { getClientEtablissement } from "../../services/etablissementService";
import type { Etablissement } from "../../types";

import EtablissementHeader from "./EtablissementHeader";
import EtablissementView from "./EtablissementView";
import EtablissementLoadingState from "./EtablissementLoadingState";
import EtablissementErrorState from "./EtablissementErrorState";
import ModifierEtablissementModal from "./ModifierEtablissementModal";

export default function EtablissementPage() {
  const [etablissement, setEtablissement] =
    useState<Etablissement | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadEtablissement = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getClientEtablissement();

      setEtablissement(data);
    } catch (err) {
      console.error(
        "Erreur lors du chargement de l'établissement :",
        err,
      );

      setEtablissement(null);

      setError(
        "Les informations de votre établissement ne sont pas disponibles.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEtablissement();
  }, [loadEtablissement]);

  if (loading) {
    return <EtablissementLoadingState />;
  }

  if (error || !etablissement) {
    return (
      <div className="space-y-6">
        <EtablissementHeader />

        <EtablissementErrorState
          message={
            error ||
            "Aucune information d'établissement n'est disponible."
          }
          onRetry={loadEtablissement}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <EtablissementHeader
          establishmentName={
            etablissement.nom_officiel ||
            etablissement.nom_usuel ||
            etablissement.nom
          }
          onEdit={() => setShowEditModal(true)}
        />

        <EtablissementView
          etablissement={etablissement}
        />
      </div>

      {showEditModal && (
        <ModifierEtablissementModal
          etablissement={etablissement}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            setEtablissement(updated);
          }}
        />
      )}
    </>
  );
}