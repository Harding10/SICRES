import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Adresse",
    value: "Commune de Port-Bouët",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "Service communal",
  },
  {
    icon: Mail,
    title: "Courriel",
    value: "Service administratif",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 w-full bg-white py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* En-tête centré */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d89b28]">
            Contact
          </span>

          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#082a22] sm:text-4xl lg:text-5xl">
            Nous contacter
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 bg-[#d89b28]" />

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-gray-600 sm:text-lg">
            Pour toute information concernant le SICREE et le recensement des
            établissements d'enseignement, contactez la commune.
          </p>
        </div>

        {/* Coordonnées */}
        <div className="mt-12 grid border-y border-gray-200 sm:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-4 px-5 py-6 text-center ${
                  index !== 0
                    ? "border-t border-gray-200 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-[#124b3d]"
                  strokeWidth={1.8}
                />

                <div className="text-left">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#d89b28]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#082a22] sm:text-base">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}