import { Loader2 } from "lucide-react";

export default function StatistiquesLoadingState() {
  return (
    <div className="flex min-h-[260px] items-center justify-center border border-gray-200 bg-white">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Loader2
          size={20}
          className="animate-spin text-[#123524]"
        />

        Chargement des statistiques...
      </div>
    </div>
  );
}