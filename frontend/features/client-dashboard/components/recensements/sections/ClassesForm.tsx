"use client";

export default function ClassesForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Classes et niveaux
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les classes et niveaux ouverts dans l'établissement
          pour l'année scolaire concernée.
        </p>
      </div>

      {/* Organisation des classes */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Organisation des classes
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            Indiquez le nombre de classes par niveau.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="nombre_classes_prescolaire"
              className="block text-sm font-medium text-gray-700"
            >
              Classes préscolaires
            </label>

            <input
              id="nombre_classes_prescolaire"
              name="nombre_classes_prescolaire"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_classes_primaire"
              className="block text-sm font-medium text-gray-700"
            >
              Classes du primaire
            </label>

            <input
              id="nombre_classes_primaire"
              name="nombre_classes_primaire"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_classes_college"
              className="block text-sm font-medium text-gray-700"
            >
              Classes du collège
            </label>

            <input
              id="nombre_classes_college"
              name="nombre_classes_college"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_classes_lycee"
              className="block text-sm font-medium text-gray-700"
            >
              Classes du lycée
            </label>

            <input
              id="nombre_classes_lycee"
              name="nombre_classes_lycee"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_classes_technique"
              className="block text-sm font-medium text-gray-700"
            >
              Classes techniques
            </label>

            <input
              id="nombre_classes_technique"
              name="nombre_classes_technique"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="nombre_classes_professionnel"
              className="block text-sm font-medium text-gray-700"
            >
              Classes professionnelles
            </label>

            <input
              id="nombre_classes_professionnel"
              name="nombre_classes_professionnel"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Fonctionnement des classes
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="effectif_moyen_classe"
              className="block text-sm font-medium text-gray-700"
            >
              Effectif moyen par classe
            </label>

            <input
              id="effectif_moyen_classe"
              name="effectif_moyen_classe"
              type="number"
              min="0"
              placeholder="Ex. 35"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="classes_a_double_flux"
              className="block text-sm font-medium text-gray-700"
            >
              Classes à double flux
            </label>

            <input
              id="classes_a_double_flux"
              name="classes_a_double_flux"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>

          <div>
            <label
              htmlFor="classes_multigrades"
              className="block text-sm font-medium text-gray-700"
            >
              Classes multigrades
            </label>

            <input
              id="classes_multigrades"
              name="classes_multigrades"
              type="number"
              min="0"
              placeholder="0"
              className="mt-2 w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
            />
          </div>
        </div>
      </section>

      {/* Informations complémentaires */}
      <section className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Informations complémentaires
          </h4>
        </div>

        <div className="px-5 py-5">
          <label
            htmlFor="observations_classes"
            className="block text-sm font-medium text-gray-700"
          >
            Observations
          </label>

          <textarea
            id="observations_classes"
            name="observations_classes"
            rows={4}
            placeholder="Ajoutez une observation concernant l'organisation des classes..."
            className="mt-2 w-full resize-none border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#123524]"
          />
        </div>
      </section>
    </div>
  );
}