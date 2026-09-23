import {
  BarChart3,
  CheckCircle2,
  Database,
  TrendingUp,
} from "lucide-react";

const indicators = [
  {
    icon: Database,
    value: "Données",
    title: "Centralisées",
    description:
      "Les informations du recensement sont regroupées dans un environnement unique.",
  },
  {
    icon: CheckCircle2,
    value: "Suivi",
    title: "Des validations",
    description:
      "L'administration suit l'état d'avancement du traitement des données.",
  },
  {
    icon: BarChart3,
    value: "Analyse",
    title: "Statistique",
    description:
      "Les données validées peuvent produire des indicateurs de suivi.",
  },
  {
    icon: TrendingUp,
    value: "Aide",
    title: "À la décision",
    description:
      "Les statistiques facilitent le suivi et la planification communale.",
  },
];

export default function StatisticsSection() {
  return (
    <section
      id="statistiques"
      className="scroll-mt-20 w-full bg-[#f5f8f6] py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* En-tête centré */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d89b28]">
            Statistiques
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#082a22] sm:text-4xl lg:text-5xl">
            Un suivi statistique pour la commune
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 bg-[#d89b28]" />

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-gray-600 sm:text-lg">
            Les statistiques du SICREE permettent à l'administration de
            disposer d'une vision synthétique de l'état du recensement.
          </p>
        </div>

        {/* Widgets statistiques */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;

            return (
              <article
                key={indicator.title}
                className="flex min-h-[270px] flex-col items-center border border-gray-200 bg-white px-6 py-8 text-center transition-colors duration-200 hover:border-[#124b3d]/40"
              >
                {/* Icône centrée */}
                <div className="flex h-16 w-16 items-center justify-center border-2 border-[#124b3d] bg-[#f5f8f6]">
                  <Icon
                    className="h-7 w-7 text-[#124b3d]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Catégorie */}
                <span className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#d89b28]">
                  {indicator.value}
                </span>

                {/* Titre */}
                <h3 className="mt-2 text-xl font-black text-[#082a22]">
                  {indicator.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                  {indicator.description}
                </p>

                {/* Ligne décorative */}
                <div className="mt-auto pt-6">
                  <div className="mx-auto h-1 w-10 bg-[#d89b28]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}