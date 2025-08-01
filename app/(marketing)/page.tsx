import Ciencia from "../components/landing/ciencia";
import Gratis from "../components/landing/gratis";
import Hero from "../components/landing/hero";
import { Footer } from "../components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative pb-20 pt-20">
        {/* Hero Section */}
        <section className="relative">
          <Hero />
        </section>

        {/* Gratis Section */}
        <section className="relative">
          <Gratis />
        </section>

        {/* Ciencia Section */}
        <section className="relative">
          <Ciencia />
        </section>
      </main>

      {/* Footer fixo */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
  );
}
