import { motion } from "framer-motion";

export default function FloatingGlow() {
  return (
    <>
      <motion.div
        className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-3xl"
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#e9e5dc] blur-3xl"
        animate={{
          y: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-0 top-1/2 h-32 w-32 rounded-full bg-[#d4af37]/5 blur-3xl"
        animate={{
          x: [-10, 20, -10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}