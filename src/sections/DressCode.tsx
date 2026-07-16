import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

export default function DressCode() {
  return (
    <AnimatedSection>
      <section className="section-padding">
        <SectionTitle
          subtitle="Dress Code"
          title="Ұсынылатын түстер"
        />

        <p className="font-cormorant italic mb-10 text-center text-neutral-700">
          Мерекелік кештің атмосферасын бірге
          қалыптастыру үшін төмендегі түстерді
          таңдауға кеңес береміз.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {eventData.dressCode.map((color, index) => (
            <motion.div
              key={color}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="glass flex h-20 w-20 items-center justify-center rounded-full"
            >
              <div
                className="h-12 w-12 rounded-full border border-white"
                style={{
                  backgroundColor: color,
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}