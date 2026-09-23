"use client";

import { Loader2 } from "lucide-react";

export default function EtablissementLoadingState() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Loader2
          size={20}
          strokeWidth={1.8}
          className="animate-spin text-[#123524]"
        />

        <span>
          Chargement des informations...
        </span>
      </div>
    </div>
  );
}