import { Megaphone } from "lucide-react";

interface CampagnesEmptyStateProps {
  search: string;
}

export default function CampagnesEmptyState({
  search,
}: CampagnesEmptyStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-400">
        <Megaphone
          size={21}
          strokeWidth={1.8}
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        Aucune campagne trouvée
      </h3>

      <p className="mt-1 max-w-md text-sm text-gray-500">
        {search
          ? "Aucune campagne ne correspond à votre recherche."
          : "Aucune campagne n'est actuellement disponible."}
      </p>
    </div>
  );
}