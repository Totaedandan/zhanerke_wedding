import { motion } from "framer-motion";

import oyuImg from "../assets/oyu_circle.png";


export default function Footer() {
  return (
    <footer className="relative pb-12 pt-6 text-center overflow-hidden">
      <div className="mx-auto mb-5 h-px w-16 bg-[#d4af37]" />

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
            left-21
            top-70
            z-0
            -translate-x-[80px]
            -translate-y-1/2
            w-94
            opacity-60
            pointer-events-none
            select-none
            md:w-80
            lg:w-96
        "
        />

      <p className="font-kz-1 text-3xl text-[#1f1f1f]">
        Қыз ұзату
      </p>

      <p className="font-cormorant italic mt-2 text-xl text-neutral-500">
        2026
      </p>
    </footer>
  );
}