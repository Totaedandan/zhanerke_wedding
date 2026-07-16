import { motion } from "framer-motion";

const text =
  "✦ ҚЫЗ ҰЗАТУ ✦ АЙДАНА ✦ ҚОШ КЕЛДІҢІЗ ✦ 2026 ✦ ";

export default function DecorativeMarquee() {
  return (
    <section className="overflow-hidden py-10">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        <span className="font-kz-1 px-4 text-4xl text-[#d4af37]/70">
          {text}
        </span>

        <span className="font-kz-1 px-4 text-4xl text-[#d4af37]/70">
          {text}
        </span>

        <span className="font-kz-1 px-4 text-4xl text-[#d4af37]/70">
          {text}
        </span>
      </motion.div>
    </section>
  );
}