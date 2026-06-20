import Hero from "./components/Hero";
import BrewingStrip from "./components/BrewingStrip";
import Featured from "./components/Featured";
import Loyalty from "./components/Loyalty";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BrewingStrip />
      <Featured />
      <Loyalty />
      <Contact />
    </>
  );
}
