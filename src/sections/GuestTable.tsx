import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import { motion } from "framer-motion";

interface TableData {
  id: number;
  name: string;
  x: number;
  y: number;
  seats: number;
}

const tables: TableData[] = [
  { id: 1, name: "Нағашы", x: 18, y: 35, seats: 8 },
  { id: 2, name: "Туыстар", x: 50, y: 26, seats: 8 },
  { id: 3, name: "Құдалар", x: 82, y: 35, seats: 8 },
  { id: 4, name: "Әпке-сіңлілер", x: 18, y: 54, seats: 8 },
  { id: 5, name: "Аға-бауырлар", x: 82, y: 54, seats: 8 },
  { id: 6, name: "Достар", x: 18, y: 74, seats: 7 },
  { id: 7, name: "Сыныптастар", x: 35, y: 92, seats: 7 },
  { id: 8, name: "Одногруппники", x: 69, y: 92, seats: 7 },
  { id: 9, name: "Көршілер", x: 82, y: 74, seats: 7 },
];

export default function GuestTable() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedTable = tables.find((t) => t.id === selected);

  return (
    <AnimatedSection>
      <section className="relative section-padding overflow-hidden">
        <SectionTitle subtitle="Table" title="Кім болып келесіз?" />


        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() =>
                setSelected(selected === table.id ? null : table.id)
              }
              className={`font-cormorant rounded-full px-4 py-2 text-xs font-medium transition duration-300 ${
                selected === table.id
                  ? "bg-[#d4af37] text-white shadow-lg"
                  : "glass text-neutral-600"
              }`}
            >
              {table.name}
            </button>
          ))}
        </div>

        <div className="glass overflow-hidden rounded-[32px] p-1 sm:p-8">
          <div
            className="relative mx-auto w-full h-150 overflow-hidden rounded-[24px]"
            style={{
              maxWidth: 640,
              aspectRatio: "10 / 11",
              background:
                "repeating-linear-gradient(90deg, #f3ead4 0px, #f3ead4 22px, #efe3c8 22px, #efe3c8 24px)",
              boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.25)",
            }}
          >
            {/* Стена сверху, за молодожёнами */}
            <div
              className="absolute left-[8%] right-[8%] top-0 h-2 rounded-b-full"
              style={{ background: "rgba(42,29,20,0.12)" }}
            />

            {/* Стол молодожёнов */}
            <div
              className="absolute flex -translate-x-1/2 flex-col items-center"
              style={{ left: "50%", top: "8%" }}
            >
              <div className="flex items-center gap-3">
                <CoupleIcon type="groom" />
                <div
                  className="flex h-12 w-40 items-center justify-center rounded-xl border-2 border-[#d4af37] bg-[#fffdf5] shadow-[0_8px_24px_rgba(212,175,55,0.3)] sm:h-14 sm:w-48"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[3px] text-[#a9802f] sm:text-xs">
                    Жас жұбайлар
                  </span>
                </div>
                <CoupleIcon type="bride" />
              </div>
              {/* Стулья президиума */}
              <div className="mt-1 flex w-40 justify-between px-2 sm:w-48">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#c9a24b]/50"
                  />
                ))}
              </div>
            </div>

            {/* Гостевые столы */}
            {tables.map((table) => (
              <RoundTable
                key={table.id}
                table={table}
                active={selected === table.id}
                onClick={() =>
                  setSelected(selected === table.id ? null : table.id)
                }
              />
            ))}

            {/* Вход */}
            <div
              className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center pb-2"
              style={{ width: "26%" }}
            >
              <div className="h-1 w-full rounded-t-full bg-[#2a1d14]/15" />
              <span className="mt-1.5 text-[10px] uppercase tracking-[3px] text-neutral-400">
                Кіреберіс
              </span>
            </div>
          </div>
        </div>

        {selectedTable && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-neutral-500">Сіздің үстеліңіз</p>
            <h3 className="mt-2 text-4xl text-[#d4af37]">
              №{selectedTable.id}
            </h3>
            <p className="mt-2 text-neutral-600">{selectedTable.name}</p>
          </motion.div>
        )}
      </section>
    </AnimatedSection>
  );
}

function RoundTable({
  table,
  active,
  onClick,
}: {
  table: TableData;
  active: boolean;
  onClick: () => void;
}) {
  const size = table.seats >= 10 ? 76 : 64;
  const chairCount = table.seats;
  const radius = size / 2 + 9;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${table.x}%`, top: `${table.y}%` }}
      animate={{ scale: active ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative"
        style={{ width: size + radius * 0.5, height: size + radius * 0.5 }}
      >
        {/* Стулья по кругу */}
        {Array.from({ length: chairCount }).map((_, i) => {
          const angle = (i / chairCount) * 2 * Math.PI - Math.PI / 2;
          const cx = radius * Math.cos(angle);
          const cy = radius * Math.sin(angle);
          return (
            <span
              key={i}
              className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-[3px] transition-colors ${
                active ? "bg-[#d4af37]" : "bg-[#c9a24b]/45"
              }`}
              style={{
                left: `calc(50% + ${cx}px)`,
                top: `calc(50% + ${cy}px)`,
              }}
            />
          );
        })}

        {/* Столешница */}
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border transition-all duration-300 ${
            active
              ? "border-[#d4af37] bg-[#d4af37] text-white shadow-[0_0_30px_rgba(212,175,55,0.45)]"
              : "border-[#c9a24b]/40 bg-white/90 text-[#2a1d14]"
          }`}
          style={{ width: size, height: size }}
        >
          <span className="text-base font-semibold sm:text-lg">
            {table.id}
          </span>
          <span
            className={`px-1 text-center text-[8px] leading-tight sm:text-[9px] ${
              active ? "text-white/90" : "text-neutral-500"
            }`}
          >
            {table.name}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function CoupleIcon({ type }: { type: "groom" | "bride" }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fffdf5] shadow-[0_6px_16px_rgba(212,175,55,0.35)] ring-2 ring-[#d4af37]/60 sm:h-11 sm:w-11">
      {type === "groom" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#8c3b2e] sm:h-6 sm:w-6" fill="none">
          <circle cx="12" cy="7" r="3.2" fill="currentColor" />
          <path
            d="M5 21c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M9.5 14.3 L12 17 L14.5 14.3"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#8c3b2e] sm:h-6 sm:w-6" fill="none">
          <path
            d="M12 3.2c-3.6 4-3.6 8 0 9.8 3.6-1.8 3.6-5.8 0-9.8Z"
            fill="currentColor"
          />
          <circle cx="12" cy="8.4" r="2.6" fill="currentColor" />
          <path
            d="M5.5 21c0-3.8 3-6.6 6.5-6.6s6.5 2.8 6.5 6.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}