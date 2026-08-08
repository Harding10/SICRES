"use client";

import { usePathname } from "next/navigation";

import {
  Search,
  Bell,
  User,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Tableau de bord",
    "/etablissements": "Établissements",
    "/recensements": "Recensements",
    "/statistiques": "Statistiques",
  };

  const title = pageTitles[pathname] || "SICREE";

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* PARTIE GAUCHE */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Système d'Information Communal de Recensement
        </p>
      </div>

      {/* PARTIE DROITE */}
      <div className="flex items-center gap-4">
        {/* RECHERCHE */}
        <div className="hidden items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 lg:flex">
          <Search
            size={18}
            strokeWidth={2}
            className="mr-2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Rechercher..."
            className="w-44 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <Bell
            size={20}
            strokeWidth={2}
          />

          {/* Badge notification */}
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* UTILISATEUR */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123524] text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">
              Administrateur
            </p>

            <p className="text-xs text-gray-500">
              Commune
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}