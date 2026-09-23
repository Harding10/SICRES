import {
  Building2,
  FileText,
  LockKeyhole,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Identifier",
    description:
      "Chaque établissement est identifié et intégré au répertoire communal.",
  },
  {
    icon: FileText,
    title: "Documenter",
    description:
      "Les informations utiles sont regroupées afin de constituer une fiche structurée.",
  },
  {
    icon: LockKeyhole,
    title: "Sécuriser",
    description:
      "Les données sont protégées et accessibles selon les droits accordés.",
  },
];

export default function EstablishmentsSection() {
  return (
    <section
      id="etablissements"
      className="scroll-mt-20 w-full bg-white py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* En-tête centré */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d89b28]">
            Établissements
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#082a22] sm:text-4xl lg:text-5xl">
            Gestion des établissements
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 bg-[#d89b28]" />

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-gray-600 sm:text-lg">
            Le SICREE centralise les informations relatives aux établissements
            d'enseignement recensés dans la commune et facilite leur suivi
            administratif.
          </p>
        </div>

        {/* Widgets */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="flex min-h-[280px] flex-col items-center border border-gray-200 bg-[#f8faf9] px-6 py-8 text-center transition-colors duration-200 hover:border-[#124b3d]/40 hover:bg-white"
              >
                {/* Icône centrée */}
                <div className="flex h-16 w-16 items-center justify-center border-2 border-[#124b3d] bg-white">
                  <Icon
                    className="h-7 w-7 text-[#124b3d]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Titre */}
                <h3 className="mt-6 text-xl font-black text-[#082a22]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-gray-600">
                  {feature.description}
                </p>

                {/* Ligne décorative */}
                <div className="mt-auto pt-6">
                  <div className="mx-auto h-1 w-10 bg-[#d89b28]" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Note institutionnelle */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-gray-200 pt-6 text-center sm:flex-row sm:gap-3">
          <LockKeyhole
            className="h-5 w-5 text-[#124b3d]"
            strokeWidth={1.8}
          />

          <p className="text-sm font-semibold text-gray-600">
            Les informations détaillées relatives aux établissements sont
            réservées aux utilisateurs autorisés.
          </p>
        </div>
      </div>
    </section>
  );
}