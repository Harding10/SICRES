import {
  ClipboardList,
  FileCheck2,
  SearchCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Collecte",
    description:
      "Les informations relatives aux établissements sont renseignées à partir des données recueillies sur le terrain.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Contrôle",
    description:
      "Les informations saisies sont vérifiées afin d'assurer leur cohérence et leur fiabilité.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Validation",
    description:
      "Les données contrôlées sont examinées et validées par les utilisateurs habilités.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Suivi",
    description:
      "La commune dispose d'un suivi structuré de l'état d'avancement du recensement.",
  },
];

export default function RecensementSection() {
  return (
    <section
      id="recensement"
      className="scroll-mt-20 w-full bg-[#f5f8f6] pb-16 pt-14 sm:pb-20 sm:pt-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* En-tête */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#17634f]">
            Processus de recensement
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#082a22] sm:text-4xl lg:text-5xl">
            Un recensement organisé en quatre étapes
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 bg-[#d89b28]" />

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
            Le SICREE structure le processus de recensement afin de faciliter
            la collecte, le contrôle, la validation et le suivi des
            informations relatives aux établissements d'enseignement.
          </p>
        </div>

        {/* Parcours */}
        <div className="relative mt-9">
          {/* Ligne centrale desktop */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[41px] hidden h-px bg-[#d89b28] lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Icône */}
                  <div className="relative z-10 flex h-[82px] w-[82px] items-center justify-center border-2 border-[#d89b28] bg-[#f5f8f6]">
                    <div className="flex h-[62px] w-[62px] items-center justify-center bg-[#124b3d]">
                      <Icon
                        className="h-7 w-7 text-white"
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  <span className="mt-4 text-xs font-black tracking-[0.18em] text-[#d89b28]">
                    ÉTAPE {step.number}
                  </span>

                  <h3 className="mt-1.5 text-xl font-black text-[#082a22]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 max-w-xs text-sm font-medium leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bandeau inférieur */}
        <div className="mt-10 border-y border-[#124b3d]/20 bg-white">
          <div className="flex flex-col gap-4 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-[#124b3d]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4 4L19 7" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#17634f]">
                  Une démarche structurée
                </p>

                <p className="mt-1 text-base font-bold text-[#082a22] sm:text-lg">
                  Des informations organisées pour faciliter le suivi
                  administratif communal.
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-gray-200 lg:block" />

            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#124b3d] sm:gap-3">
              <span>Collecter</span>

              <ArrowRight className="h-4 w-4 text-[#d89b28]" />

              <span>Contrôler</span>

              <ArrowRight className="h-4 w-4 text-[#d89b28]" />

              <span>Valider</span>

              <ArrowRight className="h-4 w-4 text-[#d89b28]" />

              <span>Suivre</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
