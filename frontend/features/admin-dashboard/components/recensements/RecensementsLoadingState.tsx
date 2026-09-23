import { Loader2 } from "lucide-react";

export default function RecensementsLoadingState() {
  return (
    <div className="flex min-h-[260px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <Loader2
          size={20}
          className="animate-spin text-[#123524]"
        />

        Chargement des recensements...
      </div>
    </div>
  );
}