"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getShifts } from "@/lib/shifts";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<ReturnType<typeof getShifts>>([]);

  useEffect(() => {
    setShifts(getShifts());
  }, []);

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
              Смены
            </h1>

            <p className="mt-2 text-gray-500">
              Все открытые и завершённые смены
            </p>
          </div>

          <Link
            href="/shifts/open"
            className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            + Открыть смену
          </Link>
        </div>

        {/* Empty state */}
        {shifts.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Смен пока нет
            </h2>

            <p className="mt-2 text-gray-500">
              Откройте первую смену, чтобы она появилась здесь.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {shifts
              .slice()
              .reverse()
              .map((shift) => {
                const progress = Math.round(
                  (shift.completedPoints / shift.totalPoints) * 100
                );

                return (
                  <div
                    key={shift.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">

                      {/* Info */}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {shift.store}
                        </h2>

                        <p className="mt-1 text-gray-500">
                          {shift.employee}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {shift.shiftTime}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        <div
                          className={
                            shift.status === "open"
                              ? "text-sm font-medium text-green-600"
                              : "text-sm font-medium text-gray-500"
                          }
                        >
                          {shift.status === "open"
                            ? "🟢 Открыта"
                            : "⚫ Закрыта"}
                        </div>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                          {shift.completedPoints} / {shift.totalPoints}
                        </p>

                        <p className="text-sm text-gray-500">
                          KPI • {progress}%
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    {/* Button */}
                    <div className="mt-5">
                      <Link
                        href={`/shifts/${shift.id}`}
                        className="inline-block rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Открыть смену →
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

      </div>
    </main>
  );
}