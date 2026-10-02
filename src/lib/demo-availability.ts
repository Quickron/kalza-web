// Demo meeting availability. Edit here when the sales team's schedule changes.
export const DEMO_TIME_ZONE = "America/Santiago";
export const DEMO_DAYS_AHEAD = 5;
export const DEMO_SLOT_MINUTES = 30;
const FIRST_SLOT_HOUR = 10;
const LAST_SLOT_END_HOUR = 18;

export const DEMO_SLOT_TIMES: string[] = Array.from(
  { length: ((LAST_SLOT_END_HOUR - FIRST_SLOT_HOUR) * 60) / DEMO_SLOT_MINUTES },
  (_, index) => {
    const totalMinutes = FIRST_SLOT_HOUR * 60 + index * DEMO_SLOT_MINUTES;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
  },
);

export type DemoDay = { key: string; date: Date };

function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Next business days starting tomorrow (weekends skipped). */
export function getUpcomingDemoDays(from: Date = new Date()): DemoDay[] {
  const days: DemoDay[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (days.length < DEMO_DAYS_AHEAD) {
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (weekday === 0 || weekday === 6) continue;
    days.push({ key: toDateKey(cursor), date: new Date(cursor) });
  }
  return days;
}
