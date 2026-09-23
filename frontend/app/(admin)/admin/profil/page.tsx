"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-500">
              <User size={19} strokeWidth={1.9} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Mon profil
              </h1>

              <p className="text-sm text-gray-500">
                Consultez les informations de votre compte administrateur.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin_dashboard"
          className="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#123524]/30 hover:bg-gray-50 hover:text-[#123524]"
        >
          <ArrowLeft size={16} />
          Retour au tableau de bord
        </Link>
      </div>

      {/* CONTENU */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* IDENTITÉ */}
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#123524] text-2xl font-semibold text-white">
              A
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Administrateur
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Administration communale
            </p>

            <div className="mt-4 inline-flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Compte actif
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-[#d89b28]"
              />

              <p className="text-xs leading-5 text-gray-500">
                Ce compte dispose des droits d'administration de la plateforme.
              </p>
            </div>
          </div>
        </div>

        {/* INFORMATIONS */}
        <div className="border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Informations du compte
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Informations relatives au compte administrateur.
            </p>
          </div>

          <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <User
                  size={18}
                  className="mt-0.5 shrink-0 text-gray-500"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Nom
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Administrateur
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-gray-500"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Adresse e-mail
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Compte administrateur
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <Building2
                  size={18}
                  className="mt-0.5 shrink-0 text-gray-500"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Structure
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Administration communale
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-gray-500"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Collectivité
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Commune
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400">
              Les informations personnelles affichées ici pourront être
              alimentées directement par le compte connecté lorsque
              l'intégration avec le backend sera disponible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}