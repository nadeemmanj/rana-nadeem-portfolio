// Home page: composes all sections in order, each wrapped in <Reveal>
// with a slight stagger. (Navbar/Footer/BackToTop/ChatWidget/Particles/
// MouseGlow are mounted in app/layout.jsx by Agent 1.)
import Reveal from "../components/Reveal";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className=" text-[#e8eefc]">
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal delay={80}>
        <About />
      </Reveal>
      <Reveal delay={80}>
        <Experience />
      </Reveal>
      <Reveal delay={80}>
        <Services />
      </Reveal>
      <Reveal delay={80}>
        <Skills />
      </Reveal>
      <Reveal delay={80}>
        <Portfolio />
      </Reveal>
      <Reveal delay={80}>
        <Certificates />
      </Reveal>
      <Reveal delay={80}>
        <Contact />
      </Reveal>
    </main>
  );
}
