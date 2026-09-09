export type Shift = {
  id: string;
  employee: string;
  store: string;
  date: string;
  shiftTime: string;
  status: "open" | "closed";
  completedPoints: number;
  totalPoints: number;
  completedTasks: number[];
};

const SHIFTS_STORAGE_KEY = "shiftcontrol_shifts";

export function getShifts(): Shift[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(SHIFTS_STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveShift(shift: Shift) {
  const shifts = getShifts();

  shifts.push(shift);

  localStorage.setItem(
    SHIFTS_STORAGE_KEY,
    JSON.stringify(shifts)
  );
}

export function updateShift(
  id: string,
  updates: Partial<Shift>
) {
  const shifts = getShifts();

  const updatedShifts = shifts.map((shift) =>
    shift.id === id
      ? { ...shift, ...updates }
      : shift
  );

  localStorage.setItem(
    SHIFTS_STORAGE_KEY,
    JSON.stringify(updatedShifts)
  );
}