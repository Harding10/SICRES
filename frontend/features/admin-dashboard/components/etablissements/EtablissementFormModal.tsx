"use client";

import { useState, type FormEvent } from "react";
import { Crosshair, Loader2, X } from "lucide-react";

import type {
  DomaineEnseignementProfessionnel,
  DomaineFormationInsertion,
  EtablissementForm,
  NiveauEtablissement,
  TypeEtablissement,
} from "../../types";

interface EtablissementFormModalProps {
  mode: "add" | "edit";
  form: EtablissementForm;
  onChange: <K extends keyof EtablissementForm>(
    field: K,
    value: EtablissementForm[K]
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  submitting?: boolean;
}

const TYPES: {
  value: TypeEtablissement;
  label: string;
}[] = [
  { value: "prescolaire", label: "Préscolaire" },
  { value: "primaire", label: "Primaire" },
  { value: "college", label: "Collège" },
  { value: "lycee", label: "Lycée" },
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
    label: "Formation / insertion professionnelle",
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

const NIVEAUX: {
  value: NiveauEtablissement;
  label: string;
  types: TypeEtablissement[];
}[] = [
  {
    value: "petite_section",
    label: "Petite section",
    types: ["prescolaire"],
  },
  {
    value: "moyenne_section",
    label: "Moyenne section",
    types: ["prescolaire"],
  },
  {
    value: "grande_section",
    label: "Grande section",
    types: ["prescolaire"],
  },
  {
    value: "cp1",
    label: "CP1",
    types: ["primaire"],
  },
  {
    value: "cp2",
    label: "CP2",
    types: ["primaire"],
  },
  {
    value: "ce1",
    label: "CE1",
    types: ["primaire"],
  },
  {
    value: "ce2",
    label: "CE2",
    types: ["primaire"],
  },
  {
    value: "cm1",
    label: "CM1",
    types: ["primaire"],
  },
  {
    value: "cm2",
    label: "CM2",
    types: ["primaire"],
  },
  {
    value: "6e",
    label: "6e",
    types: ["college"],
  },
  {
    value: "5e",
    label: "5e",
    types: ["college"],
  },
  {
    value: "4e",
    label: "4e",
    types: ["college"],
  },
  {
    value: "3e",
    label: "3e",
    types: ["college"],
  },
  {
    value: "2nde",
    label: "2nde",
    types: ["lycee"],
  },
  {
    value: "1ere",
    label: "1ère",
    types: ["lycee"],
  },
  {
    value: "terminale",
    label: "Terminale",
    types: ["lycee"],
  },
  {
    value: "bts",
    label: "BTS",
    types: [
      "enseignement_technique",
      "enseignement_professionnel",
      "grande_ecole",
    ],
  },
  {
    value: "bachelor",
    label: "Bachelor / Licence",
    types: ["universite", "grande_ecole"],
  },
  {
    value: "licence",
    label: "Licence",
    types: ["universite", "grande_ecole"],
  },
  {
    value: "master",
    label: "Master",
    types: ["universite", "grande_ecole"],
  },
  {
    value: "doctorat",
    label: "Doctorat",
    types: ["universite"],
  },
  {
    value: "ingenieur",
    label: "Cycle ingénieur",
    types: ["grande_ecole"],
  },
  {
    value: "autre_formation",
    label: "Autre formation",
    types: [
      "enseignement_technique",
      "enseignement_professionnel",
      "formation_insertion",
      "grande_ecole",
    ],
  },
];

const INSERTION_DOMAINES: {
  value: DomaineFormationInsertion;
  label: string;
}[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "artisanat", label: "Artisanat" },
  { value: "batiment", label: "Bâtiment" },
  { value: "menuiserie", label: "Menuiserie" },
  { value: "mecanique", label: "Mécanique" },
  { value: "soudure", label: "Soudure" },
  { value: "electricite", label: "Électricité" },
  { value: "plomberie", label: "Plomberie" },
  { value: "couture", label: "Couture" },
  { value: "coiffure", label: "Coiffure" },
  { value: "esthetique", label: "Esthétique" },
  { value: "cuisine", label: "Cuisine" },
  { value: "patisserie", label: "Pâtisserie" },
  { value: "informatique", label: "Informatique" },
  { value: "commerce", label: "Commerce" },
  { value: "hotellerie", label: "Hôtellerie" },
  { value: "restauration", label: "Restauration" },
  { value: "sport", label: "Sport" },
  { value: "football", label: "Football" },
  { value: "autre", label: "Autre" },
];

const PROFESSIONNEL_DOMAINES: {
  value: DomaineEnseignementProfessionnel;
  label: string;
}[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "industrie", label: "Industrie" },
  { value: "batiment", label: "Bâtiment" },
  { value: "mecanique", label: "Mécanique" },
  { value: "electricite", label: "Électricité" },
  { value: "informatique", label: "Informatique" },
  { value: "commerce", label: "Commerce" },
  { value: "gestion", label: "Gestion" },
  { value: "hotellerie", label: "Hôtellerie" },
  { value: "restauration", label: "Restauration" },
  { value: "sante", label: "Santé" },
  { value: "autre", label: "Autre" },
];

const DRENA_OPTIONS = [
  "DRENA Bouaké 1",
  "DRENA Bouaké 2",
  "DRENA Bouaké 3",
];

const IEPP_OPTIONS = [
  "IEPP Bouaké Nord",
  "IEPP Bouaké Sud",
  "IEPP Bouaké Centre",
];

const STATUS_OPTIONS: {
  value: EtablissementForm["statut"];
  label: string;
}[] = [
  { value: "actif", label: "Actif" },
  { value: "a_verifier", label: "À vérifier" },
  { value: "inactif", label: "Inactif" },
  { value: "ferme", label: "Fermé" },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-gray-200 pb-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        {description ? (
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : ""
      }`}
    >
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer absolute inset-0 h-4 w-4 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />

        <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white transition peer-checked:border-blue-600 peer-checked:bg-blue-600">
          {checked ? (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-3 w-3 text-white"
              aria-hidden="true"
            >
              <path
                d="M4 10.5L8 14.5L16 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </span>

      <span className="text-xs text-gray-700">
        {label}
      </span>
    </label>
  );
}

function Radio({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="peer absolute inset-0 h-4 w-4 cursor-pointer opacity-0"
        />

        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white transition peer-checked:border-blue-600">
          {checked ? (
            <span className="h-2 w-2 rounded-full bg-blue-600" />
          ) : null}
        </span>
      </span>

      <span className="text-xs text-gray-700">
        {label}
      </span>
    </label>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-700">
        {label}
        {required ? (
          <span className="ml-1 text-red-500">
            *
          </span>
        ) : null}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
      />
    </label>
  );
}

export default function EtablissementFormModal({
  mode,
  form,
  onChange,
  onSubmit,
  onClose,
  submitting = false,
}: EtablissementFormModalProps) {
  const [gpsLoading, setGpsLoading] =
    useState(false);

  const [gpsError, setGpsError] =
    useState("");

  const hasPrescolaire =
    form.types.includes("prescolaire");

  const hasPrimaire =
    form.types.includes("primaire");

  const hasCollege =
    form.types.includes("college");

  const hasLycee =
    form.types.includes("lycee");

  const hasTechnique =
    form.types.includes(
      "enseignement_technique"
    );

  const hasProfessionnel =
    form.types.includes(
      "enseignement_professionnel"
    );

  const hasInsertion =
    form.types.includes(
      "formation_insertion"
    );

  const hasUniversite =
    form.types.includes("universite");

  const hasGrandeEcole =
    form.types.includes("grande_ecole");

  const showDrena =
    hasPrescolaire ||
    hasPrimaire ||
    hasCollege ||
    hasLycee;

  const showIepp =
    hasPrescolaire ||
    hasPrimaire;

  const availableNiveaux =
    NIVEAUX.filter((niveau) =>
      niveau.types.some((type) =>
        form.types.includes(type)
      )
    );

  const toggleType = (
    type: TypeEtablissement
  ) => {
    const exists =
      form.types.includes(type);

    const nextTypes = exists
      ? form.types.filter(
          (item) => item !== type
        )
      : [...form.types, type];

    onChange("types", nextTypes);

    if (exists) {
      const allowedLevels =
        NIVEAUX.filter((niveau) =>
          niveau.types.some((niveauType) =>
            nextTypes.includes(niveauType)
          )
        ).map(
          (niveau) => niveau.value
        );

      onChange(
        "niveaux",
        form.niveaux.filter((niveau) =>
          allowedLevels.includes(niveau)
        )
      );
    }
  };

  const toggleNiveau = (
    niveau: NiveauEtablissement
  ) => {
    const exists =
      form.niveaux.includes(niveau);

    onChange(
      "niveaux",
      exists
        ? form.niveaux.filter(
            (item) => item !== niveau
          )
        : [
            ...form.niveaux,
            niveau,
          ]
    );
  };

  const toggleInsertionDomaine = (
    domaine: DomaineFormationInsertion
  ) => {
    const exists =
      form.domaines_formation_insertion.includes(
        domaine
      );

    onChange(
      "domaines_formation_insertion",
      exists
        ? form.domaines_formation_insertion.filter(
            (item) => item !== domaine
          )
        : [
            ...form.domaines_formation_insertion,
            domaine,
          ]
    );
  };

  const toggleProfessionnelDomaine = (
    domaine: DomaineEnseignementProfessionnel
  ) => {
    const exists =
      form.domaines_enseignement_professionnel.includes(
        domaine
      );

    onChange(
      "domaines_enseignement_professionnel",
      exists
        ? form.domaines_enseignement_professionnel.filter(
            (item) => item !== domaine
          )
        : [
            ...form.domaines_enseignement_professionnel,
            domaine,
          ]
    );
  };

  const handleNomOfficielChange = (
    value: string
  ) => {
    onChange(
      "nom_officiel",
      value
    );

    onChange(
      "nom",
      value
    );
  };

  const captureGps = () => {
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError(
        "La géolocalisation n'est pas disponible sur cet appareil."
      );

      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange(
          "latitude",
          position.coords.latitude.toFixed(7)
        );

        onChange(
          "longitude",
          position.coords.longitude.toFixed(7)
        );

        onChange(
          "precision_gps",
          Math.round(
            position.coords.accuracy
          ).toString()
        );

        setGpsLoading(false);
      },
      (error) => {
        let message =
          "Impossible de récupérer votre position.";

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          message =
            "L'accès à la position a été refusé. Autorisez la géolocalisation dans votre navigateur.";
        } else if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          message =
            "Position indisponible. Essayez dans un espace dégagé ou à ciel ouvert.";
        } else if (
          error.code ===
          error.TIMEOUT
        ) {
          message =
            "La récupération de la position a pris trop de temps. Réessayez à ciel ouvert.";
        }

        setGpsError(message);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-2">
      <div className="mx-auto my-2 max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {mode === "add"
                ? "Ajouter un établissement"
                : "Modifier l'établissement"}
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Renseignez les informations de recensement de l'établissement.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="max-h-[calc(100vh-115px)] space-y-5 overflow-y-auto px-5 py-5">
            <Section
              title="Identification"
              description="Informations permettant d'identifier officiellement l'établissement."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Code établissement"
                  value={form.code_etablissement}
                  onChange={(value) =>
                    onChange(
                      "code_etablissement",
                      value
                    )
                  }
                  placeholder="Ex. ETB-2026-001"
                />

                <InputField
                  label="Sigle"
                  value={form.sigle}
                  onChange={(value) =>
                    onChange(
                      "sigle",
                      value
                    )
                  }
                  placeholder="Ex. EPS"
                />

                <InputField
                  label="Nom officiel"
                  value={form.nom_officiel}
                  onChange={
                    handleNomOfficielChange
                  }
                  placeholder="Nom officiel de l'établissement"
                  required
                />

                <InputField
                  label="Nom usuel"
                  value={form.nom_usuel}
                  onChange={(value) =>
                    onChange(
                      "nom_usuel",
                      value
                    )
                  }
                  placeholder="Nom couramment utilisé"
                />
              </div>
            </Section>

            <Section
              title="Type d'établissement"
              description="Un même établissement peut proposer plusieurs niveaux ou types d'enseignement."
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {TYPES.map((type) => (
                  <Checkbox
                    key={type.value}
                    checked={form.types.includes(
                      type.value
                    )}
                    onChange={() =>
                      toggleType(
                        type.value
                      )
                    }
                    label={type.label}
                  />
                ))}
              </div>
            </Section>

            {form.types.length > 0 ? (
              <Section
                title="Niveaux / cycles"
                description="Sélectionnez les niveaux réellement proposés par l'établissement."
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {availableNiveaux.map(
                    (niveau) => (
                      <Checkbox
                        key={niveau.value}
                        checked={form.niveaux.includes(
                          niveau.value
                        )}
                        onChange={() =>
                          toggleNiveau(
                            niveau.value
                          )
                        }
                        label={niveau.label}
                      />
                    )
                  )}
                </div>
              </Section>
            ) : null}

            <Section
              title="Secteur"
              description="Précisez le secteur auquel appartient l'établissement."
            >
              <div className="flex flex-wrap gap-5">
                <Radio
                  checked={
                    form.secteur ===
                    "public"
                  }
                  onChange={() =>
                    onChange(
                      "secteur",
                      "public"
                    )
                  }
                  label="Public"
                />

                <Radio
                  checked={
                    form.secteur ===
                    "prive"
                  }
                  onChange={() =>
                    onChange(
                      "secteur",
                      "prive"
                    )
                  }
                  label="Privé"
                />
              </div>
            </Section>

            <Section
              title="Statut"
              description="Situation actuelle de l'établissement au moment du recensement."
            >
              <div className="flex flex-wrap gap-5">
                {STATUS_OPTIONS.map(
                  (status) => (
                    <Radio
                      key={status.value}
                      checked={
                        form.statut ===
                        status.value
                      }
                      onChange={() =>
                        onChange(
                          "statut",
                          status.value
                        )
                      }
                      label={
                        status.label
                      }
                    />
                  )
                )}
              </div>
            </Section>

            {hasInsertion ? (
              <Section
                title="Domaines de formation / insertion professionnelle"
                description="Métiers et activités pratiques proposés pour l'apprentissage ou l'insertion professionnelle."
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {INSERTION_DOMAINES.map(
                    (domaine) => (
                      <Checkbox
                        key={domaine.value}
                        checked={form.domaines_formation_insertion.includes(
                          domaine.value
                        )}
                        onChange={() =>
                          toggleInsertionDomaine(
                            domaine.value
                          )
                        }
                        label={
                          domaine.label
                        }
                      />
                    )
                  )}
                </div>
              </Section>
            ) : null}

            {hasProfessionnel ? (
              <Section
                title="Domaines d'enseignement professionnel"
                description="Secteurs correspondant aux formations professionnelles dispensées par l'établissement."
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {PROFESSIONNEL_DOMAINES.map(
                    (domaine) => (
                      <Checkbox
                        key={domaine.value}
                        checked={form.domaines_enseignement_professionnel.includes(
                          domaine.value
                        )}
                        onChange={() =>
                          toggleProfessionnelDomaine(
                            domaine.value
                          )
                        }
                        label={
                          domaine.label
                        }
                      />
                    )
                  )}
                </div>
              </Section>
            ) : null}

            {hasUniversite ||
            hasGrandeEcole ? (
              <Section
                title="Enseignement supérieur"
                description="Les niveaux supérieurs sont sélectionnés dans la section « Niveaux / cycles »."
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {hasUniversite ? (
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <p className="mb-2 text-xs font-semibold text-gray-800">
                        Université
                      </p>

                      <div className="space-y-2">
                        <Checkbox
                          checked={form.niveaux.includes(
                            "licence"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "licence"
                            )
                          }
                          label="Licence"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "master"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "master"
                            )
                          }
                          label="Master"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "doctorat"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "doctorat"
                            )
                          }
                          label="Doctorat"
                        />
                      </div>
                    </div>
                  ) : null}

                  {hasGrandeEcole ? (
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <p className="mb-2 text-xs font-semibold text-gray-800">
                        Grande école
                      </p>

                      <div className="space-y-2">
                        <Checkbox
                          checked={form.niveaux.includes(
                            "bts"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "bts"
                            )
                          }
                          label="BTS"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "bachelor"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "bachelor"
                            )
                          }
                          label="Bachelor / Licence"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "master"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "master"
                            )
                          }
                          label="Master"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "ingenieur"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "ingenieur"
                            )
                          }
                          label="Cycle ingénieur"
                        />

                        <Checkbox
                          checked={form.niveaux.includes(
                            "autre_formation"
                          )}
                          onChange={() =>
                            toggleNiveau(
                              "autre_formation"
                            )
                          }
                          label="Autre formation"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </Section>
            ) : null}

            <Section
              title="Responsable et contacts"
              description="Coordonnées de la personne responsable de l'établissement."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Responsable"
                  value={form.responsable}
                  onChange={(value) =>
                    onChange(
                      "responsable",
                      value
                    )
                  }
                  placeholder="Nom et prénom du responsable"
                />

                <InputField
                  label="Téléphone"
                  value={form.telephone}
                  onChange={(value) =>
                    onChange(
                      "telephone",
                      value
                    )
                  }
                  placeholder="Ex. 07 00 00 00 00"
                  type="tel"
                />

                <InputField
                  label="Email"
                  value={form.email}
                  onChange={(value) =>
                    onChange(
                      "email",
                      value
                    )
                  }
                  placeholder="exemple@etablissement.ci"
                  type="email"
                />

                <InputField
                  label="Adresse"
                  value={form.adresse}
                  onChange={(value) =>
                    onChange(
                      "adresse",
                      value
                    )
                  }
                  placeholder="Adresse physique"
                />
              </div>
            </Section>

            {showDrena ? (
              <Section
                title="Rattachement administratif"
                description="Rattachements utilisés pour les établissements relevant du préscolaire, primaire et secondaire."
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-gray-700">
                      DRENA
                    </span>

                    <select
                      value={form.dren}
                      onChange={(event) =>
                        onChange(
                          "dren",
                          event.target.value
                        )
                      }
                      className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        Sélectionner une DRENA
                      </option>

                      {DRENA_OPTIONS.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {showIepp ? (
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-gray-700">
                        IEPP
                      </span>

                      <select
                        value={form.iepp}
                        onChange={(event) =>
                          onChange(
                            "iepp",
                            event.target.value
                          )
                        }
                        className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">
                          Sélectionner une IEPP
                        </option>

                        {IEPP_OPTIONS.map(
                          (option) => (
                            <option
                              key={option}
                              value={option}
                            >
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </label>
                  ) : null}
                </div>
              </Section>
            ) : null}

            {hasTechnique ||
            hasProfessionnel ||
            hasInsertion ||
            hasUniversite ||
            hasGrandeEcole ? (
              <Section
                title="Rattachement spécifique"
                description="Informations de rattachement propres aux autres types d'enseignement ou de formation."
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {hasTechnique ? (
                    <InputField
                      label="Rattachement enseignement technique"
                      value={
                        form.rattachement_technique
                      }
                      onChange={(value) =>
                        onChange(
                          "rattachement_technique",
                          value
                        )
                      }
                      placeholder="Structure de rattachement"
                    />
                  ) : null}

                  {hasProfessionnel ? (
                    <InputField
                      label="Rattachement enseignement professionnel"
                      value={
                        form.rattachement_professionnel
                      }
                      onChange={(value) =>
                        onChange(
                          "rattachement_professionnel",
                          value
                        )
                      }
                      placeholder="Structure de rattachement"
                    />
                  ) : null}

                  {hasInsertion ? (
                    <InputField
                      label="Rattachement formation / insertion"
                      value={
                        form.rattachement_insertion
                      }
                      onChange={(value) =>
                        onChange(
                          "rattachement_insertion",
                          value
                        )
                      }
                      placeholder="Structure de rattachement"
                    />
                  ) : null}

                  {hasUniversite ||
                  hasGrandeEcole ? (
                    <InputField
                      label="Rattachement enseignement supérieur"
                      value={
                        form.rattachement_superieur
                      }
                      onChange={(value) =>
                        onChange(
                          "rattachement_superieur",
                          value
                        )
                      }
                      placeholder="Université, ministère, tutelle..."
                    />
                  ) : null}
                </div>
              </Section>
            ) : null}

            <Section
              title="Localisation"
              description="Localisation géographique de l'établissement dans la commune."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Sous-préfecture"
                  value={
                    form.sous_prefecture
                  }
                  onChange={(value) =>
                    onChange(
                      "sous_prefecture",
                      value
                    )
                  }
                  placeholder="Sous-préfecture"
                />

                <InputField
                  label="Localité / quartier"
                  value={form.localite}
                  onChange={(value) =>
                    onChange(
                      "localite",
                      value
                    )
                  }
                  placeholder="Quartier, village ou localité"
                />
              </div>
            </Section>

            <Section
              title="Coordonnées GPS"
              description="La capture GPS est recommandée lors de la collecte sur le terrain, idéalement à ciel ouvert."
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={captureGps}
                    disabled={gpsLoading}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-[#123524] bg-[#123524] px-3 text-xs font-medium text-white transition hover:bg-[#0d291b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {gpsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Crosshair className="h-4 w-4" />
                    )}

                    {gpsLoading
                      ? "Localisation en cours..."
                      : "Capturer ma position"}
                  </button>

                  {form.latitude &&
                  form.longitude ? (
                    <span className="text-xs text-[#123524]">
                      Position GPS capturée
                    </span>
                  ) : null}
                </div>

                {gpsError ? (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
                    {gpsError}
                  </p>
                ) : null}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <InputField
                    label="Latitude"
                    value={form.latitude}
                    onChange={(value) =>
                      onChange(
                        "latitude",
                        value
                      )
                    }
                    placeholder="Ex. 7.69385"
                  />

                  <InputField
                    label="Longitude"
                    value={form.longitude}
                    onChange={(value) =>
                      onChange(
                        "longitude",
                        value
                      )
                    }
                    placeholder="Ex. -5.03031"
                  />

                  <InputField
                    label="Précision GPS (m)"
                    value={
                      form.precision_gps
                    }
                    onChange={(value) =>
                      onChange(
                        "precision_gps",
                        value
                      )
                    }
                    placeholder="Ex. 5"
                    type="number"
                  />
                </div>
              </div>
            </Section>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-9 rounded-md border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#123524] bg-[#123524] px-4 text-xs font-medium text-white transition hover:bg-[#0d291b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}

              {submitting
                ? "Enregistrement..."
                : mode === "add"
                  ? "Ajouter l'établissement"
                  : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}