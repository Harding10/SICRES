"use client";

import { useEffect, useState } from "react";
import { Crosshair, Save, X } from "lucide-react";

import {
  updateClientEtablissement,
} from "../../services/etablissementService";

import type {
  Etablissement,
  EtablissementForm,
  TypeEtablissement,
  SecteurEtablissement,
} from "../../types";

interface ModifierEtablissementModalProps {
  etablissement: Etablissement;
  onClose: () => void;
  onSaved: (etablissement: Etablissement) => void;
}

function createForm(
  etablissement: Etablissement,
): EtablissementForm {
  return {
    code_etablissement:
      etablissement.code_etablissement || "",

    sigle:
      etablissement.sigle || "",

    nom_officiel:
      etablissement.nom_officiel || "",

    nom_usuel:
      etablissement.nom_usuel || "",

    nom:
      etablissement.nom || "",

    types:
      etablissement.types || [],

    secteur:
      etablissement.secteur || "",

    statut:
      etablissement.statut || "",

    responsable:
      etablissement.responsable || "",

    adresse:
      etablissement.adresse || "",

    telephone:
      etablissement.telephone || "",

    email:
      etablissement.email || "",

    dren:
      etablissement.dren || "",

    iepp:
      etablissement.iepp || "",

    rattachement_technique:
      etablissement.rattachement_technique || "",

    rattachement_professionnel:
      etablissement.rattachement_professionnel || "",

    rattachement_insertion:
      etablissement.rattachement_insertion || "",

    rattachement_superieur:
      etablissement.rattachement_superieur || "",

    sous_prefecture:
      etablissement.sous_prefecture || "",

    localite:
      etablissement.localite || "",

    latitude:
      etablissement.latitude !== undefined
        ? String(etablissement.latitude)
        : "",

    longitude:
      etablissement.longitude !== undefined
        ? String(etablissement.longitude)
        : "",

    precision_gps:
      etablissement.precision_gps !== undefined
        ? String(etablissement.precision_gps)
        : "",
  };
}

const typeOptions: {
  value: TypeEtablissement;
  label: string;
}[] = [
  {
    value: "prescolaire",
    label: "Préscolaire",
  },
  {
    value: "primaire",
    label: "Primaire",
  },
  {
    value: "college",
    label: "Collège",
  },
  {
    value: "lycee",
    label: "Lycée",
  },
  {
    value: "enseignement_technique",
    label: "Enseignement technique",
  },
  {
    value: "enseignement_professionnel",
    label: "Enseignement professionnel",
  },
  {
    value: "formation_insertion",
    label: "Formation / insertion",
  },
  {
    value: "universite",
    label: "Université",
  },
  {
    value: "grande_ecole",
    label: "Grande école",
  },
];

function Field({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full border border-gray-200 px-3 py-2.5 text-sm outline-none transition ${
          readOnly
            ? "cursor-not-allowed bg-gray-50 text-gray-500"
            : "bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#123524] focus:ring-1 focus:ring-[#123524]"
        }`}
      />
    </div>
  );
}

export default function ModifierEtablissementModal({
  etablissement,
  onClose,
  onSaved,
}: ModifierEtablissementModalProps) {
  const [form, setForm] = useState<EtablissementForm>(() =>
    createForm(etablissement),
  );

  const [saving, setSaving] = useState(false);
  const [capturingGps, setCapturingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(createForm(etablissement));
  }, [etablissement]);

  function updateField(
    field: keyof EtablissementForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleType(type: TypeEtablissement) {
    setForm((current) => {
      const exists = current.types.includes(type);

      return {
        ...current,
        types: exists
          ? current.types.filter((item) => item !== type)
          : [...current.types, type],
      };
    });
  }

  function captureGps() {
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError(
        "La géolocalisation n'est pas disponible sur cet appareil.",
      );
      return;
    }

    setCapturingGps(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        setForm((current) => ({
          ...current,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          precision_gps: accuracy.toString(),
        }));

        setCapturingGps(false);
      },
      (positionError) => {
        console.error(
          "Erreur lors de la capture GPS :",
          positionError,
        );

        let message =
          "Impossible de récupérer votre position.";

        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            message =
              "L'accès à la position a été refusé. Autorisez la géolocalisation dans votre navigateur.";
            break;

          case positionError.POSITION_UNAVAILABLE:
            message =
              "La position actuelle n'est pas disponible. Essayez dans un endroit mieux dégagé.";
            break;

          case positionError.TIMEOUT:
            message =
              "La récupération de la position a pris trop de temps. Réessayez.";
            break;
        }

        setGpsError(message);
        setCapturingGps(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const payload: Partial<Etablissement> = {
        code_etablissement:
          form.code_etablissement,

        sigle:
          form.sigle,

        nom_officiel:
          form.nom_officiel,

        nom_usuel:
          form.nom_usuel,

        nom:
          form.nom,

        types:
          form.types,

        secteur:
          form.secteur as SecteurEtablissement,

        responsable:
          form.responsable,

        adresse:
          form.adresse,

        telephone:
          form.telephone,

        email:
          form.email,

        sous_prefecture:
          form.sous_prefecture,

        localite:
          form.localite,

        latitude:
          form.latitude.trim() === ""
            ? undefined
            : Number(form.latitude),

        longitude:
          form.longitude.trim() === ""
            ? undefined
            : Number(form.longitude),

        precision_gps:
          form.precision_gps.trim() === ""
            ? undefined
            : Number(form.precision_gps),
      };

      const updated =
        await updateClientEtablissement(payload);

      onSaved(updated);
      onClose();
    } catch (err) {
      console.error(
        "Erreur lors de la modification de l'établissement :",
        err,
      );

      setError(
        "Impossible d'enregistrer les modifications. Veuillez réessayer.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving &&
          !capturingGps
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col border border-gray-200 bg-white">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Mon établissement
            </p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              Modifier les informations
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving || capturingGps}
            className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fermer"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 overflow-y-auto"
        >
          <div className="space-y-7 px-5 py-6">
            {/* Identification */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Identification
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Code établissement"
                  value={form.code_etablissement}
                  onChange={(value) =>
                    updateField(
                      "code_etablissement",
                      value,
                    )
                  }
                />

                <Field
                  label="Sigle"
                  value={form.sigle}
                  onChange={(value) =>
                    updateField("sigle", value)
                  }
                />

                <Field
                  label="Nom officiel"
                  value={form.nom_officiel}
                  onChange={(value) =>
                    updateField(
                      "nom_officiel",
                      value,
                    )
                  }
                />

                <Field
                  label="Nom usuel"
                  value={form.nom_usuel}
                  onChange={(value) =>
                    updateField(
                      "nom_usuel",
                      value,
                    )
                  }
                />
              </div>
            </section>

            {/* Type */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Type d'établissement
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Sélectionnez les types réellement proposés
                  par votre établissement.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {typeOptions.map((option) => {
                  const checked =
                    form.types.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3 border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleType(option.value)
                        }
                        className="h-4 w-4 accent-[#123524]"
                      />

                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Secteur */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Secteur
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Précisez le secteur auquel appartient
                  l'établissement.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  {
                    value: "public",
                    label: "Public",
                  },
                  {
                    value: "prive",
                    label: "Privé",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 border border-gray-200 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="secteur"
                      value={option.value}
                      checked={
                        form.secteur ===
                        option.value
                      }
                      onChange={() =>
                        updateField(
                          "secteur",
                          option.value,
                        )
                      }
                      className="h-4 w-4 accent-[#123524]"
                    />

                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Responsable et contacts */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Responsable et contacts
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Coordonnées actuelles de la personne
                  responsable de l'établissement.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Responsable"
                  value={form.responsable}
                  onChange={(value) =>
                    updateField(
                      "responsable",
                      value,
                    )
                  }
                />

                <Field
                  label="Téléphone"
                  value={form.telephone}
                  onChange={(value) =>
                    updateField(
                      "telephone",
                      value,
                    )
                  }
                />

                <Field
                  label="Email"
                  value={form.email}
                  onChange={(value) =>
                    updateField("email", value)
                  }
                  type="email"
                />

                <Field
                  label="Adresse"
                  value={form.adresse}
                  onChange={(value) =>
                    updateField("adresse", value)
                  }
                />
              </div>
            </section>

            {/* Localisation */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Localisation
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Localisation administrative de
                  l'établissement.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Sous-préfecture"
                  value={form.sous_prefecture}
                  onChange={(value) =>
                    updateField(
                      "sous_prefecture",
                      value,
                    )
                  }
                />

                <Field
                  label="Localité / quartier"
                  value={form.localite}
                  onChange={(value) =>
                    updateField(
                      "localite",
                      value,
                    )
                  }
                />
              </div>
            </section>

            {/* GPS */}
            <section>
              <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Coordonnées GPS
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  La capture GPS est recommandée à ciel
                  ouvert pour obtenir une position plus
                  précise.
                </p>
              </div>

              <button
                type="button"
                onClick={captureGps}
                disabled={
                  capturingGps ||
                  saving
                }
                className="inline-flex items-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white disabled:cursor-not-allowed disabled:opacity-60"
                style={{ color: "#ffffff" }}
              >
                <Crosshair
                  size={17}
                  strokeWidth={1.8}
                  className={
                    capturingGps
                      ? "animate-pulse"
                      : ""
                  }
                />

                {capturingGps
                  ? "Localisation en cours..."
                  : "Capturer ma position"}
              </button>

              {gpsError && (
                <div className="mt-3 border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                  {gpsError}
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field
                  label="Latitude"
                  value={form.latitude}
                  onChange={(value) =>
                    updateField(
                      "latitude",
                      value,
                    )
                  }
                  type="number"
                />

                <Field
                  label="Longitude"
                  value={form.longitude}
                  onChange={(value) =>
                    updateField(
                      "longitude",
                      value,
                    )
                  }
                  type="number"
                />

                <Field
                  label="Précision GPS (m)"
                  value={form.precision_gps}
                  onChange={(value) =>
                    updateField(
                      "precision_gps",
                      value,
                    )
                  }
                  type="number"
                />
              </div>
            </section>

            {/* Statut */}
            <section>
              <div className="border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Statut de l'établissement
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {etablissement.statut === "actif"
                    ? "Actif"
                    : etablissement.statut ===
                        "a_verifier"
                      ? "À vérifier"
                      : etablissement.statut ===
                          "inactif"
                        ? "Inactif"
                        : etablissement.statut ===
                            "ferme"
                          ? "Fermé"
                          : "Non renseigné"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Le statut est géré par
                  l'administration communale.
                </p>
              </div>
            </section>

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Pied du modal */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || capturingGps}
              className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving || capturingGps}
              className="inline-flex items-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b] hover:!text-white disabled:cursor-not-allowed disabled:opacity-60"
              style={{ color: "#ffffff" }}
            >
              <Save
                size={16}
                strokeWidth={1.8}
              />

              {saving
                ? "Enregistrement..."
                : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}