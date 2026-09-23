"use client";

export default function InfrastructuresForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Infrastructures
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les infrastructures et locaux disponibles dans
          l'établissement.
        </p>
      </div>

      {/* Locaux pédagogiques */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Locaux pédagogiques
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="nombre_salles_classe"
              className="block text-sm font-medium text-gray-700"
            >
              Salles de classe
            </label>

            <input
              id="nombre_salles_classe"
              name="nombre_salles_classe"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_laboratoires"
              className="block text-sm font-medium text-gray-700"
            >
              Laboratoires
            </label>

            <input
              id="nombre_laboratoires"
              name="nombre_laboratoires"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_ateliers"
              className="block text-sm font-medium text-gray-700"
            >
              Ateliers
            </label>

            <input
              id="nombre_ateliers"
              name="nombre_ateliers"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_salles_informatique"
              className="block text-sm font-medium text-gray-700"
            >
              Salles informatiques
            </label>

            <input
              id="nombre_salles_informatique"
              name="nombre_salles_informatique"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_bibliotheques"
              className="block text-sm font-medium text-gray-700"
            >
              Bibliothèques
            </label>

            <input
              id="nombre_bibliotheques"
              name="nombre_bibliotheques"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* Administration et services */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Locaux administratifs et de services
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="bureau_direction"
              className="block text-sm font-medium text-gray-700"
            >
              Bureaux de direction
            </label>

            <input
              id="bureau_direction"
              name="bureau_direction"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="salle_enseignants"
              className="block text-sm font-medium text-gray-700"
            >
              Salles des enseignants
            </label>

            <input
              id="salle_enseignants"
              name="salle_enseignants"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="salle_reunion"
              className="block text-sm font-medium text-gray-700"
            >
              Salles de réunion
            </label>

            <input
              id="salle_reunion"
              name="salle_reunion"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="magasin"
              className="block text-sm font-medium text-gray-700"
            >
              Magasins / réserves
            </label>

            <input
              id="magasin"
              name="magasin"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* Sanitaires et accès */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Sanitaires et accessibilité
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="nombre_sanitaires"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de sanitaires
            </label>

            <input
              id="nombre_sanitaires"
              name="nombre_sanitaires"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="sanitaires_filles"
              className="block text-sm font-medium text-gray-700"
            >
              Sanitaires pour filles
            </label>

            <input
              id="sanitaires_filles"
              name="sanitaires_filles"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="sanitaires_garcons"
              className="block text-sm font-medium text-gray-700"
            >
              Sanitaires pour garçons
            </label>

            <input
              id="sanitaires_garcons"
              name="sanitaires_garcons"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 px-5 py-5">
          <p className="text-sm font-medium text-gray-700">
            Accessibilité de l'établissement
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 border border-gray-200 px-4 py-3">
              <input
                type="checkbox"
                name="acces_handicapes"
                className="h-4 w-4 accent-[#123524]"
              />

              <span className="text-sm text-gray-700">
                Accès adapté aux personnes à mobilité réduite
              </span>
            </label>

            <label className="flex items-center gap-3 border border-gray-200 px-4 py-3">
              <input
                type="checkbox"
                name="rampe_acces"
                className="h-4 w-4 accent-[#123524]"
              />

              <span className="text-sm text-gray-700">
                Présence de rampes d'accès
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* État général */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            État général des infrastructures
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="etat_infrastructures"
              className="block text-sm font-medium text-gray-700"
            >
              État général
            </label>

            <select
              id="etat_infrastructures"
              name="etat_infrastructures"
              defaultValue=""
              className="mt-2 w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="bon">Bon</option>
              <option value="moyen">Moyen</option>
              <option value="mauvais">Mauvais</option>
              <option value="tres_mauvais">Très mauvais</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="observations_infrastructures"
              className="block text-sm font-medium text-gray-700"
            >
              Observations
            </label>

            <textarea
              id="observations_infrastructures"
              name="observations_infrastructures"
              rows={3}
              placeholder="Précisez les éventuels besoins ou problèmes..."
              className="mt-2 w-full resize-none border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}