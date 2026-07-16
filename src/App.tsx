import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

import Hero from "./sections/Hero";
import Welcome from "./sections/Welcome";
import Story from "./sections/Story";
import Timeline from "./sections/Timeline";
import CountdownSection from "./sections/CountdownSection";
import Gallery from "./sections/Gallery";
import Wishes from "./sections/Wishes";
import RSVP from "./sections/RSVP";
import DecorativeDivider from "./sections/DecorativeDivider";
import BridePhoto from "./sections/BridePhoto";

function App() {

  return (
    <>
      <MusicPlayer />
      
        <Hero />

        <Welcome />

        <Story />

        <BridePhoto />

        <Timeline />

        <DecorativeDivider />

        <Gallery />

        <DecorativeDivider />

        <Wishes />

        <DecorativeDivider />

        <CountdownSection />

        <RSVP />

        <Footer />

    </>
  );
}

export default App;