"use client";

export default function InformationsScolairesForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Informations scolaires
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Renseignez les informations générales relatives au
          fonctionnement scolaire de l'établissement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="annee_scolaire"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Année scolaire
          </label>
          <input
            id="annee_scolaire"
            name="annee_scolaire"
            type="text"
            placeholder="Ex. 2026-2027"
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="date_rentree"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Date de rentrée scolaire
          </label>
          <input
            id="date_rentree"
            name="date_rentree"
            type="date"
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="nombre_jours_classe"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nombre de jours de classe prévus
          </label>
          <input
            id="nombre_jours_classe"
            name="nombre_jours_classe"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="regime_scolaire"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Régime scolaire
          </label>
          <select
            id="regime_scolaire"
            name="regime_scolaire"
            defaultValue=""
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          >
            <option value="" disabled>
              Sélectionner
            </option>
            <option value="matin">Matin</option>
            <option value="apres_midi">Après-midi</option>
            <option value="journee">Journée complète</option>
            <option value="double_flux">Double flux</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="langue_enseignement"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Langue principale d'enseignement
          </label>
          <input
            id="langue_enseignement"
            name="langue_enseignement"
            type="text"
            placeholder="Ex. Français"
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="nombre_semaines"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nombre de semaines d'enseignement
          </label>
          <input
            id="nombre_semaines"
            name="nombre_semaines"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>
      </div>

      <div className="border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-800">
          Organisation scolaire
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="cantine"
              className="h-4 w-4 accent-[#123524]"
            />
            L'établissement dispose d'une cantine
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="internat"
              className="h-4 w-4 accent-[#123524]"
            />
            L'établissement dispose d'un internat
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="bibliotheque"
              className="h-4 w-4 accent-[#123524]"
            />
            L'établissement dispose d'une bibliothèque
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="transport_scolaire"
              className="h-4 w-4 accent-[#123524]"
            />
            L'établissement dispose d'un transport scolaire
          </label>
        </div>
      </div>
    </div>
  );
}