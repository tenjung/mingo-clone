import "server-only";
import { schedules } from "@/data/schedules";
import {
  filterSchedules,
  seoulToday,
  type ScheduleFilter,
} from "@/domain/schedule";

export function listSchedules(month: string, type: ScheduleFilter) {
  return filterSchedules(schedules, { month, type });
}
export function upcomingSchedules(limit = 3) {
  return filterSchedules(schedules, { from: seoulToday() }).slice(0, limit);
}
