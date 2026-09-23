interface StatistiquesInformationsProps {
  etablissementsAVerifier: number;
  campagnesActives: number;
  totalRecensements: number;
  recensementsValides: number;
}

export default function StatistiquesInformations({
  etablissementsAVerifier,
  campagnesActives,
  totalRecensements,
  recensementsValides,
}: StatistiquesInformationsProps) {
  const tauxValidation =
    totalRecensements > 0
      ? (
          (recensementsValides /
            totalRecensements) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <InfoCard
        label="À vérifier"
        value={
          etablissementsAVerifier
        }
        description="Établissements nécessitant une vérification"
      />

      <InfoCard
        label="Campagnes actives"
        value={campagnesActives}
        description="Campagnes actuellement en cours"
      />

      <InfoCard
        label="Taux de validation"
        value={`${tauxValidation} %`}
        description="Part des recensements validés"
      />
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: number | string;
  description: string;
}

function InfoCard({
  label,
  value,
  description,
}: InfoCardProps) {
  return (
    <div className="border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}