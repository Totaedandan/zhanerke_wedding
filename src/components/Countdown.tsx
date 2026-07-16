import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTime = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Күн", value: time.days },
    { label: "Сағат", value: time.hours },
    { label: "Мин", value: time.minutes },
    { label: "Сек", value: time.seconds },
  ];

  return (
    <div className="flex items-stretch justify-center gap-1.5 sm:gap-3">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center">
          <div
            className="
              relative flex flex-col items-center justify-center
              rounded-2xl px-3 py-4 sm:px-6 sm:py-6
              min-w-[68px] sm:min-w-[92px]
              bg-gradient-to-b from-white/70 to-white/40
              backdrop-blur-xl
              shadow-[0_8px_30px_-8px_rgba(212,175,55,0.25)]
              ring-1 ring-[#d4af37]/25
            "
          >
            {/* Тонкая золотая линия сверху */}
            <span className="absolute top-0 left-1/2 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />

            <AnimatePresence mode="popLayout">
              <motion.span
                key={item.value}
                initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant block text-3xl font-semibold tabular-nums leading-none text-[#1f1f1f] sm:text-5xl"
              >
                {String(item.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            <p className="mt-2.5 text-[10px] uppercase tracking-[3px] text-[#a9802f] sm:mt-3 sm:text-xs sm:tracking-[4px]">
              {item.label}
            </p>
          </div>

          {/* Разделитель между блоками, кроме последнего */}
          {i < items.length - 1 && (
            <span className="mx-1 self-center text-xl text-[#d4af37]/50 sm:mx-2 sm:text-2xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}