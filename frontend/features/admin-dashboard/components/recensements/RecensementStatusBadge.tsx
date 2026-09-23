interface RecensementStatusBadgeProps {
  statut?: string | null;
}

export default function RecensementStatusBadge({
  statut,
}: RecensementStatusBadgeProps) {
  const normalized =
    statut?.trim().toLowerCase() ?? "";

  let className =
    "bg-gray-100 text-gray-600";

  if (
    normalized === "validé" ||
    normalized === "valide"
  ) {
    className =
      "bg-green-100 text-green-700";
  } else if (
    normalized === "en cours"
  ) {
    className =
      "bg-amber-100 text-amber-700";
  } else if (
    normalized === "à traiter" ||
    normalized === "a traiter"
  ) {
    className =
      "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {statut || "—"}
    </span>
  );
}