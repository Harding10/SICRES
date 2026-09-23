"use client";

import {
  X,
} from "lucide-react";

import type {
  Etablissement,
  NiveauEtablissement,
  TypeEtablissement,
} from "../../types";

interface EtablissementViewModalProps {
  etablissement: Etablissement;
  onClose: () => void;
}

const TYPE_LABELS: Record<TypeEtablissement, string> = {
  prescolaire: "Préscolaire",
  primaire: "Primaire",
  college: "Collège",
  lycee: "Lycée",
  enseignement_technique: "Enseignement technique",
  enseignement_professionnel:
    "Enseignement professionnel",
  formation_insertion:
    "Formation / insertion professionnelle",
  universite: "Université",
  grande_ecole: "Grande école",
};

const NIVEAU_LABELS: Record<
  NiveauEtablissement,
  string
> = {
  petite_section: "Petite section",
  moyenne_section: "Moyenne section",
  grande_section: "Grande section",

  cp1: "CP1",
  cp2: "CP2",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  cm2: "CM2",

  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",

  "2nde": "2nde",
  "1ere": "1ère",
  terminale: "Terminale",

  licence: "Licence",
  master: "Master",
  doctorat: "Doctorat",

  bts: "BTS",
  bachelor: "Bachelor / Licence professionnelle",
  ingenieur: "Ingénieur",
  autre_formation: "Autre formation / diplôme",
};

function getTypeLabel(type: string): string {
  if (type in TYPE_LABELS) {
    return TYPE_LABELS[type as TypeEtablissement];
  }

  return type;
}

function getNiveauLabel(
  niveau: NiveauEtablissement,
): string {
  return NIVEAU_LABELS[niveau] || niveau;
}

function formatStatut(statut?: string): string {
  switch (statut) {
    case "actif":
      return "Actif";

    case "a_verifier":
      return "À vérifier";

    case "inactif":
      return "Inactif";

    case "ferme":
      return "Fermé";

    default:
      return statut || "Non renseigné";
  }
}

function formatSector(
  secteur?: "public" | "prive",
): string {
  if (secteur === "public") {
    return "Public";
  }

  if (secteur === "prive") {
    return "Privé";
  }

  return "Non renseigné";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? value
          : "Non renseigné"}
      </p>
    </div>
  );
}

function TagList({
  values,
}: {
  values: string[];
}) {
  if (values.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Aucun élément renseigné
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span
          key={value}
          className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700"
        >
          {value}
        </span>
      ))}
    </div>
  );
}

export default function EtablissementViewModal({
  etablissement,
  onClose,
}: EtablissementViewModalProps) {
  const displayName =
    etablissement.nom_officiel ||
    etablissement.nom_usuel ||
    etablissement.nom ||
    "Établissement";

  const types =
    etablissement.types?.length
      ? etablissement.types.map(getTypeLabel)
      : etablissement.type
        ? [getTypeLabel(etablissement.type)]
        : [];

  const niveaux =
    etablissement.niveaux?.map(getNiveauLabel) || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="mx-auto my-4 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Fiche établissement
            </p>

            <h1 className="mt-1 text-xl font-semibold text-gray-900">
              {displayName}
            </h1>

            {etablissement.sigle && (
              <p className="mt-1 text-sm font-medium text-gray-500">
                {etablissement.sigle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="space-y-8 px-6 py-7">
            <section>
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                Identification
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <InfoItem
                  label="Code établissement"
                  value={
                    etablissement.code_etablissement
                  }
                />

                <InfoItem
                  label="Sigle"
                  value={etablissement.sigle}
                />

                <InfoItem
                  label="Nom officiel"
                  value={
                    etablissement.nom_officiel ||
                    etablissement.nom
                  }
                />

                <InfoItem
                  label="Nom usuel"
                  value={etablissement.nom_usuel}
                />
              </div>
            </section>

            <section>
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                Classification
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Types d'établissement
                  </p>

                  <TagList values={types} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Niveaux / diplômes
                  </p>

                  <TagList values={niveaux} />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <InfoItem
                    label="Secteur"
                    value={formatSector(
                      etablissement.secteur,
                    )}
                  />

                  <InfoItem
                    label="Statut"
                    value={formatStatut(
                      etablissement.statut,
                    )}
                  />

                  <InfoItem
                    label="Responsable"
                    value={
                      etablissement.responsable
                    }
                  />
                </div>
              </div>
            </section>

            {(etablissement.domaines_formation_insertion
                ?.length ||
              etablissement
                .domaines_enseignement_professionnel
                ?.length) && (
              <section>
                <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                  Domaines de formation
                </h2>

                <div className="space-y-6">
                  {etablissement.domaines_formation_insertion
                    ?.length ? (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-800">
                        Formation / insertion professionnelle
                      </p>

                      <TagList
                        values={etablissement.domaines_formation_insertion.map(
                          (item) => {
                            const labels: Record<
                              string,
                              string
                            > = {
                              agriculture:
                                "Agriculture",
                              artisanat: "Artisanat",
                              batiment: "Bâtiment",
                              menuiserie:
                                "Menuiserie",
                              mecanique:
                                "Mécanique",
                              soudure: "Soudure",
                              electricite:
                                "Électricité",
                              plomberie:
                                "Plomberie",
                              couture: "Couture",
                              coiffure: "Coiffure",
                              esthetique:
                                "Esthétique",
                              cuisine: "Cuisine",
                              patisserie:
                                "Pâtisserie",
                              informatique:
                                "Informatique",
                              commerce: "Commerce",
                              hotellerie:
                                "Hôtellerie",
                              restauration:
                                "Restauration",
                              sport: "Sport",
                              football: "Football",
                              autre: "Autre",
                            };

                            return (
                              labels[item] || item
                            );
                          },
                        )}
                      />
                    </div>
                  ) : null}

                  {etablissement
                    .domaines_enseignement_professionnel
                    ?.length ? (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-800">
                        Enseignement professionnel
                      </p>

                      <TagList
                        values={etablissement.domaines_enseignement_professionnel.map(
                          (item) => {
                            const labels: Record<
                              string,
                              string
                            > = {
                              agriculture:
                                "Agriculture",
                              industrie: "Industrie",
                              batiment: "Bâtiment",
                              mecanique:
                                "Mécanique",
                              electricite:
                                "Électricité",
                              informatique:
                                "Informatique",
                              commerce: "Commerce",
                              gestion: "Gestion",
                              hotellerie:
                                "Hôtellerie",
                              restauration:
                                "Restauration",
                              sante: "Santé",
                              autre: "Autre",
                            };

                            return (
                              labels[item] || item
                            );
                          },
                        )}
                      />
                    </div>
                  ) : null}
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                Contacts
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem
                  label="Téléphone"
                  value={etablissement.telephone}
                />

                <InfoItem
                  label="E-mail"
                  value={etablissement.email}
                />

                <div className="md:col-span-2">
                  <InfoItem
                    label="Adresse"
                    value={etablissement.adresse}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                Rattachements
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem
                  label="DRENA"
                  value={etablissement.dren}
                />

                <InfoItem
                  label="IEPP"
                  value={etablissement.iepp}
                />

                <InfoItem
                  label="Rattachement technique"
                  value={
                    etablissement.rattachement_technique
                  }
                />

                <InfoItem
                  label="Rattachement professionnel"
                  value={
                    etablissement.rattachement_professionnel
                  }
                />

                <InfoItem
                  label="Rattachement formation / insertion"
                  value={
                    etablissement.rattachement_insertion
                  }
                />

                <InfoItem
                  label="Rattachement enseignement supérieur"
                  value={
                    etablissement.rattachement_superieur
                  }
                />
              </div>
            </section>

            <section>
              <h2 className="mb-5 border-b border-gray-200 pb-3 text-base font-semibold text-gray-900">
                Localisation
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem
                  label="Sous-préfecture"
                  value={
                    etablissement.sous_prefecture
                  }
                />

                <InfoItem
                  label="Localité / quartier"
                  value={etablissement.localite}
                />

                <div className="md:col-span-2">
                  <InfoItem
                    label="Adresse"
                    value={etablissement.adresse}
                  />
                </div>

                <InfoItem
                  label="Latitude"
                  value={etablissement.latitude}
                />

                <InfoItem
                  label="Longitude"
                  value={etablissement.longitude}
                />

                <InfoItem
                  label="Précision GPS"
                  value={
                    etablissement.precision_gps !==
                    undefined
                      ? `${etablissement.precision_gps} m`
                      : undefined
                  }
                />
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-gray-300 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}