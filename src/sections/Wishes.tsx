import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";

function Butterfly({ size = 40 }: { size?: number }) {
  return (
    <motion.svg viewBox="0 0 60 40" width={size} height={size * 0.7} style={{ overflow: "visible" }}>
      <motion.path
        d="M30 20 C20 0, 0 0, 4 16 C6 26, 20 26, 30 20 Z"
        fill="rgba(212,175,55,0.85)"
        animate={{ scaleX: [1, 0.5, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "30px 20px" }}
      />
      <motion.path
        d="M30 20 C40 0, 60 0, 56 16 C54 26, 40 26, 30 20 Z"
        fill="rgba(212,175,55,0.85)"
        animate={{ scaleX: [1, 0.5, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "30px 20px" }}
      />
      <ellipse cx="30" cy="20" rx="2" ry="9" fill="#7a5c12" />
    </motion.svg>
  );
}

type FlightPath = {
  x: number[];
  y: number[];
  rotate: number[];
  size: number;
  delay: number;
};

const flightPaths: FlightPath[] = [
  // вверх-влево
  { x: [0, -30, -80, -160, -280], y: [0, -25, -55, -90, -150], rotate: [0, -15, -10, -18, -10], size: 36, delay: 0.3 },
  // вверх-вправо
  { x: [0, 30, 80, 160, 280], y: [0, -20, -50, -85, -150], rotate: [0, 15, 10, 18, 10], size: 42, delay: 0.45 },
  // вниз-вправо
  { x: [0, 25, 70, 130, 220], y: [0, 20, 45, 80, 140], rotate: [0, 12, -8, 14, 6], size: 30, delay: 0.55 },
  // вниз-влево
  { x: [0, -25, -60, -120, -210], y: [0, 15, 40, 75, 130], rotate: [0, -12, 8, -14, -6], size: 34, delay: 0.65 },
];

export default function Wishes() {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedSection>
      <section className="section-padding relative overflow-hidden">
        <SectionTitle subtitle="Тілек" title="Ізгі тілек" />

        <div className="relative mx-auto max-w-xl">
          {/* Бабочки — разлетаются в разные стороны */}
          <AnimatePresence>
            {open &&
              flightPaths.map((path, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-[92px] z-30 -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{
                    x: path.x,
                    y: path.y,
                    rotate: path.rotate,
                    scale: [0.6, 1, 1, 0.9, 0.6],
                    opacity: [1, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: path.delay,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.45, 0.75, 1],
                  }}
                >
                  <Butterfly size={path.size} />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Конверт */}
          <motion.button
            onClick={() => setOpen(true)}
            disabled={open}
            className="relative w-full"
            style={{ perspective: 1200 }}
            whileHover={!open ? { y: -4 } : {}}
            whileTap={!open ? { scale: 0.98 } : {}}
          >
            <div className="glass relative rounded-2xl h-[260px] sm:h-[300px]">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.08), transparent 60%)",
                }}
              />
              <svg className="absolute z-20 inset-0 h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="none">
                <polygon points="0,260 200,120 400,260" fill="rgb(255, 253, 243)" />
              </svg>

              <AnimatePresence>
                {!open && (
                  <motion.p
                    exit={{ opacity: 0 }}
                    className="absolute bottom-7 left-0 right-0 text-center font-cormorant italic text-lg text-neutral-500"
                  >
                    Хатты ашу үшін басыңыз
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Клапан конверта */}
              <motion.div
                className="absolute left-0 top-0 w-full origin-top"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: open ? -170 : 0 }}
                transition={{ duration: 0.9, ease: [0.45, 0, 0.2, 1] }}
              >
                <svg viewBox="0 0 400 150" className="w-full block" preserveAspectRatio="none">
                  <polygon
                    points="0,0 400,0 200,140"
                    fill="rgba(250,247,240,0.9)"
                    stroke="rgba(212,175,55,0.4)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* Восковая печать */}
              <AnimatePresence>
                {!open && (
                  <motion.div
                    exit={{ scale: 0, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 z-20
                               h-12 w-12 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      background: "radial-gradient(circle at 35% 30%, #d4af37, #9c7a23)",
                    }}
                  >
                    <span className="text-white text-lg font-cormorant">✦</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Открытка с текстом */}
              <motion.div
                initial={false}
                animate={open ? { y: -40, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ duration: 0.8, delay: open ? 0.5 : 0, ease: "easeOut" }}
                className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-14 z-10
                           glass rounded-xl flex items-center justify-center p-6 sm:p-10"
              >
                <p className="font-cormorant italic text-center text-lg sm:text-xl leading-8 text-neutral-700">
                  {eventData.wishes.split(". ").map((line, i) => (
                    <motion.span
                      key={i}
                      className="block"
                      initial={{ opacity: 0, y: 8 }}
                      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.6, delay: open ? 1 + i * 0.25 : 0 }}
                    >
                      {line.trim()}
                      {!line.trim().endsWith(".") ? "." : ""}
                    </motion.span>
                  ))}
                </p>
              </motion.div>
            </div>
          </motion.button>
        </div>
      </section>
    </AnimatedSection>
  );
} 