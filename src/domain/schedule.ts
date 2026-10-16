export type ScheduleType = "live" | "broadcast";
export type ScheduleFilter = ScheduleType | "all";
export interface ScheduleEntry {
  id: string;
  title: string;
  type: ScheduleType;
  date: string;
  time?: string;
  venue?: string;
  sourceUrl: string;
}
export function scheduleType(value: unknown): ScheduleFilter {
  return value === "live" || value === "broadcast" ? value : "all";
}
export function scheduleLabel(type: ScheduleFilter) {
  return type === "live"
    ? "공연 · 행사 일정"
    : type === "broadcast"
      ? "방송 일정"
      : "다현 소식 · 일정";
}
export function seoulToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function scheduleMonth(value: unknown, today: string) {
  return typeof value === "string" &&
    /^(20\d{2}|2100)-(0[1-9]|1[0-2])$/.test(value)
    ? value
    : today.slice(0, 7);
}
export function filterSchedules(
  entries: readonly ScheduleEntry[],
  options: { month?: string; type?: ScheduleFilter; from?: string } = {},
) {
  return entries
    .filter(
      (entry) =>
        (!options.month || entry.date.startsWith(`${options.month}-`)) &&
        (!options.type ||
          options.type === "all" ||
          entry.type === options.type) &&
        (!options.from || entry.date >= options.from),
    )
    .sort((a, b) =>
      `${a.date}T${a.time ?? "23:59"}`.localeCompare(
        `${b.date}T${b.time ?? "23:59"}`,
      ),
    );
}
export function calendarMonth(month: string) {
  const [year, number] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(year, number - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, number, 0)).getUTCDate();
  const adjacent = (offset: number) =>
    new Date(Date.UTC(year, number - 1 + offset, 1)).toISOString().slice(0, 7);
  const weeks = Array.from(
    { length: Math.ceil((firstWeekday + days) / 7) },
    (_, week) =>
      Array.from({ length: 7 }, (_, day) => {
        const n = week * 7 + day - firstWeekday + 1;
        return n > 0 && n <= days
          ? { day: n, date: `${month}-${String(n).padStart(2, "0")}` }
          : { day: null, date: null };
      }),
  );
  return {
    year,
    number,
    weeks,
    previous: month === "2000-01" ? null : adjacent(-1),
    next: month === "2100-12" ? null : adjacent(1),
  };
}
