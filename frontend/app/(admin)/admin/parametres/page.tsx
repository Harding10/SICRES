"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  Save,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-500">
              <Settings size={19} strokeWidth={1.9} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Paramètres
              </h1>

              <p className="text-sm text-gray-500">
                Configurez les préférences de votre espace administrateur.
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
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* PRÉFÉRENCES */}
        <div className="border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Préférences générales
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Gérez les préférences de votre espace d'administration.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {/* NOTIFICATIONS */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100">
                  <Bell
                    size={18}
                    className="text-gray-500"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Notifications
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Recevoir les notifications relatives aux activités
                    administratives.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setNotificationsEnabled((current) => !current)
                }
                aria-pressed={notificationsEnabled}
                aria-label={
                  notificationsEnabled
                    ? "Désactiver les notifications"
                    : "Activer les notifications"
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notificationsEnabled
                    ? "bg-[#123524]"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    notificationsEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* LANGUE */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100">
                  <Globe
                    size={18}
                    className="text-gray-500"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Langue
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Choisissez la langue de l'interface administrative.
                  </p>
                </div>
              </div>

              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="h-10 min-w-[150px] border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/10"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* MOT DE PASSE */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100">
                  <Lock
                    size={18}
                    className="text-gray-500"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Mot de passe
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Modifiez le mot de passe utilisé pour accéder à votre
                    compte administrateur.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#123524]/30 hover:bg-gray-50 hover:text-[#123524]"
              >
                Modifier
              </button>
            </div>
          </div>

          {/* ENREGISTRER */}
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
            {saved && (
              <p className="text-xs font-medium text-green-700">
                Préférences enregistrées localement.
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d291b]"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </div>

        {/* INFORMATIONS */}
        <div className="h-fit border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100">
              <Settings
                size={18}
                className="text-gray-500"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Espace administrateur
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Préférences de la plateforme
              </p>
            </div>
          </div>

          <div className="mt-5 border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs leading-5 text-gray-500">
              Ces paramètres contrôlent les préférences de l'interface
              administrative. Les préférences nécessitant une sauvegarde sur
              le serveur pourront être reliées au backend lors de
              l'intégration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}