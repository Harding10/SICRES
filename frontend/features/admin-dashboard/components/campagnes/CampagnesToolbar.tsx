import {
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

interface CampagnesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  onRefresh: () => void | Promise<void>;
}

export default function CampagnesToolbar({
  search,
  onSearchChange,
  loading,
  onRefresh,
}: CampagnesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value,
            )
          }
          placeholder="Rechercher une campagne..."
          className="h-10 w-full border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/10"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          Filtres
        </button>

        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center border border-gray-300 bg-white px-3 text-gray-600 transition hover:bg-gray-50 hover:text-[#123524] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Actualiser"
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />
        </button>
      </div>
    </div>
  );
}