"use client";

import { useState } from "react";

import InformationsScolairesForm from "./sections/InformationsScolairesForm";
import EffectifsForm from "./sections/EffectifsForm";
import PersonnelForm from "./sections/PersonnelForm";
import ClassesForm from "./sections/ClassesForm";
import InfrastructuresForm from "./sections/InfrastructuresForm";
import EquipementsForm from "./sections/EquipementsForm";
import InformationsPriveForm from "./sections/InformationsPriveForm";

interface ClientRecensementFormProps {
  isPrive?: boolean;
}

const sections = [
  {
    id: "informations-scolaires",
    label: "Informations scolaires",
  },
  {
    id: "effectifs",
    label: "Effectifs",
  },
  {
    id: "personnel",
    label: "Personnel",
  },
  {
    id: "classes",
    label: "Classes et niveaux",
  },
  {
    id: "infrastructures",
    label: "Infrastructures",
  },
  {
    id: "equipements",
    label: "Équipements",
  },
  {
    id: "informations-prive",
    label: "Informations spécifiques au privé",
  },
];

export default function ClientRecensementForm({
  isPrive = false,
}: ClientRecensementFormProps) {
  const [activeSection, setActiveSection] = useState(
    sections[0].id,
  );

  const currentIndex = sections.findIndex(
    (section) => section.id === activeSection,
  );

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(
        sections[currentIndex + 1].id,
      );
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(
        sections[currentIndex - 1].id,
      );
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "informations-scolaires":
        return <InformationsScolairesForm />;

      case "effectifs":
        return <EffectifsForm />;

      case "personnel":
        return <PersonnelForm />;

      case "classes":
        return <ClassesForm />;

      case "infrastructures":
        return <InfrastructuresForm />;

      case "equipements":
        return <EquipementsForm />;

      case "informations-prive":
        return isPrive ? (
          <InformationsPriveForm />
        ) : (
          <div className="border border-gray-200 bg-white px-5 py-6">
            <p className="text-sm text-gray-500">
              Cette section concerne uniquement les
              établissements privés.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 bg-white">
      {/* Navigation des sections */}
      <div className="border-b border-gray-200 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Formulaire de recensement
        </p>

        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          Informations de l'établissement
        </h2>

        <div className="mt-5 overflow-x-auto">
          <div className="flex min-w-max border-b border-gray-200">
            {sections.map((section, index) => {
              const isActive =
                section.id === activeSection;

              const isPrivateSection =
                section.id === "informations-prive";

              if (isPrivateSection && !isPrive) {
                return null;
              }

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border-[#123524] text-[#123524]"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <span className="mr-2 text-xs text-gray-400">
                    {index + 1}.
                  </span>

                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section active */}
      <div className="p-5">
        {renderSection()}
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Précédent
        </button>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Enregistrer le brouillon
          </button>

          {currentIndex <
          sections.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
              style={{ color: "#ffffff" }}
            >
              Enregistrer et continuer
            </button>
          ) : (
            <button
              type="button"
              className="bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
              style={{ color: "#ffffff" }}
            >
              Soumettre le recensement
            </button>
          )}
        </div>
      </div>
    </div>
  );
}