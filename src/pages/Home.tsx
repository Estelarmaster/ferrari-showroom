import { Hero } from "../sections/Hero";
import { Models } from "../sections/Models";
import { Performance } from "../sections/Performance";
import { EngineSection } from "../sections/EngineSection";
import { InteriorSection } from "../sections/InteriorSection";
import { Configurator } from "../sections/Configurator";
import { SoundExperience } from "../sections/SoundExperience";
import { Dealers } from "../sections/Dealers";
import { Contact } from "../sections/Contact";
import { SystemCheck } from "../sections/SystemCheck";
import { Footer } from "../components/ui/Footer";

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Models />
      <Performance />
      <EngineSection />
      <InteriorSection />
      <Configurator />
      <SoundExperience />
      <Dealers />
      <Contact />
      <SystemCheck />
      <Footer />
    </main>
  );
}
