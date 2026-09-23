interface CampagneStatusBadgeProps {
  statut?: string;
}

export default function CampagneStatusBadge({
  statut,
}: CampagneStatusBadgeProps) {
  const normalized =
    statut?.trim().toLowerCase() ?? "";

  let className =
    "bg-gray-100 text-gray-600";

  if (
    normalized === "active" ||
    normalized === "actif" ||
    normalized === "en cours"
  ) {
    className =
      "bg-green-100 text-green-700";
  } else if (
    normalized === "planifiée" ||
    normalized === "planifiee" ||
    normalized === "planifié" ||
    normalized === "planifie"
  ) {
    className =
      "bg-amber-100 text-amber-700";
  } else if (
    normalized === "terminée" ||
    normalized === "terminee" ||
    normalized === "terminé" ||
    normalized === "termine"
  ) {
    className =
      "bg-gray-100 text-gray-600";
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {statut || "—"}
    </span>
  );
}