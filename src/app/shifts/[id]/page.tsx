"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getShifts, updateShift } from "@/lib/shifts";

const tasks = [
  {
    id: 1,
    time: "12:40",
    title: "Сторис с часами работы",
    description: "Сторис Instagram + Whatsapp, отправить подтверждение",
    points: 1,
  },
  {
    id: 2,
    time: "14:00",
    title: "Популярный товар",
    description:
      "Публикация популярного товара. Пост в Telegram и история в Instagram",
    points: 1,
  },
  {
    id: 3,
    time: "16:00",
    title: "Неликвидный товар",
    description:
      "Публикация неликвидного товара. Пост в Telegram и история в Instagram",
    points: 1,
  },
  {
    id: 4,
    time: "18:00",
    title: "Табачный микс",
    description:
      "Пост в Telegram и история в Instagram с миксом табаков",
    points: 1,
  },
  {
    id: 5,
    time: "20:00",
    title: "Текущая акция",
    description:
      "История в Instagram и Whatsapp с действующей акцией",
    points: 1,
  },
  {
    id: 6,
    time: "22:00",
    title: "Новинки",
    description:
      "История в Instagram и Whatsapp с новинками в магазине",
    points: 1,
  },
];

export default function ShiftDetailsPage() {
  const params = useParams();
  const shiftId = params.id as string;

  const [shift, setShift] = useState<
    ReturnType<typeof getShifts>[number] | null
  >(null);

  useEffect(() => {
    const shifts = getShifts();

    const foundShift = shifts.find(
      (item) => item.id === shiftId
    );

    setShift(foundShift || null);
  }, [shiftId]);

  if (!shift) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Смена не найдена
          </h1>

          <p className="mt-2 text-gray-500">
            Смена с ID {shiftId} не существует.
          </p>
        </div>
      </main>
    );
  }

  const progress = Math.round(
    (shift.completedPoints / shift.totalPoints) * 100
  );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              ShiftControl
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Смена — {shift.store}
            </h1>

            <p className="mt-2 text-gray-500">
              Сотрудник: {shift.employee}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Время смены: {shift.shiftTime}
            </p>
          </div>

          <div className="rounded-2xl bg-white px-6 py-4 text-right shadow-sm">
            <p className="text-sm text-gray-500">
              KPI за смену
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {shift.completedPoints} / {shift.totalPoints}
            </p>

            <p className="text-sm text-gray-500">
              баллов
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              Выполнение смены
            </span>

            <span className="text-sm text-gray-500">
              {progress}%
            </span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* KPI Tasks */}
        <div className="mt-8 space-y-4">
          {tasks.map((task) => {
            const completed = shift.completedTasks.includes(task.id);
            const proofInputId = `proof-${task.id}`;
            return (
              <div
                key={task.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-5">

                  <div className="w-20 shrink-0">
                    <p className="text-xl font-bold text-gray-900">
                      {task.time}
                    </p>
                  </div>

                  <div
                    className={
                      completed
                        ? "mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white"
                        : "mt-1 h-5 w-5 rounded-full border-2 border-gray-300"
                    }
                  >
                    {completed && "✓"}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {task.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          {task.description}
                        </p>
                      </div>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        +{task.points} балл
                      </span>
                    </div>
                    <input
  type="file"
  accept="image/*"
  className="hidden"
  id={proofInputId}
onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  alert(`Фото "${file.name}" выбрано`);

  console.log("Фото:", imageUrl);
  const preview = document.getElementById(
  `preview-${task.id}`
) as HTMLImageElement | null;

if (preview) {
  preview.src = imageUrl;
  preview.classList.remove("hidden");
}
}}
/>
{!completed && (
  <button
    type="button"
    onClick={() => {
      document.getElementById(proofInputId)?.click();
    }}
    className="mr-3 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
  >
    📸 Добавить подтверждение
  </button>
)}
<img
  id={`preview-${task.id}`}
  className="mt-4 hidden max-h-64 rounded-xl border border-gray-200 object-contain"
  alt="Подтверждение"
/>
                    <div className="mt-5">
                      {completed ? (
                        <div className="inline-block rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                          ✓ Выполнено
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const preview = document.getElementById(
  `preview-${task.id}`
) as HTMLImageElement | null;

if (!preview || preview.classList.contains("hidden")) {
  alert("Сначала добавьте фото-подтверждение");
  return;
}
  const updatedCompletedTasks = [
    ...shift.completedTasks,
    task.id,
  ];

  const updatedCompletedPoints =
    shift.completedPoints + task.points;

  const updatedShift = {
    ...shift,
    completedTasks: updatedCompletedTasks,
    completedPoints: updatedCompletedPoints,
  };

  const shifts = getShifts();

  const updatedShifts = shifts.map((item) =>
    item.id === shift.id ? updatedShift : item
  );

  localStorage.setItem(
    "shiftcontrol_shifts",
    JSON.stringify(updatedShifts)
  );

  setShift(updatedShift);
}}
                          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                          Выполнить
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        {/* Close shift */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Закрытие смены
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {shift.completedPoints === shift.totalPoints
              ? "Все KPI выполнены. Смену можно закрыть."
              : "Для закрытия смены необходимо выполнить все KPI."}
          </p>

          <button
            disabled={
              shift.completedPoints !== shift.totalPoints ||
              shift.status === "closed"
            }
            onClick={() => {
              if (shift.completedPoints !== shift.totalPoints) {
                return;
              }

              updateShift(shift.id, {
                status: "closed",
              });

              setShift({
                ...shift,
                status: "closed",
              });
            }}
            className={
              shift.completedPoints === shift.totalPoints &&
              shift.status === "open"
                ? "mt-5 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
                : "mt-5 cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 font-medium text-gray-400"
            }
          >
            {shift.status === "closed"
              ? "✓ Смена закрыта"
              : "Закрыть смену"}
          </button>
        </div>
      </div>
    </main>
  );
}