import {
  ClipboardList,
  RefreshCw,
} from "lucide-react";

interface RecensementsHeaderProps {
  loading: boolean;
  onRefresh: () => void | Promise<void>;
}

export default function RecensementsHeader({
  loading,
  onRefresh,
}: RecensementsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-500">
          <ClipboardList
            size={20}
            strokeWidth={1.8}
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Recensements
          </h1>

          <p className="text-sm text-gray-500">
            Suivi des déclarations et des recensements des établissements scolaires.
          </p>
        </div>
      </div>

      <button
  type="button"
  onClick={() => void onRefresh()}
  disabled={loading}
  className="inline-flex h-10 items-center justify-center gap-2 border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
>
  <RefreshCw
    size={16}
    className={loading ? "animate-spin" : ""}
  />
  Actualiser
</button>
    </div>
  );
}