import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import Countdown from "../components/Countdown";
import { eventData } from "../data/eventData";

export default function CountdownSection() {
  return (
    <AnimatedSection>
      <section className="section-padding">
        <SectionTitle
          subtitle="Қалған уакыт"
          title="Мерекеге дейін"
        />

        <Countdown
          targetDate={eventData.countdownDate}
        />
      </section>
    </AnimatedSection>
  );
}