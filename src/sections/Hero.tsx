import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { eventData } from "../data/eventData";
import bgImage from "../assets/HeroKorkemay.webp";

// Плавная, «дорогая» кривая для входа элементов
// as const фиксирует тип как кортеж [number, number, number, number],
// который требует framer-motion для cubic-bezier easing
const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: EASE },
  },
};

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Более "тяжёлая" и кинематографичная пружина для параллакса
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });

  // Параллакс: фото двигается медленнее скролла — создаёт глубину
  const y = useTransform(smoothProgress, [0, 1], [0, 180]);
  // Лёгкое приближение в начале, плавно "отпускает" картинку
  const scale = useTransform(smoothProgress, [0, 1], [1.18, 1.02]);
  // Едва заметный поворот добавляет живости, не бросается в глаза
  const rotate = useTransform(smoothProgress, [0, 1], [0.6, 0]);
  // Затемнение усиливается при скролле — фото "уходит" под текст
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0, 0.35]);
  // Лёгкий blur на глубоких кадрах — имитация глубины резкости
  const blur = useTransform(smoothProgress, [0, 1], [0, 3]);
  const imgFilter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Верхнее фото */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/20" />

        <motion.img
          src={bgImage}
          alt=""
          initial={{ opacity: 0, scale: 1.25 }}
          animate={{ opacity: 1, scale: 1.18 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{
            y,
            scale,
            rotate,
            filter: imgFilter,
            willChange: "transform, filter",
            transform: "translateZ(0)",
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* динамическое затемнение при скролле — усиливает эффект глубины */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />

        {/* затемнение (статичное, для читаемости низа) */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 from-white/100" />

        {/* рваный низ — крупный, неравномерный, волокнистый разрыв */}
        <svg
          className="absolute bottom-0 left-0 w-full [transform:scaleY(-1)]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          {/* теневой слой */}
          <path
            fill="#000"
            opacity="0.08"
            transform="translate(0,10)"
            d="
              M0,0
              L0,96

              L32,82
              L54,84
              L76,58
              L98,62
              L126,42
              L156,20
              L182,10
              L206,28
              L236,46
              L266,48

              L294,76
              L316,110
              L338,104
              L362,98
              L392,90
              L426,84
              L452,70
              L472,82
              L498,58
              L530,30
              L564,18

              L596,36
              L624,58
              L648,78
              L690,78
              L716,118
              L754,118
              L786,118
              L814,98
              L842,100
              L868,84

              L894,92
              L914,126
              L954,114
              L984,118
              L1016,118
              L1046,102
              L1078,88
              L1110,92

              L1138,122
              L1182,112
              L1228,116
              L1266,118
              L1302,96
              L1336,108
              L1372,116
              L1410,110
              L1440,120

              L1440,0
              Z
            "
          />

          {/* белая бумага */}
          <path
            fill="#ffffff"
            d="
              M0,0
              L0,96

              L32,82
              L54,84
              L76,58
              L98,62
              L126,42
              L156,20
              L182,10
              L206,28
              L236,46
              L266,48

              L294,76
              L316,110
              L338,104
              L362,98
              L392,90
              L426,84
              L452,70
              L472,82
              L498,58
              L530,30
              L564,18

              L596,36
              L624,58
              L648,78
              L690,78
              L716,118
              L754,118
              L786,118
              L814,98
              L842,100
              L868,84

              L894,92
              L914,126
              L954,114
              L984,118
              L1016,118
              L1046,102
              L1078,88
              L1110,92

              L1138,122
              L1182,112
              L1228,116
              L1266,118
              L1302,96
              L1336,108
              L1372,116
              L1410,110
              L1440,120

              L1440,0
              Z
            "
          />
        </svg>
      </div>

      {/* Нижний контент */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 pb-20 pt-2 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="
            mx-auto flex items-center justify-center gap-3
            font-kz-1
            italic
            text-[45px]
            text-amber-900
          "
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="h-px w-8 origin-right bg-[#d4af37]/60"
          />
          {eventData.event}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="h-px w-8 origin-left bg-[#d4af37]/60"
          />
        </motion.p>

        <motion.h1
          variants={fadeUpBlur}
          className="
            font-kz-1
            text-7xl
            leading-[1.05]
            text-[#b8922e]
            drop-shadow-md
            md:text-7xl
          "
        >
          {eventData.bride}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          className="mx-auto my-4 h-px w-24 origin-center bg-[#d4af37]"
        />
      </motion.div>
    </section>
  );
}