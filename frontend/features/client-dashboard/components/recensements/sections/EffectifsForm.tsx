"use client";

export default function EffectifsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Effectifs des élèves
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les effectifs des élèves inscrits.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label
            htmlFor="eleves_total"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Effectif total
          </label>

          <input
            id="eleves_total"
            name="eleves_total"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="eleves_garcons"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Garçons
          </label>

          <input
            id="eleves_garcons"
            name="eleves_garcons"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="eleves_filles"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Filles
          </label>

          <input
            id="eleves_filles"
            name="eleves_filles"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="nouveaux_inscrits"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nouveaux inscrits
          </label>

          <input
            id="nouveaux_inscrits"
            name="nouveaux_inscrits"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="redoublants"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Redoublants
          </label>

          <input
            id="redoublants"
            name="redoublants"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>
      </div>
    </div>
  );
}