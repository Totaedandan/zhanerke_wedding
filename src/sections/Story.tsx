import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";
import oyuImg from "../assets/oyu_circle.png";


export default function Story() {
  return (
    <AnimatedSection>
      <section className="relative section-padding overflow-hidden">
        <SectionTitle
          subtitle="Қыз ұзату"
          title="Салтанат туралы"
        />

        {/* absolute image */}
        <motion.img
        src={oyuImg}
        alt="decoration"
        animate={{
            rotate: 360,
        }}
        transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
        }}
        className="
            absolute
            left-1/2
            -z-20
            w-94
            opacity-60
            pointer-events-none
            select-none
            md:w-80
            lg:w-96
        "
        />

        <div className="space-y-6">
          {eventData.story.map((text, index) => (
            <motion.div
              key={index}
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
                delay: index * 0.2,
              }}
              className="glass rounded-[30px] p-8"
            >
              <p className="font-cormorant italic text-lg leading-8 text-neutral-700">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}