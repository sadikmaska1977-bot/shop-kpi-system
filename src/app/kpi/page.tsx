"use client";

import { useEffect, useState } from "react";
import { getKPI, KPIRecord } from "@/lib/kpi";

export default function KPIPage() {
  const [records, setRecords] = useState<KPIRecord[]>([]);

  useEffect(() => {
    setRecords(getKPI());
  }, []);

  const totalPoints = records.reduce(
    (sum, record) => sum + record.points,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            KPI
          </h1>

          <p className="mt-1 text-gray-500">
            Аналитика выполнения KPI сотрудников
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Всего баллов
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalPoints}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Заработано сотрудниками
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Сотрудников
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {records.length}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Имеют KPI-баллы
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Период
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              Сегодня
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Текущая смена
            </p>
          </div>

        </div>

        {/* Employee ranking */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-gray-900">
            Рейтинг сотрудников
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Баллы, полученные за выполненные задачи
          </p>

          {records.length === 0 ? (
            <div className="mt-6 rounded-xl bg-gray-50 p-8 text-center">
              <p className="font-medium text-gray-900">
                Пока нет KPI-баллов
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Выполните задачу в разделе «Смены»
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">

              <div className="grid grid-cols-12 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-500">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Сотрудник</div>
                <div className="col-span-4">Магазин</div>
                <div className="col-span-3">Баллы</div>
              </div>

              {records
                .sort((a, b) => b.points - a.points)
                .map((record, index) => (
                  <div
                    key={`${record.employee}-${record.store}`}
                    className="grid grid-cols-12 items-center border-t border-gray-100 px-5 py-5"
                  >
                    <div className="col-span-1 font-bold text-gray-400">
                      {index + 1}
                    </div>

                    <div className="col-span-4 font-medium text-gray-900">
                      {record.employee}
                    </div>

                    <div className="col-span-4 text-sm text-gray-500">
                      {record.store}
                    </div>

                    <div className="col-span-3 text-lg font-bold text-gray-900">
                      {record.points}
                    </div>
                  </div>
                ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}