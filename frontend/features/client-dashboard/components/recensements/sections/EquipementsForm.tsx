"use client";

export default function EquipementsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Équipements
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les équipements disponibles et leur état dans
          l'établissement.
        </p>
      </div>

      {/* Mobilier scolaire */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Mobilier scolaire
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="tables_bancs"
              className="block text-sm font-medium text-gray-700"
            >
              Tables-bancs
            </label>

            <input
              id="tables_bancs"
              name="tables_bancs"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="bureaux_enseignants"
              className="block text-sm font-medium text-gray-700"
            >
              Bureaux d'enseignants
            </label>

            <input
              id="bureaux_enseignants"
              name="bureaux_enseignants"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="chaises"
              className="block text-sm font-medium text-gray-700"
            >
              Chaises
            </label>

            <input
              id="chaises"
              name="chaises"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="armoires"
              className="block text-sm font-medium text-gray-700"
            >
              Armoires
            </label>

            <input
              id="armoires"
              name="armoires"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="tableaux"
              className="block text-sm font-medium text-gray-700"
            >
              Tableaux
            </label>

            <input
              id="tableaux"
              name="tableaux"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* Informatique */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Équipements informatiques
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="ordinateurs"
              className="block text-sm font-medium text-gray-700"
            >
              Ordinateurs
            </label>

            <input
              id="ordinateurs"
              name="ordinateurs"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="tablettes"
              className="block text-sm font-medium text-gray-700"
            >
              Tablettes
            </label>

            <input
              id="tablettes"
              name="tablettes"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="videoprojecteurs"
              className="block text-sm font-medium text-gray-700"
            >
              Vidéoprojecteurs
            </label>

            <input
              id="videoprojecteurs"
              name="videoprojecteurs"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="imprimantes"
              className="block text-sm font-medium text-gray-700"
            >
              Imprimantes
            </label>

            <input
              id="imprimantes"
              name="imprimantes"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 px-5 py-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 border border-gray-200 px-4 py-3">
              <input
                type="checkbox"
                name="connexion_internet"
                className="h-4 w-4 accent-[#123524]"
              />

              <span className="text-sm text-gray-700">
                Connexion Internet disponible
              </span>
            </label>

            <label className="flex items-center gap-3 border border-gray-200 px-4 py-3">
              <input
                type="checkbox"
                name="reseau_informatique"
                className="h-4 w-4 accent-[#123524]"
              />

              <span className="text-sm text-gray-700">
                Réseau informatique disponible
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* Équipements pédagogiques */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Équipements pédagogiques et sportifs
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="materiel_scientifique"
              className="block text-sm font-medium text-gray-700"
            >
              Matériel scientifique
            </label>

            <input
              id="materiel_scientifique"
              name="materiel_scientifique"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="materiel_sportif"
              className="block text-sm font-medium text-gray-700"
            >
              Matériel sportif
            </label>

            <input
              id="materiel_sportif"
              name="materiel_sportif"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="instruments_musique"
              className="block text-sm font-medium text-gray-700"
            >
              Instruments de musique
            </label>

            <input
              id="instruments_musique"
              name="instruments_musique"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* État des équipements */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            État des équipements
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="etat_equipements"
              className="block text-sm font-medium text-gray-700"
            >
              État général
            </label>

            <select
              id="etat_equipements"
              name="etat_equipements"
              defaultValue=""
              className="mt-2 w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            >
              <option value="" disabled>
                Sélectionner
              </option>
              <option value="bon">Bon</option>
              <option value="moyen">Moyen</option>
              <option value="mauvais">Mauvais</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="observations_equipements"
              className="block text-sm font-medium text-gray-700"
            >
              Observations
            </label>

            <textarea
              id="observations_equipements"
              name="observations_equipements"
              rows={3}
              placeholder="Précisez les équipements manquants ou à remplacer..."
              className="mt-2 w-full resize-none border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}