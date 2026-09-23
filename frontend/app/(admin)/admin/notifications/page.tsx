"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Info,
} from "lucide-react";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-500">
              <Bell size={19} strokeWidth={1.9} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Notifications
              </h1>

              <p className="text-sm text-gray-500">
                Consultez les informations et alertes de votre administration.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin_dashboard"
          className="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#123524]/30 hover:bg-gray-50 hover:text-[#123524]"
        >
          <ArrowLeft size={16} />
          Retour au tableau de bord
        </Link>
      </div>

      {/* CONTENU */}
      <div className="border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Notifications récentes
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Informations et événements liés à l'administration communale.
          </p>
        </div>

        {/* ÉTAT VIDE */}
        <div className="flex min-h-[260px] flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-500">
            <Info size={22} strokeWidth={1.8} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-800">
            Aucune notification disponible
          </h3>

          <p className="mt-2 max-w-md text-xs leading-5 text-gray-500">
            Les notifications relatives aux recensements, établissements,
            campagnes et autres activités administratives apparaîtront ici
            lorsqu'elles seront disponibles.
          </p>
        </div>
      </div>
    </div>
  );
}