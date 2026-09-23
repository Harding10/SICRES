import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

// Composant pour les cartes d'information
interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, title, details }) => (
  <div className="flex gap-4 p-5 bg-[#f8faf9] rounded-xl border border-slate-100">
    <div className="flex items-center justify-center h-12 w-12 shrink-0 rounded-full bg-emerald-50 text-emerald-600">
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {details.map((detail, index) => (
        <p key={index} className="text-xs text-slate-600 leading-relaxed">
          {detail}
        </p>
      ))}
    </div>
  </div>
);

// Composant pour les champs de formulaire
interface FormFieldProps {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, placeholder, type = 'text', textarea = false }) => {
  const commonClasses = "w-full rounded-md border border-slate-200 bg-[#f8faf9] px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500";
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold text-slate-700">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} placeholder={placeholder} className={commonClasses}></textarea>
      ) : (
        <input type={type} id={id} placeholder={placeholder} className={commonClasses} />
      )}
    </div>
  );
};

export default function ContactPage() {
  const contactDetails = [
    {
      icon: <MapPin size={24} />,
      title: 'Notre Adresse',
      details: ['Mairie de Port-Bouët, Abidjan, Côte d\'Ivoire'],
    },
    {
      icon: <Phone size={24} />,
      title: 'Numéro de Téléphone',
      details: ['+225 21 00 00 00'],
    },
    {
      icon: <Mail size={24} />,
      title: 'Adresse E-mail',
      details: ['contact@sicres-portbouet.ci'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. HEADER */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo SICRES" className="h-10 w-10 object-contain" />
            <span className="text-base font-extrabold tracking-wide text-[#005a36]">
              SICRES
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-[#005a36] transition">
              Accueil
            </Link>
            <Link href="/recensement" className="hover:text-[#005a36] transition">
              Recensement
            </Link>
            <Link href="/statistiques" className="hover:text-[#005a36] transition">
              Statistiques
            </Link>
            <Link href="/contact" className="text-[#005a36] font-bold border-b-2 border-[#005a36] pb-0.5">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md bg-[#005a36] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#004429] shadow-xs">
              Connexion
            </button>
          </div>
        </div>
      </header>

      {/* 2. TITRE DE SECTION (ESPACEMENT RÉDUIT) */}
      <section className="bg-[#f8faf9] py-6 md:py-8 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#005a36]">
            Contactez-nous
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
            Une question ? Une demande ? L'équipe SICRES est à votre écoute.
          </p>
        </div>
      </section>

      {/* 3. FORMULAIRE ET CARTES INFO (ESPACEMENT RÉDUIT) */}
      <main className="flex-1 bg-white py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Colonne Gauche: Formulaire */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-[#005a36]">
              Envoyez-nous un message
            </h2>
            
            <form className="space-y-4">
              <FormField label="Nom Complet" id="nom" placeholder="Votre Nom" />
              <FormField label="Adresse E-mail" id="email" placeholder="Votre Email" type="email" />
              <FormField label="Sujet" id="sujet" placeholder="Objet" />
              <FormField label="Message" id="message" placeholder="Votre Message..." textarea={true} />
              
              <div className="pt-2">
                <button type="submit" className="flex items-center gap-2 rounded-full bg-[#005a36] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#004429] shadow-md">
                  <Send size={16} />
                  <span>Envoyer le message</span>
                </button>
              </div>
            </form>
          </div>

          {/* Colonne Droite: Cartes d'info */}
          <div className="md:col-span-5 bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm h-fit">
            <h2 className="text-sm font-bold text-[#005a36]">
              Informations de Contact
            </h2>
            <div className="mt-4 space-y-4">
              {contactDetails.map((detail, index) => (
                <ContactInfoCard key={index} {...detail} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}