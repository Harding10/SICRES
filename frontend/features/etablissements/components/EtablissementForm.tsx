"use client";

import { FormEvent, useState } from "react";
import { X, Save } from "lucide-react";
import { Etablissement } from "../types";

interface Props {
  initialData?: Etablissement | null;
  onSubmit: (data: Omit<Etablissement, "id">) => void;
  onCancel: () => void;
}

export default function EtablissementForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    code: initialData?.code ?? "",
    nom: initialData?.nom ?? "",
    type: initialData?.type ?? "",
    niveau: initialData?.niveau ?? "",
    directeur: initialData?.directeur ?? "",
    commune: initialData?.commune ?? "",
    telephone: initialData?.telephone ?? "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.code ||
      !formData.nom ||
      !formData.type ||
      !formData.niveau ||
      !formData.directeur ||
      !formData.commune ||
      !formData.telephone
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* EN-TÊTE */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData
                ? "Modifier un établissement"
                : "Ajouter un établissement"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {initialData
                ? "Modifiez les informations de l'établissement."
                : "Renseignez les informations du nouvel établissement."}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            title="Fermer"
            aria-label="Fermer"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENU */}
        <div className="p-6">
          {/* ERREUR */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* FORMULAIRE */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* CODE */}
              <div>
                <label
                  htmlFor="code"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Code
                </label>

                <input
                  id="code"
                  name="code"
                  type="text"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Ex : ETB003"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                />
              </div>

              {/* NOM */}
              <div>
                <label
                  htmlFor="nom"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nom de l'établissement
                </label>

                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex : École Primaire..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                />
              </div>

              {/* TYPE */}
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Public">Public</option>
                  <option value="Privé">Privé</option>
                </select>
              </div>

              {/* NIVEAU */}
              <div>
                <label
                  htmlFor="niveau"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Niveau
                </label>

                <select
                  id="niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Préscolaire">Préscolaire</option>
                  <option value="Primaire">Primaire</option>
                  <option value="Secondaire">Secondaire</option>
                  <option value="Supérieur">Supérieur</option>
                  <option value="Formation professionnelle">
                    Formation professionnelle
                  </option>
                </select>
              </div>

              {/* DIRECTEUR */}
              <div>
                <label
                  htmlFor="directeur"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Directeur / Directrice
                </label>

                <input
                  id="directeur"
                  name="directeur"
                  type="text"
                  value={formData.directeur}
                  onChange={handleChange}
                  placeholder="Nom du responsable"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                />
              </div>

              {/* COMMUNE */}
              <div>
                <label
                  htmlFor="commune"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Commune
                </label>

                <input
                  id="commune"
                  name="commune"
                  type="text"
                  value={formData.commune}
                  onChange={handleChange}
                  placeholder="Ex : Port-Bouët"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                />
              </div>

              {/* TELEPHONE */}
              <div className="md:col-span-2">
                <label
                  htmlFor="telephone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Téléphone
                </label>

                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Ex : 0700000000"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/20"
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#123524] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0d281b]"
              >
                <Save size={17} />

                {initialData
                  ? "Enregistrer les modifications"
                  : "Ajouter l'établissement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}