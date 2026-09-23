import Header from "@/features/home/components/Header";
import Hero from "@/features/home/components/Hero";
import AboutSection from "@/features/home/components/AboutSection";
import RecensementSection from "@/features/home/components/RecensementSection";
import EstablishmentsSection from "@/features/home/components/EstablishmentsSection";
import StatisticsSection from "@/features/home/components/StatisticsSection";
import ContactSection from "@/features/home/components/ContactSection";
import Footer from "@/features/home/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Accueil */}
        <section id="accueil" className="scroll-mt-20">
          <Hero />
        </section>

        {/* À propos */}
        <AboutSection />

        {/* Recensement */}
        <RecensementSection />

        {/* Établissements */}
        <EstablishmentsSection />

        {/* Statistiques */}
        <StatisticsSection />

        {/* Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}