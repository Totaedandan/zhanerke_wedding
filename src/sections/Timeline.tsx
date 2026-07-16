import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

export default function Timeline() {
  return (
    <AnimatedSection>
      <section className="relative overflow-hidden section-padding">
        <SectionTitle
          subtitle="Мереке кестесі"
          title="Бағдарлама"
        />

        <div className="relative ml-5 border-l border-[#d4af37]/40">
          {eventData.timeline.map((item, index) => (
            <motion.div
              key={item.time}
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className="relative mb-10 pl-8"
            >
              <div className="absolute -left-[10px] top-2 h-5 w-5 rounded-full border-2 border-[#d4af37] bg-white" />

              <p className="mb-2 text-sm tracking-[3px] text-[#d4af37]">
                {item.time}
              </p>

              <div className="glass rounded-3xl p-5">
                <h3 className="font-cormorant italic text-xl text-[#1f1f1f]">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}