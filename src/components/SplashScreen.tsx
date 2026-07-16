import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface SplashScreenProps {
  visible: boolean;
  onOpen: () => void;
}

export default function SplashScreen({
  visible,
  onOpen,
}: SplashScreenProps) {
  const [stage, setStage] = useState<"idle" | "breaking" | "opening" | "flash">(
    "idle"
  );
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = () => {
    if (stage !== "idle") return;
    setStage("breaking");

    if (prefersReducedMotion) {
      window.setTimeout(() => setStage("opening"), 200);
      window.setTimeout(() => setStage("flash"), 500);
      window.setTimeout(() => onOpen(), 800);
      return;
    }

    // Печать ломается
    window.setTimeout(() => setStage("opening"), 650);
    // Конверт раскрывается (медленно, объёмно), вспышка вступает раньше — пока створки ещё в движении
    window.setTimeout(() => setStage("flash"), 950);
    // Белая вспышка укрывает сцену, затем открывается страница
    window.setTimeout(() => onOpen(), 1850);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-white"
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: "easeInOut" },
          }}
        >
          {/* Орнаментальные уголки рамки сцены */}
          <motion.div
            animate={{ opacity: stage === "idle" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Corner className="left-6 top-6" />
            <Corner className="right-6 top-6 -scale-x-100" />
            <Corner className="bottom-6 left-6 -scale-y-100" />
            <Corner className="bottom-6 right-6 -scale-x-100 -scale-y-100" />
          </motion.div>

          <div className="relative" style={{ perspective: "3200px" }}>
            {/* Тень открытки на полу сцены */}
            <motion.div
              className="absolute left-1/2 top-full h-8 w-64 -translate-x-1/2 rounded-full bg-[#2a1d14]/15 blur-2xl"
              animate={
                stage === "idle"
                  ? { scaleX: [1, 0.85, 1], opacity: [0.5, 0.35, 0.5] }
                  : { opacity: 0 }
              }
              transition={
                stage === "idle"
                  ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.6 }
              }
            />

            {/* ===== КОНВЕРТ ===== */}
            <motion.div
              initial={{ y: 70, opacity: 0, scale: 0.94 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: stage === "flash" ? 1.04 : 1,
                rotateX: stage === "opening" || stage === "flash" ? 6 : 0,
                rotate:
                  stage === "opening" || stage === "flash" ? -1.5 : 0,
              }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
                rotate: { duration: 2, ease: "easeInOut" },
                rotateX: { duration: 2, ease: "easeInOut" },
                scale: { duration: 1.4, ease: "easeInOut" },
              }}
              className="relative h-[440px] w-[320px] rounded-[6px]"
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(155deg, #fffdf7 0%, #fbf5e7 55%, #f6ecd6 100%)",
                boxShadow:
                  "0 4px 0 rgba(140,107,46,0.18), 0 50px 90px -20px rgba(42,29,20,0.35), inset 0 0 0 1px rgba(140,107,46,0.18)",
              }}
            >
              {/* Тонкая золотая рамка-паспарту */}
              <div className="pointer-events-none absolute inset-[10px] rounded-[3px] border border-[#c9a24b]/35" />
              <div className="pointer-events-none absolute inset-[10px] rounded-[3px] [background:repeating-linear-gradient(135deg,transparent_0,transparent_6px,rgba(201,162,75,0.05)_6px,rgba(201,162,75,0.05)_7px)]" />

              {/* Боковые швы конверта */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 320 440"
                fill="none"
              >
                <path
                  d="M0 0 L160 230 L320 0"
                  stroke="#c9a24b"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <path
                  d="M0 440 L160 230 L320 440"
                  stroke="#c9a24b"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
              </svg>

              {/* ===== Текст-приглашение, виден до открытия ===== */}
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center px-10 text-center"
                animate={{
                  opacity: stage === "idle" ? 1 : 0,
                  filter: stage === "idle" ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.7 }}
                  className="font-cormorant mb-5 text-[11px] uppercase tracking-[6px] text-[#a9802f]"
                >
                  Шақыру
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.85, ease: "easeOut" }}
                  className="font-kz-1 text-[2.6rem] font-semibold leading-[1.05] text-[#2a1d14]"
                >
                  Қыз
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.85, ease: "easeOut" }}
                  className="font-kz-1 text-[2.6rem] font-semibold leading-[1.05] text-[#2a1d14]"
                >
                  Ұзату
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.35, duration: 0.8, ease: "easeOut" }}
                  className="my-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#c9a24b] to-transparent"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.7 }}
                  className="font-cormorant text-[13px] leading-relaxed text-[#7a6a52]"
                >
                  Ашу үшін мөрді басыңыз
                </motion.p>
              </motion.div>

              {/* ===== Створки конверта, раскрываются книгой ===== */}
              <EnvelopeFlap side="left" stage={stage} />
              <EnvelopeFlap side="right" stage={stage} />

              {/* Золотое сияние из щели по центру при раскрытии */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(ellipse 60px 220px at center, rgba(255,236,180,0.9), rgba(255,236,180,0) 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity:
                    stage === "opening" ? [0, 1, 0.7] : stage === "flash" ? 1 : 0,
                  scaleX:
                    stage === "opening" ? [1, 16, 26] : stage === "flash" ? 30 : 1,
                }}
                transition={{ duration: stage === "opening" ? 1.9 : 0.6, ease: "easeIn" }}
              />

              {/* ===== Восковая печать ===== */}
              <motion.button
                type="button"
                onClick={handleOpen}
                aria-label="Ашу"
                disabled={stage !== "idle"}
                className="absolute bottom-[42px] left-1/2 z-50 -translate-x-1/2"
                whileHover={stage === "idle" ? { scale: 1.06 } : undefined}
                whileTap={stage === "idle" ? { scale: 0.92 } : undefined}
                animate={
                  stage === "breaking"
                    ? { scale: [1, 1.12, 0], opacity: [1, 1, 0], rotate: [0, -6, 14] }
                    : stage === "idle"
                    ? { scale: 1, opacity: 1, y: [0, -3, 0] }
                    : { scale: 0, opacity: 0 }
                }
                transition={
                  stage === "breaking"
                    ? { duration: 0.5, ease: "easeIn" }
                    : stage === "idle"
                    ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.01 }
                }
              >
                <WaxSeal cracked={stage !== "idle"} />
              </motion.button>
            </motion.div>
          </div>

          {/* ===== Белая вспышка, синхронизированная с раскрытием ===== */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[60] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "flash" ? 1 : 0 }}
            transition={{
              duration: stage === "flash" ? 1.6 : 0.3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EnvelopeFlap({
  side,
  stage,
}: {
  side: "left" | "right";
  stage: "idle" | "breaking" | "opening" | "flash";
}) {
  const isLeft = side === "left";
  const open = stage === "opening" || stage === "flash";

  return (
    <motion.div
      className="absolute top-0 z-20 h-full w-1/2 overflow-hidden"
      style={{
        left: isLeft ? 0 : "50%",
        transformOrigin: isLeft ? "left center" : "right center",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateY: open ? (isLeft ? -115 : 115) : 0,
      }}
      transition={{
        duration: 1.9,
        delay: isLeft ? 0.05 : 0.18,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            isLeft
              ? "linear-gradient(100deg, #fffdf7 0%, #fbf3e2 75%, #f3e6c9 100%)"
              : "linear-gradient(260deg, #fffdf7 0%, #fbf3e2 75%, #f3e6c9 100%)",
        }}
      />
      <div
        className="absolute inset-y-0"
        style={{
          width: "1px",
          left: isLeft ? "auto" : 0,
          right: isLeft ? 0 : "auto",
          background:
            "linear-gradient(180deg, transparent, rgba(140,107,46,0.35), transparent)",
        }}
      />
      {/* Внутренняя сторона клапана — видна при раскрытии */}
      <div
        className="absolute inset-0"
        style={{
          background: "#f1e3c4",
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      />
    </motion.div>
  );
}

function WaxSeal({ cracked }: { cracked: boolean }) {
  return (
    <div className="relative flex h-[72px] w-[72px] items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-[0_14px_22px_rgba(140,59,46,0.45)]"
      >
        <defs>
          <radialGradient id="waxGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#b5503f" />
            <stop offset="55%" stopColor="#8c3b2e" />
            <stop offset="100%" stopColor="#6e2c22" />
          </radialGradient>
        </defs>
        <path
          d="M50 4 C58 4 60 12 67 11 C74 10 78 17 76 23 C82 27 84 35 79 40 C84 46 82 55 76 58 C78 65 73 72 66 71 C64 79 56 82 50 78 C44 82 36 79 34 71 C27 72 22 65 24 58 C18 55 16 46 21 40 C16 35 18 27 24 23 C22 17 26 10 33 11 C40 12 42 4 50 4 Z"
          fill="url(#waxGrad)"
        />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="30"
          fill="#e7c98f"
          opacity="0.9"
        >
          
        </text>
        <ellipse
          cx="38"
          cy="28"
          rx="14"
          ry="8"
          fill="#ffffff"
          opacity="0.12"
        />
      </svg>

      {cracked && (
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <motion.path
            d="M50 10 L46 38 L58 50 L42 62 L52 90"
            stroke="#4a1c14"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <motion.path
            d="M30 40 L46 38 M58 50 L74 46"
            stroke="#4a1c14"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
          />
        </motion.svg>
      )}
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`pointer-events-none absolute h-12 w-12 text-[#c9a24b]/45 ${className}`}
      fill="none"
    >
      <path
        d="M2 2 L2 22 M2 2 L22 2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2 2 Q 2 16 16 16"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}