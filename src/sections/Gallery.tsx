import { useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";

import image1 from "../assets/HeroKorkemay.webp";
import image2 from "../assets/secondKorkemay.webp";


// Пока что — две фотографии, продублированные до 10; остальные добавим позже
const images = [
  image1, image2, image1, image2, image1,
  image2, image1, image2, image1, image2,
];

// Размерные варианты карточек
const SIZE_VARIANTS = {
  normal: "h-64 w-80 sm:h-80 sm:w-[26rem]",
  wide: "h-64 w-96 sm:h-80 sm:w-[32rem]",
  tall: "h-72 w-60 sm:h-96 sm:w-72",
  small: "h-56 w-64 sm:h-64 sm:w-80",
} as const;

type SizeVariant = keyof typeof SIZE_VARIANTS;

interface ImageConfig {
  size?: SizeVariant;
  position?: string; // класс object-position, например "object-top"
}

// Точечные настройки для конкретных карточек (по индексу в массиве images, с 0)
// Всё, что не указано здесь — использует значения по умолчанию (normal / object-[center_30%])
const imageConfig: Record<number, ImageConfig> = {};

export default function Gallery() {
  return (
    <AnimatedSection>
      <section className="relative section-padding overflow-hidden">
        <SectionTitle subtitle="Естелік" title="Естелік сәттер" />

        <SwipeRow items={images} />
      </section>
    </AnimatedSection>
  );
}

function SwipeRow({ items }: { items: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  function handleScroll() {
    if (showHint) setShowHint(false);
  }

  return (
    <div className="relative -mx-6 sm:-mx-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f8f8f8] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f8f8f8] to-transparent sm:w-16" />

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((src, i) => (
          <MarqueeCard key={i} src={src} config={imageConfig[i]} />
        ))}
        <div className="shrink-0 w-1" />
      </div>

      <SwipeHint visible={showHint} />
    </div>
  );
}

function MarqueeCard({ src }: { src: string; config?: ImageConfig }) {
  return (
    <div className="relative mx-1.5 shrink-0 snap-center overflow-hidden rounded-[32px] sm:mx-2 h-72 sm:h-96">
      <img
        src={src}
        alt="Естелік сурет"
        draggable={false}
        loading="lazy"
        decoding="async"
        className="block h-[108%] w-auto max-w-[26rem] sm:max-w-[36rem] -translate-y-[4%] rounded-[32px] object-contain"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/5" />
    </div>
  );
}

function SwipeHint({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.4 }}
      className="mt-4 flex items-center justify-center gap-2 text-xs tracking-wide text-black/40"
    >
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 12h11m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 6v12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </motion.svg>
      <span>Жылжыту үшін сырғытыңыз</span>
    </motion.div>
  );
}