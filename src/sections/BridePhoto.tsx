import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bride from "../assets/secondKorkemay.webp";

export default function BridePhoto() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Параллакс
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Глубина
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative h-100 overflow-hidden"
    >
      {/* Фото */}
      <motion.img
        src={bride}
        alt=""
        style={{ y, scale }}
        className="absolute h-full w-full object-cover object-[center_30%]"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Глубина */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Рваный верх */}
      <svg
        className="absolute top-0 left-0 z-20 w-full rotate-180"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        >
        <path
            fill="#ffffff"
            d="
            M0,20
            C40,35 80,10 120,28
            C170,50 220,15 280,35
            C340,55 400,20 470,42
            C540,60 610,25 690,40
            C760,55 830,18 910,38
            C1000,60 1080,22 1170,45
            C1260,65 1340,30 1440,50
            L1440,120
            L0,120
            Z
            "
        />
        </svg>

      {/* Рваный низ */}
      <svg
        className="absolute -bottom-2 left-0 z-20 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        >
        <path
            fill="#ffffff"
            d="
            M0,20
            C40,35 80,10 120,28
            C170,50 220,15 280,35
            C340,55 400,20 470,42
            C540,60 610,25 690,40
            C760,55 830,18 910,38
            C1000,60 1080,22 1170,45
            C1260,65 1340,30 1440,50
            L1440,120
            L0,120
            Z
            "
        />
        </svg>
    </section>
  );
}