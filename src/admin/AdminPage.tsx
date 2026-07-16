import { useEffect, useMemo, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import {
  FiDownload,
  FiUsers,
  FiSearch,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";

interface Guest {
  id: number;
  name: string;
  phone: string;
  status: string;
  created_at: string;
}

const STATUS_COMING = "Обязательно приду";
const STATUS_MAYBE = "Возможно приду";
const STATUS_NOT_COMING = "Не смогу прийти";

const FILTERS = [
  { key: "all", label: "Барлығы" },
  { key: STATUS_COMING, label: "Келеді" },
  { key: STATUS_MAYBE, label: "Мүмкін" },
  { key: STATUS_NOT_COMING, label: "Келмейді" },
] as const;

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    if (data) setGuests(data);
    setLoading(false);
  }

  async function exportExcel() {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Қонақтар");

    sheet.columns = [
      { header: "№", key: "id", width: 8 },
      { header: "Қонақ", key: "name", width: 35 },
      { header: "Телефон", key: "phone", width: 20 },
      { header: "Статус", key: "status", width: 28 },
      { header: "Тіркелген күні", key: "date", width: 24 },
    ];

    sheet.getRow(1).height = 28;

    sheet.getRow(1).font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
      size: 13,
    };

    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "D4AF37",
      },
    };

    sheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    sheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    guests.forEach((guest, index) => {
      const row = sheet.addRow({
        id: index + 1,
        name: guest.name,
        phone: guest.phone,
        status: guest.status,
        date: new Date(guest.created_at).toLocaleString("ru-RU"),
      });

      row.height = 24;

      row.alignment = {
        vertical: "middle",
      };

      row.eachCell((cell) => {
        cell.border = {
          top: {
            style: "thin",
            color: { argb: "DDDDDD" },
          },
          left: {
            style: "thin",
            color: { argb: "DDDDDD" },
          },
          bottom: {
            style: "thin",
            color: { argb: "DDDDDD" },
          },
          right: {
            style: "thin",
            color: { argb: "DDDDDD" },
          },
        };
      });

      if (guest.status === STATUS_COMING) {
        row.getCell("status").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "DFF6DD",
          },
        };
      }

      if (guest.status === STATUS_MAYBE) {
        row.getCell("status").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FFF4CC",
          },
        };
      }

      if (guest.status === STATUS_NOT_COMING) {
        row.getCell("status").fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FADBD8",
          },
        };
      }
    });

    sheet.autoFilter = {
      from: "A1",
      to: "E1",
    };

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer]),
      "Қонақтар.xlsx"
    );
  }

  const coming = guests.filter((g) => g.status === STATUS_COMING).length;
  const maybe = guests.filter((g) => g.status === STATUS_MAYBE).length;
  const notComing = guests.filter((g) => g.status === STATUS_NOT_COMING).length;

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const matchesFilter = filter === "all" || guest.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        guest.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        guest.phone.includes(query.trim());
      return matchesFilter && matchesQuery;
    });
  }, [guests, filter, query]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8] text-neutral-400">
        Жүктелуде...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] pb-28 sm:pb-10">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
        {/* Заголовок */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1.5 text-xs uppercase tracking-[5px] text-[#d4af37] sm:mb-2">
              Admin panel
            </p>
            <h1 className="text-2xl text-[#1f1f1f] sm:text-4xl">
              Қонақтар тізімі
            </h1>
          </div>

          <button
            onClick={exportExcel}
            className="hidden items-center justify-center gap-3 rounded-full bg-[#d4af37] px-6 py-3.5 text-white shadow-lg shadow-[#d4af37]/30 transition active:scale-95 sm:flex"
          >
            <FiDownload />
            Excel-ге жүктеу
          </button>
        </div>

        {/* Статистика */}
        <div className="mb-5 grid grid-cols-3 gap-2.5 sm:mb-6 sm:gap-4">
          <StatCard
            icon={<FiUsers size={18} className="text-[#d4af37]" />}
            label="Барлығы"
            value={guests.length}
          />
          <StatCard icon={<FiUsers size={18} className="text-[#d4af37]" />} label="Келеді" value={coming} valueClassName="text-green-600" />
          <StatCard icon={<FiUsers size={18} className="text-[#d4af37]" />} label="Мүмкін" value={maybe} valueClassName="text-amber-500" />
          <StatCard
            icon={<FiUsers size={18} className="text-[#d4af37]" />}
            label="Келмейді"
            value={notComing}
            valueClassName="text-red-600"
          />
        </div>

        {/* Поиск */}
        <div className="mb-3 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
          <FiSearch className="shrink-0 text-neutral-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Аты немесе телефон бойынша іздеу"
            className="w-full bg-transparent text-sm text-[#1f1f1f] outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Тазалау"
              className="shrink-0 text-neutral-400"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Фильтры */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 sm:mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                filter === f.key
                  ? "bg-[#1f1f1f] text-white"
                  : "bg-white text-neutral-500 ring-1 ring-black/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Список — карточки на мобильном */}
        <div className="space-y-2.5 sm:hidden">
          {filteredGuests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}

          {filteredGuests.length === 0 && (
            <EmptyState hasQuery={query !== "" || filter !== "all"} />
          )}
        </div>

        {/* Таблица на десктопе */}
        <div className="hidden overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 sm:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 text-left text-sm text-neutral-500">
                  <th className="p-5 font-medium">Аты</th>
                  <th className="p-5 font-medium">Телефон</th>
                  <th className="p-5 font-medium">Статус</th>
                  <th className="p-5 font-medium">Күні</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="p-5 font-medium text-[#1f1f1f]">
                      {guest.name}
                    </td>
                    <td className="p-5 text-neutral-600">{guest.phone}</td>
                    <td className="p-5">
                      <StatusBadge status={guest.status} />
                    </td>
                    <td className="p-5 text-sm text-neutral-400">
                      {new Date(guest.created_at).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredGuests.length === 0 && (
              <div className="py-16">
                <EmptyState hasQuery={query !== "" || filter !== "all"} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Плавающая кнопка экспорта — мобильный */}
      <button
        onClick={exportExcel}
        className="fixed inset-x-4 bottom-5 flex items-center justify-center gap-2.5 rounded-full bg-[#d4af37] py-4 text-white shadow-lg shadow-[#d4af37]/40 transition active:scale-95 sm:hidden"
      >
        <FiDownload size={18} />
        <span className="text-sm font-medium">Excel-ге жүктеу</span>
      </button>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  valueClassName = "text-[#1f1f1f]",
}: {
  icon?: React.ReactNode;
  label: string;
  value: number;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-4 shadow-sm ring-1 ring-black/5 sm:gap-2 sm:rounded-3xl sm:py-6">
      {icon}
      <span className={`text-2xl font-semibold sm:text-3xl ${valueClassName}`}>
        {value}
      </span>
      <p className="text-[11px] text-neutral-500 sm:text-sm">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === STATUS_COMING
      ? "bg-green-100 text-green-700"
      : status === STATUS_MAYBE
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function GuestCard({ guest }: { guest: Guest }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <p className="font-medium text-[#1f1f1f]">{guest.name}</p>
        <StatusBadge status={guest.status} />
      </div>

      <div className="flex items-center justify-between">
        <a
          href={`tel:${guest.phone}`}
          className="flex items-center gap-1.5 text-sm text-neutral-600 active:text-[#d4af37]"
        >
          <FiPhone size={14} className="text-[#d4af37]" />
          {guest.phone}
        </a>
        <span className="text-xs text-neutral-400">
          {new Date(guest.created_at).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

function EmptyState({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="py-16 text-center text-neutral-400">
      {hasQuery
        ? "Сәйкес келетін қонақ табылмады"
        : "Әзірге тіркелген қонақтар жоқ"}
    </div>
  );
}