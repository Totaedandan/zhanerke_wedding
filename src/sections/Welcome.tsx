import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { eventData } from "../data/eventData";
import oyuImg from "../assets/oyu_circle.png";

/* ---------- Декоративные SVG-элементы ---------- */

function Dove({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 30c8-2 14-8 18-16 2 6 1 12-2 16 10-2 18 2 24 10-8-1-14 1-18 5 6 2 10 6 12 11-9-4-17-4-24-1-6 2-11 7-13 13-1-8 1-15 5-20-7-1-13-5-17-11 6 1 10 0 13-3-6-1-11-4-14-8 6 1 11 0 16-4-2-6-2-6 0 8z"
        fill="#d4af37"
        fillOpacity="0.16"
      />
      <path
        d="M6 28c9 0 17-5 21-13 1 6-1 12-5 16 9-3 18 0 25 7-8 0-14 3-17 7 6 1 11 4 14 9-9-3-17-2-23 2-5 3-9 8-10 14-2-8-1-16 3-21-7 0-14-3-18-8 6 0 11-2 14-6-6 0-11-3-14-7z"
        stroke="#b8922e"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="30"
        y1="14"
        x2="30"
        y2="46"
        stroke="#b8922e"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />
      <g className="butterfly-wing-left">
        <path
          d="M30 20C22 8 8 8 5 16c-3 8 8 14 25 8z"
          fill="#d4af37"
          fillOpacity="0.22"
          stroke="#b8922e"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </g>
      <g className="butterfly-wing-right">
        <path
          d="M30 20C38 8 52 8 55 16c3 8-8 14-25 8z"
          fill="#d4af37"
          fillOpacity="0.22"
          stroke="#b8922e"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </g>
      <g className="butterfly-wing-left">
        <path
          d="M30 28C24 38 14 42 10 38c-4-4 2-12 20-10z"
          fill="#d4af37"
          fillOpacity="0.16"
          stroke="#b8922e"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </g>
      <g className="butterfly-wing-right">
        <path
          d="M30 28C36 38 46 42 50 38c4-4-2-12-20-10z"
          fill="#d4af37"
          fillOpacity="0.16"
          stroke="#b8922e"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </g>
    </svg>
  );
}

function FlowerSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 55C30 40 22 34 10 30"
        stroke="#b8922e"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g transform="translate(28,10)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-6"
            rx="4"
            ry="7"
            fill="#d4af37"
            fillOpacity="0.28"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="3" fill="#b8922e" fillOpacity="0.6" />
      </g>
      <g transform="translate(12,32)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-4"
            rx="2.6"
            ry="4.5"
            fill="#d4af37"
            fillOpacity="0.24"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2" fill="#b8922e" fillOpacity="0.55" />
      </g>
    </svg>
  );
}

/* ---------- Основной компонент ---------- */

export default function Welcome() {
  return (
    <AnimatedSection>
      <section className="relative overflow-hidden bg-white px-6 py-16">
        {/* Вращающийся орнамент */}
        <motion.img
          src={oyuImg}
          alt="decoration"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="
            absolute
            -left-20
            top-60
            z-0
            -translate-x-[80px]
            -translate-y-1/2
            w-64
            opacity-60
            pointer-events-none
            select-none
            md:w-80
            lg:w-96
          "
        />

        {/* Голубки в верхних углах */}
        <Dove className="decor-float-slow pointer-events-none absolute -top-2 left-2 h-16 w-16 select-none opacity-80 sm:left-6" />
        <Dove className="decor-float-slow-reverse pointer-events-none absolute -top-2 right-2 h-16 w-16 -scale-x-100 select-none opacity-80 sm:right-6" />

        {/* Бабочки по бокам */}
        <Butterfly className="decor-butterfly pointer-events-none absolute left-1 top-[46%] h-14 w-14 select-none opacity-90 sm:left-4" />
        <Butterfly className="decor-butterfly-reverse pointer-events-none absolute right-1 top-[40%] h-12 w-12 -scale-x-100 select-none opacity-90 sm:right-4" />

        {/* Цветы у нижнего блока */}
        <FlowerSprig className="decor-sway pointer-events-none absolute bottom-4 left-3 h-14 w-14 select-none opacity-70 sm:left-8" />
        <FlowerSprig className="decor-sway-reverse pointer-events-none absolute bottom-4 right-3 h-14 w-14 -scale-x-100 select-none opacity-70 sm:right-8" />

        <div className="relative z-10 mx-auto max-w-xl text-center">
          <SectionTitle subtitle="Қош келдіңіз" title="Құрметті қонақтар" />

          {/* Приветственный текст */}
          <p className="font-cormorant italic font-light mt-6 text-xl leading-9 text-[#1f1f1f]">
            Сіздерді аяулы қызымыздың
            <br />
            «Қыз ұзату» салтанатына
          </p>

          {/* Дата */}
          <p className="font-cormorant uppercase italic mt-4 text-3xl font-semibold text-[#1f1f1f]">
            {eventData.date}
          </p>

          {/* Адрес */}
          <p className="font-cormorant italic font-semibold mt-6 text-xl leading-8 text-[#b8922e]">
            {eventData.venue.address}
          </p>
          <p className="font-cormorant italic text-xl font-light leading-8 text-neutral-700">
            мекенжайында орналасқан
          </p>

          {/* Название */}
          <p className="font-cormorant italic text-2xl font-semibold text-[#b8922e]">
            «{eventData.venue.name}» 
            <span className="text-xl text-neutral-700"> тойханасында</span>
          </p>

          {/* Приглашение */}
          <p className="font-cormorant italic font-light text-xl leading-9 text-[#1f1f1f]">
            өтетін қызымыздың қыз ұзату тойына
            <br />
            қадірлі қонaғы болуға шақырамыз
          </p>

          {/* блок */}
          <div className="venue-gradient-card border-1 mt-10 overflow-hidden rounded-[28px] border-white p-8 shadow-[0_5px_20px_rgba(212,175,55,0.25)]">
            <p className="font-cormorant italic text-2xl font-semibold text-[#1f1f1f]">
              «{eventData.venue.name}» тойханасы
            </p>

            <div className="mx-auto my-4 h-px w-16 bg-[#b8922e]/50" />

            <div className="flex items-center justify-center gap-2">
              <FiCalendar size={22} className="text-[#b8922e]" />
              <p className="font-cormorant italic text-xl text-[#1f1f1f]">
                {eventData.date}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              <FiClock size={20} className="text-[#b8922e]" />
              <p className="font-cormorant italic text-xl text-[#1f1f1f]">
                {eventData.time}
              </p>
            </div>

            
            <a href={eventData.venue.map}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-cormorant italic
                mt-7 inline-flex items-center justify-center gap-2
                rounded-full bg-[#1f1f1f]
                px-10 py-4
                text-lg font-semibold text-white
                transition
                hover:bg-[#b8922e]
              "
            >
              <FiMapPin size={20} />
              Картаны ашу
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .venue-gradient-card {
          background: linear-gradient(
            120deg,
            #ffffff 0%,
            #faf8f3 25%,
            #f0ebdb 50%,
            #faf7f0 75%,
            #ffffff 100%
          );
          background-size: 300% 300%;
          animation: venueGoldFlow 9s ease infinite;
        }

        @keyframes venueGoldFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes doveFloat {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(10px) rotate(2deg);
          }
        }

        .decor-float-slow {
          animation: doveFloat 7s ease-in-out infinite;
        }
        .decor-float-slow-reverse {
          animation: doveFloat 7s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        @keyframes butterflyDrift {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(4px, -10px) rotate(-4deg);
          }
          50% {
            transform: translate(-3px, -4px) rotate(3deg);
          }
          75% {
            transform: translate(3px, -14px) rotate(-2deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        .decor-butterfly {
          animation: butterflyDrift 5.5s ease-in-out infinite;
        }
        .decor-butterfly-reverse {
          animation: butterflyDrift 6.2s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        @keyframes wingFlapLeft {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.55);
          }
        }
        @keyframes wingFlapRight {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.55);
          }
        }

        .butterfly-wing-left {
          transform-origin: 30px 24px;
          animation: wingFlapLeft 0.6s ease-in-out infinite;
        }
        .butterfly-wing-right {
          transform-origin: 30px 24px;
          animation: wingFlapRight 0.6s ease-in-out infinite;
        }

        @keyframes flowerSway {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        .decor-sway {
          transform-origin: bottom center;
          animation: flowerSway 4.5s ease-in-out infinite;
        }
        .decor-sway-reverse {
          transform-origin: bottom center;
          animation: flowerSway 4.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        @media (prefers-reduced-motion: reduce) {
          .decor-float-slow,
          .decor-float-slow-reverse,
          .decor-butterfly,
          .decor-butterfly-reverse,
          .butterfly-wing-left,
          .butterfly-wing-right,
          .decor-sway,
          .decor-sway-reverse,
          .venue-gradient-card {
            animation: none;
          }
        }
      `}</style>
    </AnimatedSection>
  );
}
