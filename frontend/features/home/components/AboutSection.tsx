import Image from "next/image";
import { CheckCircle2, ShieldCheck, Users } from "lucide-react";

const principles = [
  {
    icon: CheckCircle2,
    title: "Organisation",
    description: "Des informations structurées et centralisées.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    description: "Un accès aux données réservé aux utilisateurs habilités.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Une meilleure coordination entre les acteurs concernés.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      className="scroll-mt-20 w-full bg-white py-24"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Texte */}
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#17634f]">
              À propos du SICREE
            </span>

            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight tracking-tight text-[#082a22] sm:text-4xl lg:text-5xl">
              Une plateforme au service de la commune
            </h2>

            <div className="mt-4 h-1.5 w-16 bg-[#d89b28]" />

            <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-gray-700 sm:text-lg">
              Le Système Communal de Recensement des Établissements
              d'Enseignement accompagne la commune de Port-Bouët dans la
              collecte, l'organisation et le suivi des informations relatives
              aux établissements d'enseignement.
            </p>

            <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-gray-700 sm:text-lg">
              Le SICREE contribue ainsi à disposer d'informations structurées
              pour faciliter le suivi administratif et la planification des
              actions communales.
            </p>

            <div className="mt-7">
              <div className="inline-flex items-center border-l-4 border-[#d89b28] bg-[#f5f8f6] px-5 py-4">
                <p className="text-base font-bold text-[#124b3d]">
                  Un outil numérique pour une gestion communale structurée.
                </p>
              </div>
            </div>
          </div>

          {/* Visuel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-[#f5f8f6] shadow-md">
              <Image
                src="/images/apropos.png"
                alt="Gestion des informations dans le SICREE"
                width={900}
                height={600}
                className="h-[320px] w-full object-cover sm:h-[380px]"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-[#082a22]/95 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d89b28]">
                  SICREE
                </p>

                <p className="mt-1 text-base font-bold text-white">
                  Recenser, organiser et suivre les établissements
                  d'enseignement.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 hidden h-16 w-16 border-b-4 border-l-4 border-[#d89b28] sm:block" />
          </div>
        </div>

        {/* Principes */}
        <div className="mt-16 border-y border-gray-200">
          <div className="grid md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className={`flex items-center gap-5 px-6 py-5 ${
                    index !== 0
                      ? "border-t border-gray-200 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#124b3d]/10">
                    <Icon
                      className="h-5 w-5 text-[#124b3d]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#082a22]">
                      {principle.title}
                    </h3>

                    <p className="mt-1 text-sm font-medium leading-relaxed text-gray-600">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}