import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ShiftControl
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Управление сменами и KPI
          </p>

          <nav className="mt-8 space-y-2">

            <Link
              href="/"
              className="block rounded-xl bg-gray-900 px-4 py-3 text-white"
            >
              📊 Dashboard
            </Link>

            <Link
              href="/stores"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              🏪 Магазины
            </Link>

            <Link
              href="/staff"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              👥 Сотрудники
            </Link>

            <Link
              href="/shifts"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              🔄 Смены
            </Link>

            <Link
              href="/kpi"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              📈 KPI
            </Link>

            <Link
              href="/reports"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              📸 Отчёты
            </Link>

            <Link
              href="/bonuses"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              💰 Премии
            </Link>

            <Link
              href="/settings"
              className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              ⚙️ Настройки
            </Link>

          </nav>
        </aside>

        {/* Main */}
        <section className="flex-1 p-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Добрый день 👋
            </h2>

            <p className="mt-1 text-gray-500">
              Обзор работы магазинов за сегодня
            </p>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Магазины</p>
              <p className="mt-2 text-3xl font-bold">8</p>
              <p className="mt-2 text-sm text-green-600">
                Все работают
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Сотрудники</p>
              <p className="mt-2 text-3xl font-bold">20</p>
              <p className="mt-2 text-sm text-gray-500">
                В системе
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Смены сегодня</p>
              <p className="mt-2 text-3xl font-bold">8</p>
              <p className="mt-2 text-sm text-green-600">
                6 открыто
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">KPI сегодня</p>
              <p className="mt-2 text-3xl font-bold">78%</p>
              <p className="mt-2 text-sm text-orange-600">
                Есть невыполненные
              </p>
            </div>

          </div>

          {/* Today's shifts */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Смены сегодня
            </h3>

            <div className="mt-6 divide-y divide-gray-100">

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Центральный рынок
                  </p>
                  <p className="text-sm text-gray-500">
                    Danis • 09:00–21:00
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Открыта
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Магазин №2
                  </p>
                  <p className="text-sm text-gray-500">
                    Sofya • 10:00–22:00
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Открыта
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Магазин №3
                  </p>
                  <p className="text-sm text-gray-500">
                    Сотрудник не назначен
                  </p>
                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  Проблема
                </span>
              </div>

            </div>
          </div>

        </section>
      </div>
    </main>
  );
}