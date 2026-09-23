"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Accueil", href: "/#accueil", target: "accueil" },
  { label: "À propos", href: "/#a-propos", target: "a-propos" },
  { label: "Recensement", href: "/#recensement", target: "recensement" },
  {
    label: "Établissements",
    href: "/#etablissements",
    target: "etablissements",
  },
  {
    label: "Statistiques",
    href: "/#statistiques",
    target: "statistiques",
  },
  { label: "Contact", href: "/#contact", target: "contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();

    setIsMenuOpen(false);

    const section = document.getElementById(target);

    if (section) {
      const headerOffset = 78;

      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionPosition - headerOffset,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `/#${target}`);
    } else {
      window.location.href = `/#${target}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4">

          {/* Logo + institution */}
          <a
            href="/#accueil"
            className="flex shrink-0 items-center gap-3"
            aria-label="SICREE - Accueil"
            onClick={(event) => handleSectionClick(event, "accueil")}
          >
            <Image
              src="/images/logo.png"
              alt="Logo SICREE"
              width={125}
              height={45}
              priority
              className="h-[40px] w-auto object-contain"
            />

            <div className="hidden border-l border-gray-200 pl-3 sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-gray-500">
                République de Côte d'Ivoire
              </p>

              <p className="mt-0.5 text-[11px] font-extrabold text-[#124b3d]">
                Commune de Port-Bouët
              </p>
            </div>
          </a>

          {/* Navigation desktop */}
          <nav className="hidden items-center xl:flex">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleSectionClick(event, item.target)
                }
                className="px-2.5 py-[26px] text-[12px] font-bold text-gray-700 transition-colors hover:text-[#124b3d]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Connexion desktop */}
            <Link
              href="/login"
              className="hidden shrink-0 bg-[#124b3d] px-4 py-2.5 text-xs font-bold !text-white transition-colors hover:bg-[#0d3b30] sm:px-5 sm:text-sm xl:inline-flex"
            >
              Se connecter
            </Link>

            {/* Menu mobile / tablette */}
            <button
              type="button"
              aria-label={
                isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center border border-gray-200 text-[#124b3d] transition-colors hover:border-[#124b3d] hover:bg-[#f5f8f6] xl:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-3 xl:hidden">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleSectionClick(event, item.target)
                  }
                  className="border-b border-gray-100 px-2 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-[#f5f8f6] hover:text-[#124b3d]"
                >
                  {item.label}
                </a>
              ))}

              {/* Connexion mobile */}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 flex items-center justify-center bg-[#124b3d] px-4 py-3 text-center text-sm font-bold !text-white transition-colors hover:bg-[#0d3b30]"
              >
                Se connecter
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Ligne institutionnelle */}
      <div className="h-[3px] bg-[#d89b28]" />
    </header>
  );
}