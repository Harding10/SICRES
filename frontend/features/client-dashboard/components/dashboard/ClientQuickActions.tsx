import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
} from "lucide-react";

const actions = [
  {
    title: "Mon recensement",
    description:
      "Consultez et complétez les informations demandées pour votre établissement.",
    href: "/recensement",
    icon: ClipboardCheck,
  },
  {
    title: "Informations scolaires",
    description:
      "Consultez et renseignez les informations relatives au fonctionnement scolaire.",
    href: "/etablissement/modifier",
    icon: GraduationCap,
  },
  {
    title: "Mes documents",
    description:
      "Consultez les documents associés à votre établissement.",
    href: "/etablissement/documents",
    icon: FileText,
  },
];

export default function ClientQuickActions() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-gray-800">
          Accès rapides
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Accédez directement aux principales fonctionnalités de votre espace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-gray-500">
                {action.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#123524]">
                Accéder

                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}