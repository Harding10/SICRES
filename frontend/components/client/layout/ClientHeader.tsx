"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { logout } from "@/features/auth/services/authService";

export default function ClientHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

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
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
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
      console.error(
        "Erreur lors de la déconnexion :",
        error,
      );
    }
  }

  return (
    <header className="sticky top-0 z-40 h-[68px] border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between pl-3 pr-5 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-7">

        {/* =====================================================
            IDENTITÉ SICREE
        ===================================================== */}

        <Link
          href="/client_dashboard"
          className="flex items-center"
        >
          <div className="flex flex-col justify-center leading-none">
            <p className="text-lg font-bold tracking-[0.16em] text-[#d89b28]">
              SICREE
            </p>

            <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.06em] text-gray-400">
              Espace établissement
            </p>
          </div>
        </Link>

        {/* =====================================================
            DROITE
        ===================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          <Link
            href="/notifications"
            aria-label="Notifications"
            className={`relative flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition hover:border-[#123524]/20 hover:bg-gray-50 hover:text-[#123524] ${
              pathname.startsWith("/notifications")
                ? "border-[#123524]/20 bg-gray-50 text-[#123524]"
                : ""
            }`}
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
              MENU ÉTABLISSEMENT
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
              aria-haspopup="menu"
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
                E
              </div>

              {/* ==================================================
                  INFORMATIONS
              ================================================== */}

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-tight text-gray-800">
                  Établissement
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  Espace établissement
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
                    Établissement
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Espace établissement
                  </p>
                </div>

                {/* ==================================================
                    LIENS
                ================================================== */}

                <div className="p-2">

                  {/* PROFIL */}

                  <Link
                    href="/profil"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
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
                    href="/parametres"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
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