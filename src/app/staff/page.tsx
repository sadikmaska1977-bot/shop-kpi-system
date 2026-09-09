const employees = [
  {
    id: 1,
    name: "Данис",
    store: "Центральный рынок",
    role: "Продавец",
    shifts: 15,
    points: 45,
    status: "На смене",
  },
  {
    id: 2,
    name: "Гульназ",
    store: "Центральный рынок",
    role: "Продавец",
    shifts: 16,
    points: 48,
    status: "Выходной",
  },
  {
    id: 3,
    name: "Диана",
    store: "Жукова",
    role: "Продавец",
    shifts: 20,
    points: 102,
    status: "На смене",
  },
];

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Сотрудники
            </h1>

            <p className="mt-1 text-gray-500">
              Сотрудники, магазины и показатели KPI
            </p>
          </div>

          <button className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700">
            Добавить сотрудника
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Сотрудник
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Магазин
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Смены
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  KPI
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Статус
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {employee.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {employee.role}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {employee.store}
                  </td>

                  <td className="px-6 py-5 text-gray-700">
                    {employee.shifts}
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-semibold text-gray-900">
                      {employee.points}
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      баллов
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={
                        employee.status === "На смене"
                          ? "rounded-full bg-orange-100 px-3 py-1 text-sm text-yellow-700"
                          : "rounded-full bg-blue-100 px-3 py-1 text-sm text-grey-700"
                      }
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}