"use client";

import Link from "next/link";
import type { RecensementSection } from "../../types";

interface ClientRecensementSectionCardProps {
  section: RecensementSection;
}

function getStatusLabel(
  statut: RecensementSection["statut"],
) {
  switch (statut) {
    case "complete":
      return "Terminé";

    case "en_cours":
      return "En cours";

    default:
      return "À compléter";
  }
}

function getActionLabel(
  statut: RecensementSection["statut"],
) {
  switch (statut) {
    case "complete":
      return "Modifier";

    case "en_cours":
      return "Continuer";

    default:
      return "Commencer";
  }
}

function getSectionPath(id: string) {
  const paths: Record<string, string> = {
    "informations-scolaires":
      "/recensement/informations-scolaires",

    effectifs:
      "/recensement/effectifs",

    personnel:
      "/recensement/personnel",

    classes:
      "/recensement/classes",

    infrastructures:
      "/recensement/infrastructures",

    equipements:
      "/recensement/equipements",

    prive:
      "/recensement/informations-prive",

    "informations-prive":
      "/recensement/informations-prive",
  };

  return paths[id] || `/recensement/${id}`;
}

export default function ClientRecensementSectionCard({
  section,
}: ClientRecensementSectionCardProps) {
  const statusLabel = getStatusLabel(section.statut);

  const actionLabel = getActionLabel(section.statut);

  const sectionPath = getSectionPath(section.id);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {section.label}
            </h3>

            <span className="text-xs font-medium text-gray-500">
              {statusLabel}
            </span>
          </div>

          {section.description && (
            <p className="mt-1.5 text-sm text-gray-500">
              {section.description}
            </p>
          )}

          {section.progression !== undefined && (
            <div className="mt-3 max-w-md">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Progression
                </span>

                <span className="text-xs font-medium text-gray-600">
                  {section.progression}%
                </span>
              </div>

              <div className="h-1.5 w-full bg-gray-100">
                <div
                  className="h-1.5 bg-[#123524]"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        section.progression,
                      ),
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0">
          <Link
            href={sectionPath}
            className="inline-flex items-center bg-[#123524] px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#0d291b]"
            style={{ color: "#ffffff" }}
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}