"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ClientDashboardErrorProps {
  message: string;
  onRetry: () => void;
}

export default function ClientDashboardError({
  message,
  onRetry,
}: ClientDashboardErrorProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <AlertCircle
            size={25}
            className="text-gray-500"
          />
        </div>

        <h1 className="mt-4 text-lg font-bold text-gray-900">
          Espace établissement
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {message}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#123524] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0d281b]"
        >
          <RefreshCw size={16} />
          Réessayer
        </button>
      </div>
    </div>
  );
}