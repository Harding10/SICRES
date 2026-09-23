"use client";

import { RefreshCw } from "lucide-react";

interface ClientDashboardHeaderProps {
  establishmentName?: string;
  onRefresh: () => void;
}

export default function ClientDashboardHeader({
  establishmentName,
  onRefresh,
}: ClientDashboardHeaderProps) {
  return (
    <section className="border border-gray-200 bg-[#123524] px-5 py-5 text-white">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Espace établissement
          </div>

          <h1 className="text-xl font-semibold sm:text-2xl">
            Bienvenue, {establishmentName || "votre établissement"}
          </h1>

          <p className="mt-1.5 text-sm text-white/65">
            Consultez et mettez à jour les informations relatives à votre
            établissement.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-[#123524] transition hover:bg-gray-100"
        >
          <RefreshCw size={16} strokeWidth={1.8} />
          Actualiser
        </button>
      </div>
    </section>
  );
}