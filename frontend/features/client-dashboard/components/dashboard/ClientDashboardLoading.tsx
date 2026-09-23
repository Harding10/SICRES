import { Loader2 } from "lucide-react";

export default function ClientDashboardLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2
          size={32}
          className="animate-spin text-[#123524]"
        />

        <p className="text-sm text-gray-500">
          Chargement de votre espace...
        </p>
      </div>
    </div>
  );
}