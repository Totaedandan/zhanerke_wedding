import { useState } from "react";
import {
  FiCheck,
  FiClock,
  FiX,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";

type Status =
  | "Обязательно приду"
  | "Возможно приду"
  | "Не смогу прийти";

export default function RSVPForm() {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [status, setStatus] =
    useState<Status>(
      "Обязательно приду"
    );

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Заполните поля");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase
        .from("guests")
        .insert({
          name,
          phone,
          status,
        });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Спасибо за ответ!");

    setName("");
    setPhone("");
    setStatus(
      "Обязательно приду"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      

      <input
        type="text"
        placeholder="Аты жөніңіз"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="glass h-14 rounded-2xl px-5 text-[15px] outline-none transition focus:border-[#d4af37]"
      />

      <input
        type="tel"
        placeholder="Нөмеріңіз"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="glass h-14 rounded-2xl px-5 text-[15px] outline-none transition focus:border-[#d4af37]"
      />

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() =>
            setStatus(
              "Обязательно приду"
            )
          }
          className={`flex items-center gap-4 rounded-2xl p-5 transition ${
            status ===
            "Обязательно приду"
              ? "border border-green-500 bg-green-50"
              : "glass"
          }`}
        >
          <FiCheck
            className="text-green-600"
            size={22}
          />

          <div className="text-left">
            <p className="font-medium">
              Әрине келемін
            </p>

            <p className="text-sm text-neutral-500">
              Буду присутствовать
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatus(
              "Возможно приду"
            )
          }
          className={`flex items-center gap-4 rounded-2xl p-5 transition ${
            status ===
            "Возможно приду"
              ? "border border-yellow-500 bg-yellow-50"
              : "glass"
          }`}
        >
          <FiClock
            className="text-yellow-600"
            size={22}
          />

          <div className="text-left">
            <p className="font-medium">
              Нақты білмеймін
            </p>

            <p className="text-sm text-neutral-500">
              Пока не уверен
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatus(
              "Не смогу прийти"
            )
          }
          className={`flex items-center gap-4 rounded-2xl p-5 transition ${
            status ===
            "Не смогу прийти"
              ? "border border-red-500 bg-red-50"
              : "glass"
          }`}
        >
          <FiX
            className="text-red-600"
            size={22}
          />

          <div className="text-left">
            <p className="font-medium">
              Келе алмаймын
            </p>

            <p className="text-sm text-neutral-500">
              К сожалению, не получится
            </p>
          </div>
        </button>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="rounded-full bg-[#d4af37] py-5 text-sm uppercase tracking-[4px] text-white shadow-lg transition hover:scale-[1.02]"
      >
        {loading
          ? "Жіберілуде..."
          : "Растау"}
      </button>
    </form>
  );
}