import MotionProvider from "@/components/ui/MotionProvider";
import Header from "@/components/wedding/Header";
import Hero from "@/components/wedding/Hero";
import Couple from "@/components/wedding/Couple";
import Family from "@/components/wedding/Family";
import Story from "@/components/wedding/Story";
import Events from "@/components/wedding/Events";
import Countdown from "@/components/wedding/Countdown";
import Venue from "@/components/wedding/Venue";
import Gallery from "@/components/wedding/Gallery";
import Closing from "@/components/wedding/Closing";
import MusicToggle from "@/components/wedding/MusicToggle";
import InvitationExperience from "@/components/wedding/InvitationExperience";
import NatureAtmosphere from "@/components/wedding/NatureAtmosphere";
import MotionToggle from "@/components/wedding/MotionToggle";
import SceneBridge from "@/components/wedding/SceneBridge";
import { weddingConfig as config } from "@/config/wedding";

export default function Home() {
  return (
    <MotionProvider>
      <InvitationExperience>
        <a className="skip-link" href="#main">
          Skip to invitation
        </a>
        <Header />
        <main id="main">
          <Hero />
          <SceneBridge label={config.experience.chapterLabels[0]} />
          <Couple />
          <Family />
          <SceneBridge label={config.experience.chapterLabels[1]} />
          <Story />
          <SceneBridge
            label={config.experience.chapterLabels[2]}
            variant="rose"
          />
          <Events />
          <Countdown />
          <Venue />
          <Gallery />
          <Closing />
        </main>
        <MusicToggle />
        <MotionToggle />
        <NatureAtmosphere />
      </InvitationExperience>
    </MotionProvider>
  );
}
