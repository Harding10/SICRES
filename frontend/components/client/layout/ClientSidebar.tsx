"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
} from "lucide-react";

const navigation = [
  {
    label: "Tableau de bord",
    href: "/client_dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Mon établissement",
    href: "/etablissement",
    icon: Building2,
  },
  {
    label: "Recensement",
    href: "/recensement",
    icon: ClipboardList,
  },
  {
    label: "Documents",
    href: "/etablissement/documents",
    icon: FileText,
  },
];

export default function ClientSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/client_dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[72px] flex-col bg-[#123524]">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-white/10">
        <Link
          href="/client_dashboard"
          aria-label="SICREE - Tableau de bord"
          className="flex items-center justify-center"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white">
            <Image
              src="/images/logo.png"
              alt="Logo SICREE"
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2 py-5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <div
              key={item.href}
              className="group relative"
            >
              <Link
                href={item.href}
                aria-label={item.label}
                className={`relative flex h-10 w-10 items-center justify-center transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-[#d89b28]" />
                )}

                <Icon
                  size={19}
                  strokeWidth={active ? 2.2 : 1.8}
                  className="text-white"
                />
              </Link>

              {/* Tooltip */}
              <div className="pointer-events-none absolute left-[48px] top-1/2 z-[60] -translate-y-1/2 whitespace-nowrap border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}