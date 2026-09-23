"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  BarChart3,
  Megaphone,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const mainNavigation = [
  {
    label: "Tableau de bord",
    href: "/admin_dashboard",
    icon: LayoutDashboard,
  },
];

const managementNavigation = [
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
    label: "Campagnes",
    href: "/campagnes",
    icon: Megaphone,
  },
];

const analysisNavigation = [
  {
    label: "Statistiques",
    href: "/statistiques",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  function isActive(href: string) {
    return (
      pathname === href ||
      (href !== "/admin_dashboard" &&
        pathname.startsWith(`${href}/`))
    );
  }

  function renderNavigation(
    items:
      | typeof mainNavigation
      | typeof managementNavigation
      | typeof analysisNavigation
  ) {
    return items.map((item) => {
      const Icon = item.icon;
      const active = isActive(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`group flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition ${
            active
              ? "border-[#d89b28] bg-white/[0.08] font-semibold text-white"
              : "border-transparent text-white/65 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
          }`}
        >
          <Icon
            size={18}
            strokeWidth={active ? 2.2 : 1.8}
            className={
              active
                ? "text-[#d89b28]"
                : "text-white/50 group-hover:text-white/80"
            }
          />

          <span>{item.label}</span>
        </Link>
      );
    });
  }

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[230px] flex-col bg-[#123524] text-white lg:flex">
      {/* IDENTITÉ SICREE */}
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/admin_dashboard"
          className="flex items-center gap-3"
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white">
            <Image
              src="/images/logo.png"
              alt="Logo SICREE"
              fill
              priority
              sizes="40px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-lg font-bold tracking-[0.16em] text-[#d89b28]">
              SICREE
            </p>

            <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.06em] text-white/45">
              Administration communale
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-5">
        <div className="mb-6">
          <p className="mb-2 px-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            Principal
          </p>

          {renderNavigation(mainNavigation)}
        </div>

        <div className="mb-6">
          <p className="mb-2 px-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            Gestion
          </p>

          {renderNavigation(managementNavigation)}
        </div>

        <div>
          <p className="mb-2 px-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            Analyse
          </p>

          {renderNavigation(analysisNavigation)}
        </div>
      </nav>

      {/* DÉCONNEXION */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#d89b28] px-3 py-2.5 text-sm font-medium text-[#d89b28] transition hover:bg-[#d89b28] hover:text-[#123524]"
        >
          <LogOut size={17} strokeWidth={1.9} />

          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}