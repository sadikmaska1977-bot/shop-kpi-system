const KPI_STORAGE_KEY = "shiftcontrol_kpi";

export type KPIRecord = {
  employee: string;
  store: string;
  points: number;
};

export function getKPI(): KPIRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(KPI_STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function addKPIPoints(
  employee: string,
  store: string,
  points: number
) {
  const data = getKPI();

  const existing = data.find(
    (item) =>
      item.employee === employee &&
      item.store === store
  );

  if (existing) {
    existing.points += points;
  } else {
    data.push({
      employee,
      store,
      points,
    });
  }

  localStorage.setItem(
    KPI_STORAGE_KEY,
    JSON.stringify(data)
  );
}