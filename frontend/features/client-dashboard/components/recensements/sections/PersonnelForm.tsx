"use client";

export default function PersonnelForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Personnel
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les effectifs du personnel de
          l'établissement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="enseignants"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Enseignants
          </label>

          <input
            id="enseignants"
            name="enseignants"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="personnel_administratif"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Personnel administratif
          </label>

          <input
            id="personnel_administratif"
            name="personnel_administratif"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="personnel_technique"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Personnel technique
          </label>

          <input
            id="personnel_technique"
            name="personnel_technique"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="personnel_contractuel"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Personnel contractuel
          </label>

          <input
            id="personnel_contractuel"
            name="personnel_contractuel"
            type="number"
            min="0"
            placeholder="0"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#123524]"
          />
        </div>

        <div>
          <label
            htmlFor="personnel_femmes"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Personnel féminin
          </label>

          <input
            id="personnel_femmes"
            name="personnel_femmes"
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