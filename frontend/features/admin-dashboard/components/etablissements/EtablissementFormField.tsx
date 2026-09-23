"use client";

interface EtablissementFormFieldProps {
label: string;
value: string;
onChange: (value: string) => void;
placeholder?: string;
type?: string;
textarea?: boolean;
required?: boolean;
}

export default function EtablissementFormField({
label,
value,
onChange,
placeholder,
type = "text",
textarea = false,
required = false,
}: EtablissementFormFieldProps) {
return ( <div className="space-y-1.5"> <label className="block text-sm font-medium text-gray-700">
{label}
{required && ( <span className="ml-1 text-red-500">*</span>
)} </label>


  {textarea ? (
    <textarea
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      required={required}
      rows={3}
      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#123524]/40 focus:bg-white focus:ring-2 focus:ring-[#123524]/10"
    />
  ) : (
    <input
      type={type}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      required={required}
      className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#123524]/40 focus:bg-white focus:ring-2 focus:ring-[#123524]/10"
    />
  )}
</div>


);
}
