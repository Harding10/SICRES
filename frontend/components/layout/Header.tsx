"use client";

import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur">
      {/* PARTIE GAUCHE */}
      <div>
        <h2 className="text-lg font-bold text-[var(--color-gray-900)]">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          Système d'Information Communal de Recensement
        </p>
      </div>

      {/* PARTIE DROITE */}
      <div className="flex items-center gap-3">
        {/* RECHERCHE */}
        <div className="hidden h-10 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[#3b8c7d]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3b8c7d]/10 lg:flex">
          <Search
            size={17}
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
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#3b8c7d]/10 hover:text-[#3b8c7d]"
        >
          <Bell size={19} strokeWidth={2} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FFA800] ring-2 ring-white" />
        </button>

        {/* UTILISATEUR */}
        <div className="ml-1 flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b8c7d] text-sm font-bold text-white shadow-sm">
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[var(--color-gray-900)]">
              Administrateur
            </p>

            <p className="text-xs text-gray-500">
              Commune
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-gray-400 md:block"
          />
        </div>
      </div>
    </header>
  );
}