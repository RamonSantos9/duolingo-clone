import Ciencia from "../components/landing/ciencia";
import Gratis from "../components/landing/gratis";
import Hero from "../components/landing/hero";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Gratis />
        <Ciencia />
      </main>
    </>
  );
}
