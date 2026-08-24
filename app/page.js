import Nav from "../components/Nav";
import ScrollProgress from "../components/ScrollProgress";
import Hero from "../components/Hero";
import Nosotros from "../components/Nosotros";
import Servicios from "../components/Servicios";
import PorQueElegirnos from "../components/PorQueElegirnos";
import Proyectos from "../components/Proyectos";
import TrabajaConNosotros from "../components/TrabajaConNosotros";
import FAQ from "../components/FAQ";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Nosotros />
        <Servicios />
        <PorQueElegirnos />
        <Proyectos />
        <TrabajaConNosotros />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
