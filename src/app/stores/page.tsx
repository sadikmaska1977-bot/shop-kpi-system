const stores = [
  {
    id: 1,
    name: "Центральный рынок",
    address: "50 лет Октября 5",
    employees: 2,
    status: "Работает",
  },
  {
    id: 2,
    name: "Айская",
    address: "Айская 84",
    employees: 2,
    status: "Работает",
  },
  {
    id: 3,
    name: "Жукова",
    address: "Маршалла Жукова 8",
    employees: 2,
    status: "Работает",
  },
  {
    id: 4,
    name: "Аксакова",
    address: "Адрес",
    employees: 0,
    status: "Не работает",
  },
];

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Магазины
            </h1>

            <p className="mt-1 text-gray-500">
              Управление торговыми точками
            </p>
          </div>

          <button className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700">
            + Добавить магазин
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">🏪 </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {store.status}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                {store.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {store.address}
              </p>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  Сотрудников
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {store.employees}
                </p>
              </div>

              <button className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Открыть магазин
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}