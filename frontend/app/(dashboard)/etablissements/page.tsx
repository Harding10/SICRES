"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";

import SearchBar from "@/features/etablissements/components/SearchBar";
import EtablissementTable from "@/features/etablissements/components/EtablissementTable";
import EtablissementForm from "@/features/etablissements/components/EtablissementForm";

import { etablissements } from "@/features/etablissements/services/etablissementService";
import { Etablissement } from "@/features/etablissements/types";

export default function EtablissementsPage() {
  const [data, setData] = useState<Etablissement[]>(etablissements);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedEtablissement, setSelectedEtablissement] =
    useState<Etablissement | null>(null);

  /**
   * RECHERCHE
   */
  const filtered = data.filter((item) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    return (
      item.nom.toLowerCase().includes(searchValue) ||
      item.code.toLowerCase().includes(searchValue) ||
      item.type.toLowerCase().includes(searchValue) ||
      item.niveau.toLowerCase().includes(searchValue) ||
      item.directeur.toLowerCase().includes(searchValue) ||
      item.commune.toLowerCase().includes(searchValue) ||
      item.telephone.toLowerCase().includes(searchValue)
    );
  });

  /**
   * AJOUTER
   */
  const handleAdd = () => {
    setSelectedEtablissement(null);
    setShowForm(true);
  };

  /**
   * MODIFIER
   */
  const handleEdit = (etablissement: Etablissement) => {
    setSelectedEtablissement(etablissement);
    setShowForm(true);
  };

  /**
   * SUPPRIMER
   */
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet établissement ?"
    );

    if (!confirmed) {
      return;
    }

    setData((currentData) =>
      currentData.filter((item) => item.id !== id)
    );
  };

  /**
   * ENREGISTRER
   */
  const handleSave = (
    formData: Omit<Etablissement, "id">
  ) => {
    if (selectedEtablissement) {
      setData((currentData) =>
        currentData.map((item) =>
          item.id === selectedEtablissement.id
            ? {
                ...formData,
                id: selectedEtablissement.id,
              }
            : item
        )
      );
    } else {
      const newId =
        data.length > 0
          ? Math.max(...data.map((item) => item.id)) + 1
          : 1;

      setData((currentData) => [
        ...currentData,
        {
          ...formData,
          id: newId,
        },
      ]);
    }

    setShowForm(false);
    setSelectedEtablissement(null);
  };

  /**
   * FERMER LE FORMULAIRE
   */
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEtablissement(null);
  };

  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123524]/10 text-[#123524]">
              <Building2 size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Établissements
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Gestion des établissements recensés
              </p>
            </div>
          </div>
        </div>

        {/* BOUTON AJOUT */}
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#123524] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0d291b] focus:outline-none focus:ring-2 focus:ring-[#123524] focus:ring-offset-2"
        >
          <Plus size={18} />

          Ajouter un établissement
        </button>
      </div>

      {/* RECHERCHE */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* INFORMATIONS */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filtered.length} établissement
          {filtered.length > 1 ? "s" : ""} trouvé
          {filtered.length > 1 ? "s" : ""}
        </p>

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-sm font-medium text-[#123524] hover:underline"
          >
            Effacer la recherche
          </button>
        )}
      </div>

      {/* TABLEAU */}
      <EtablissementTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* FORMULAIRE */}
      {showForm && (
        <EtablissementForm
          initialData={selectedEtablissement}
          onSubmit={handleSave}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}