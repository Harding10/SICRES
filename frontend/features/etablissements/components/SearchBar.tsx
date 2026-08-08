"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Rechercher un établissement..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-700 outline-none transition focus:border-[#123524] focus:ring-2 focus:ring-[#123524]/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          title="Effacer la recherche"
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}