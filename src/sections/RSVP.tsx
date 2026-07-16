import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import RSVPForm from "../components/RSVPForm";

export default function RSVP() {
  return (
    <AnimatedSection>
      <section className="relative overflow-hidden section-padding pb-28 flex flex-col gap-3">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-3xl" />

        <SectionTitle
          subtitle="R S V P"
          title="Келетініңізді растаңыз"
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="glass mx-auto max-w-md rounded-[36px] p-8"
        >
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#d4af37]/10 blur-3xl" />

          <div className="relative z-10 mb-8 text-center flex flex-col p-10 gap-3">
            <p className="font-cormorant italic mb-3 uppercase tracking-[5px] text-[#d4af37]">
              RSVP
            </p>

            <h3 className="font-cormorant italic text-3xl text-[#1f1f1f]">
              Құрметпен жауабыңызды күтеміз
            </h3>

            <p className="font-cormorant italic mt-4 text-sm leading-7 text-neutral-500">
              Қуанышымызды бірге бөлісу үшін
              қатысу мәртебеңізді белгілеңіз.
            </p>
          </div>

          <RSVPForm />
        </motion.div>
      </section>
    </AnimatedSection>
  );
}