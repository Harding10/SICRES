import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const navigationLinks = [
  {
    label: "Accueil",
    href: "/#accueil",
  },
  {
    label: "À propos",
    href: "/#a-propos",
  },
  {
    label: "Recensement",
    href: "/#recensement",
  },
  {
    label: "Établissements",
    href: "/#etablissements",
  },
  {
    label: "Statistiques",
    href: "/#statistiques",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const contactItems = [
  {
    icon: MapPin,
    text: "Commune de Port-Bouët",
  },
  {
    icon: Phone,
    text: "Service communal",
  },
  {
    icon: Mail,
    text: "Service administratif",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#12221d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identité */}
          <div>
            <Link href="/#accueil" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Logo SICREE"
                width={180}
                height={60}
                className="h-auto w-[150px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/65">
              Système Communal de Recensement des Établissements
              d'Enseignement de la Commune de Port-Bouët.
            </p>

            <div className="mt-6 h-1 w-12 bg-[#d89b28]" />

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/45">
              Commune de Port-Bouët
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <nav className="mt-5 space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact et accès */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-sm font-medium text-white/60"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-[#d89b28]"
                      strokeWidth={1.8}
                    />

                    <span>{item.text}</span>
                  </div>
                );
              })}

              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center bg-[#d89b28] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#bd841f]"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs font-medium text-white/45">
            © {new Date().getFullYear()} SICREE — Commune de Port-Bouët.
          </p>

          <p className="text-xs font-medium text-white/45">
            Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}