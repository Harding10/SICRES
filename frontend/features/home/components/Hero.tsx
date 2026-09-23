import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[520px] w-full overflow-hidden bg-[#071f19]">
      {/* Image de fond */}
      <Image
src="/images/hero.png"
alt="Arrière-plan du recensement à Port-Bouët"
fill
priority
sizes="100vw"
className="absolute inset-0 h-full w-full object-cover object-center"
/>


      {/* Voile sombre */}
      <div className="absolute inset-0 bg-[#071f19]/70" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#e2a52d]">
            Commune de Port-Bouët
          </p>

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Recensement des établissements
            <span className="block text-[#e2a52d]">
              d'enseignement
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-lg">
            Le SICREE est la plateforme communale dédiée à la gestion et au
            suivi du recensement des établissements d'enseignement de
            Port-Bouët.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#d89b28] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#bd841f]"
            >
              Accéder à votre espace
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#a-propos"
              className="inline-flex items-center justify-center border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#124b3d] transition hover:bg-gray-100"
            >
              En savoir plus sur le SICREE
            </Link>
          </div>
        </div>
      </div>

      {/* Bandeau inférieur */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#071f19]/90">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-6">
          <div className="flex min-h-[50px] items-center">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/80 sm:text-sm">
              Système Communal de Recensement des Établissements d'Enseignement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}