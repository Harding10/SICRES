"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Établissements",
      href: "/etablissements",
      icon: Building2,
    },
    {
      label: "Recensements",
      href: "/recensements",
      icon: ClipboardList,
    },
    {
      label: "Statistiques",
      href: "/statistiques",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#123524] text-white">
      {/* LOGO */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        {/* Image du logo */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white">
          <img
            src="/images/logo.png"
            alt="Logo SICREE"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Texte */}
        <div>
          <h1 className="text-xl font-bold tracking-widest text-amber-400">
            SICREE
          </h1>

          <p className="text-[10px] text-white/60">
            Commune
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="mt-6 px-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Navigation
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  active
                    ? "bg-white font-semibold text-[#123524] shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <Icon size={20} strokeWidth={2} />
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* BAS DU SIDEBAR */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-white/50">
            Système d'information
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            Recensement communal
          </p>
        </div>
      </div>
    </aside>
  );
}

