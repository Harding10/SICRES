"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  Home,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const pageTitles: Record<string, string> = {
  "/admin_dashboard": "Tableau de bord",
  "/etablissements": "Établissements",
  "/recensements": "Recensements",
  "/campagnes": "Campagnes",
  "/statistiques": "Statistiques",

  // Pages administrateur
  "/admin/notifications": "Notifications",
  "/admin/profil": "Mon profil",
  "/admin/parametres": "Paramètres",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const title = pageTitles[pathname] || "Administration";

  // ============================================================
  // FERMETURE DU MENU EN DEHORS
  // ============================================================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ============================================================
  // DÉCONNEXION
  // ============================================================

  async function handleLogout() {
    try {
      setIsProfileOpen(false);

      await logout();

      router.replace("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[68px] border-b border-gray-200 bg-white lg:left-[230px]">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            GAUCHE
        ===================================================== */}

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Home
              size={13}
              strokeWidth={1.8}
            />

            <span>Administration</span>

            <ChevronRight
              size={12}
              strokeWidth={1.8}
            />

            <span className="text-gray-600">
              {title}
            </span>
          </div>

          <h1 className="mt-0.5 text-lg font-bold tracking-tight text-[#123524] sm:text-xl">
            {title}
          </h1>
        </div>

        {/* =====================================================
            DROITE
        ===================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* ==================================================
              NOTIFICATIONS ADMINISTRATEUR
          ================================================== */}

          <Link
            href="/admin/notifications"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition hover:border-[#123524]/20 hover:bg-gray-50 hover:text-[#123524]"
          >
            <Bell
              size={18}
              strokeWidth={1.9}
            />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#d89b28] ring-2 ring-white" />
          </Link>

          {/* ==================================================
              SÉPARATEUR
          ================================================== */}

          <div className="hidden h-7 w-px bg-gray-200 sm:block" />

          {/* ==================================================
              MENU ADMINISTRATEUR
          ================================================== */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setIsProfileOpen((current) => !current)
              }
              aria-expanded={isProfileOpen}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1 transition ${
                isProfileOpen
                  ? "bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
            >

              {/* ==================================================
                  AVATAR
              ================================================== */}

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123524] text-xs font-bold text-white">
                A
              </div>

              {/* ==================================================
                  INFORMATIONS
              ================================================== */}

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-tight text-gray-800">
                  Administrateur
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  Commune de Port-Bouët
                </p>
              </div>

              {/* ==================================================
                  CHEVRON
              ================================================== */}

              <ChevronRight
                size={14}
                className={`hidden text-gray-400 transition-transform duration-200 sm:block ${
                  isProfileOpen
                    ? "rotate-[270deg]"
                    : "rotate-90"
                }`}
              />
            </button>

            {/* ==================================================
                MENU DÉROULANT
            ================================================== */}

            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[235px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">

                {/* ==================================================
                    IDENTITÉ
                ================================================== */}

                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-[#123524]">
                    Administrateur
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Administration communale
                  </p>
                </div>

                {/* ==================================================
                    LIENS
                ================================================== */}

                <div className="p-2">

                  {/* PROFIL */}

                  <Link
                    href="/admin/profil"
                    onClick={() => setIsProfileOpen(false)}
                    className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#123524]"
                  >
                    <User
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-400 group-hover:text-[#d89b28]"
                    />

                    <span>Mon profil</span>
                  </Link>

                  {/* PARAMÈTRES */}

                  <Link
                    href="/admin/parametres"
                    onClick={() => setIsProfileOpen(false)}
                    className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#123524]"
                  >
                    <Settings
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-400 group-hover:text-[#d89b28]"
                    />

                    <span>Paramètres</span>
                  </Link>

                </div>

                {/* ==================================================
                    DÉCONNEXION
                ================================================== */}

                <div className="border-t border-gray-100 p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut
                      size={17}
                      strokeWidth={1.8}
                    />

                    <span>Se déconnecter</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}