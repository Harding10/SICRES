"use client";

import type { Etablissement } from "../../types";

interface EtablissementViewProps {
  etablissement: Etablissement;
}

function displayValue(value?: string | number | null) {
  if (value === undefined || value === null || value === "") {
    return "Non renseigné";
  }

  return String(value);
}

function typeLabel(type?: string) {
  const labels: Record<string, string> = {
    prescolaire: "Préscolaire",
    primaire: "Primaire",
    college: "Collège",
    lycee: "Lycée",
    enseignement_technique: "Enseignement technique",
    enseignement_professionnel: "Enseignement professionnel",
    formation_insertion: "Formation / insertion",
    universite: "Université",
    grande_ecole: "Grande école",
  };

  return labels[type || ""] || type || "Non renseigné";
}

function secteurLabel(secteur?: string) {
  const labels: Record<string, string> = {
    public: "Public",
    prive: "Privé",
  };

  return labels[secteur || ""] || "Non renseigné";
}

function statutLabel(statut?: string) {
  const labels: Record<string, string> = {
    actif: "Actif",
    a_verifier: "À vérifier",
    inactif: "Inactif",
    ferme: "Fermé",
  };

  return labels[statut || ""] || "Non renseigné";
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
}

export default function EtablissementView({
  etablissement,
}: EtablissementViewProps) {
  const firstType =
    etablissement.types?.[0] || etablissement.type;

  return (
    <div className="space-y-5">
      {/* Identification */}
      <Section title="Identification de l'établissement">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InfoBlock
            label="Sigle"
            value={displayValue(etablissement.sigle)}
          />

          <InfoBlock
            label="Nom officiel"
            value={displayValue(etablissement.nom_officiel)}
          />

          <InfoBlock
            label="Nom usuel"
            value={displayValue(
              etablissement.nom_usuel || etablissement.nom,
            )}
          />
        </div>
      </Section>

      {/* Statut */}
      <Section title="Statut de l'établissement">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InfoBlock
            label="Type"
            value={typeLabel(firstType)}
          />

          <InfoBlock
            label="Secteur"
            value={secteurLabel(etablissement.secteur)}
          />

          <InfoBlock
            label="Statut"
            value={statutLabel(etablissement.statut)}
          />
        </div>

        {etablissement.types &&
          etablissement.types.length > 1 && (
            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Types déclarés
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {etablissement.types.map((type) => (
                  <span
                    key={type}
                    className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    {typeLabel(type)}
                  </span>
                ))}
              </div>
            </div>
          )}
      </Section>

      {/* Responsable et contacts */}
      <Section title="Responsable et contacts">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <InfoBlock
            label="Responsable"
            value={displayValue(etablissement.responsable)}
          />

          <InfoBlock
            label="Téléphone"
            value={displayValue(etablissement.telephone)}
          />

          <InfoBlock
            label="Email"
            value={displayValue(etablissement.email)}
          />

          <InfoBlock
            label="Adresse"
            value={displayValue(etablissement.adresse)}
          />
        </div>
      </Section>

      {/* Rattachement administratif */}
      <Section title="Rattachement administratif">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <InfoBlock
            label="DRENA"
            value={displayValue(etablissement.dren)}
          />

          <InfoBlock
            label="IEPP"
            value={displayValue(etablissement.iepp)}
          />

          <InfoBlock
            label="Sous-préfecture"
            value={displayValue(etablissement.sous_prefecture)}
          />

          <InfoBlock
            label="Localité"
            value={displayValue(etablissement.localite)}
          />
        </div>
      </Section>

      {/* Coordonnées géographiques */}
      <Section title="Coordonnées géographiques">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InfoBlock
            label="Latitude"
            value={displayValue(etablissement.latitude)}
          />

          <InfoBlock
            label="Longitude"
            value={displayValue(etablissement.longitude)}
          />

          <InfoBlock
            label="Précision GPS"
            value={
              etablissement.precision_gps !== undefined &&
              etablissement.precision_gps !== null
                ? `${etablissement.precision_gps} m`
                : "Non renseignée"
            }
          />
        </div>
      </Section>
    </div>
  );
}