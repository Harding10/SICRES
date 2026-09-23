"use client";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface ClientRecensementErrorProps {
  message: string;
  onRetry: () => void;
}

export default function ClientRecensementError({
  message,
  onRetry,
}: ClientRecensementErrorProps) {
  return (
    <section className="border border-red-100 bg-white p-8 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-gray-100 text-gray-500">
        <AlertCircle
          size={21}
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-4 text-base font-semibold text-gray-900">
        Recensement indisponible
      </h2>

      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 bg-[#123524] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d291b]"
      >
        <RefreshCw
          size={16}
          strokeWidth={1.8}
        />

        Réessayer
      </button>
    </section>
  );
}