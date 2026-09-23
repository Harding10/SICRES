interface StatusBadgeProps {
status?: string | null;
}

export default function StatusBadge({
status,
}: StatusBadgeProps) {
const normalizedStatus =
status?.trim().toLowerCase() || "";

let className =
"bg-gray-100 text-gray-600";

if (
normalizedStatus === "actif" ||
normalizedStatus === "active" ||
normalizedStatus === "validé" ||
normalizedStatus === "valide"
) {
className =
"bg-green-50 text-green-700";
} else if (
normalizedStatus === "à vérifier" ||
normalizedStatus === "a verifier" ||
normalizedStatus === "a vérifier"
) {
className =
"bg-yellow-50 text-yellow-700";
} else if (
normalizedStatus === "inactif" ||
normalizedStatus === "inactive"
) {
className =
"bg-red-50 text-red-700";
}

return (
<span
className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
>
{status || "Non défini"} </span>
);
}
