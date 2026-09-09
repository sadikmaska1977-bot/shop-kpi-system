"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { saveShift } from "@/lib/shifts";

export default function OpenShiftPage() {
  const router = useRouter();

  const [employee, setEmployee] = useState("");
  const [store, setStore] = useState("");
  const [shiftTime, setShiftTime] = useState("");

  const canOpen = employee && store && shiftTime;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">

        <div>
          <p className="text-sm font-medium text-gray-500">
            ShiftControl
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Открытие смены
          </h1>

          <p className="mt-2 text-gray-500">
            Заполните данные перед началом работы
          </p>
        </div>

        <div className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm">

          {/* Сотрудник */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Сотрудник
            </label>

            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-400"
            >
              <option value="">Выберите сотрудника</option>
              <option value="Danis">Danis</option>
              <option value="Sofya">Sofya</option>
              <option value="Иван">Иван</option>
            </select>
          </div>

          {/* Магазин */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Магазин
            </label>

            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-400"
            >
              <option value="">Выберите магазин</option>
              <option value="Центральный рынок">
                Центральный рынок
              </option>
              <option value="Магазин №2">
                Магазин №2
              </option>
              <option value="Магазин №3">
                Магазин №3
              </option>
              <option value="Магазин №4">
                Магазин №4
              </option>
            </select>
          </div>

          {/* Время */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Время смены
            </label>

            <select
              value={shiftTime}
              onChange={(e) => setShiftTime(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-400"
            >
              <option value="">Выберите время</option>
              <option value="09:00–21:00">09:00–21:00</option>
              <option value="21:00–09:00">21:00–09:00</option>
            </select>
          </div>

          {/* Кнопка */}
          <button
  disabled={!canOpen}
  onClick={() => {
    if (!canOpen) {
      return;
    }

    const today = new Date().toISOString().split("T")[0];

const shiftId = Date.now().toString();

saveShift({
  id: shiftId,
  employee,
  store,
  date: today,
  shiftTime,
  status: "open",
  completedPoints: 0,
  totalPoints: 6,
  completedTasks: [],
});

router.push(`/shifts/${shiftId}`);
  }}
  className={`block w-full rounded-xl px-5 py-3 text-center font-medium transition ${
    canOpen
      ? "bg-gray-900 text-white hover:bg-gray-700"
      : "cursor-not-allowed bg-gray-200 text-gray-400"
  }`}
>
  Открыть смену
</button>

        </div>
      </div>
    </main>
  );
}