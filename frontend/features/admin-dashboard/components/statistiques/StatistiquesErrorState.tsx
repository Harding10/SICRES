import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface StatistiquesErrorStateProps {
  message: string;
  onRetry: () => void | Promise<void>;
}

export default function StatistiquesErrorState({
  message,
  onRetry,
}: StatistiquesErrorStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center border border-gray-200 bg-white px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-500">
        <AlertCircle
          size={21}
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-4 text-sm font-semibold text-gray-900">
        Données statistiques indisponibles
      </h2>

      <p className="mt-1 max-w-md text-sm text-gray-500">
        {message}
      </p>

      <button
        type="button"
        onClick={() =>
          void onRetry()
        }
        className="mt-5 inline-flex h-10 items-center gap-2 border border-[#123524] bg-[#123524] px-4 text-sm font-semibold text-white transition hover:bg-[#0d291b]"
      >
        <RefreshCw size={16} />

        Réessayer
      </button>
    </div>
  );
}