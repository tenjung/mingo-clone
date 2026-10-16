import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calendarMonth,
  filterSchedules,
  scheduleMonth,
  scheduleType,
  seoulToday,
  type ScheduleEntry,
} from "../src/domain/schedule.ts";
import {
  cafe,
  isBoard,
  navigationGroups,
  writableBoards,
} from "../src/domain/cafe.ts";

const entries: ScheduleEntry[] = [
  {
    id: "later",
    title: "테스트 공연",
    type: "live",
    date: "2026-11-01",
    sourceUrl: "https://example.com/1",
  },
  {
    id: "evening",
    title: "테스트 방송",
    type: "broadcast",
    date: "2026-10-16",
    time: "20:00",
    sourceUrl: "https://example.com/2",
  },
  {
    id: "morning",
    title: "테스트 행사",
    type: "live",
    date: "2026-10-16",
    time: "10:00",
    sourceUrl: "https://example.com/3",
  },
  {
    id: "past",
    title: "지난 테스트 공연",
    type: "live",
    date: "2026-10-15",
    sourceUrl: "https://example.com/4",
  },
];

test("schedule filters combine month and type without changing the source order", () => {
  assert.deepEqual(
    filterSchedules(entries, { month: "2026-10", type: "broadcast" }).map(
      (e) => e.id,
    ),
    ["evening"],
  );
  assert.deepEqual(
    filterSchedules(entries, {
      month: "2026-10",
      type: "live",
      from: "2026-10-16",
    }).map((e) => e.id),
    ["morning"],
  );
  assert.equal(entries[0].id, "later");
});

test("upcoming schedules include today, exclude past days, and sort by date/time", () => {
  assert.deepEqual(
    filterSchedules(entries, { from: "2026-10-16" }).map((e) => e.id),
    ["morning", "evening", "later"],
  );
});

test("calendar handles leap days, year boundaries and supported year limits", () => {
  const february = calendarMonth("2028-02");
  const days = february.weeks.flat().filter((cell) => cell.date);
  assert.equal(days.length, 29);
  assert.equal(days.at(-1)?.date, "2028-02-29");
  assert.equal(calendarMonth("2026-12").next, "2027-01");
  assert.equal(calendarMonth("2027-01").previous, "2026-12");
  assert.equal(calendarMonth("2000-01").previous, null);
  assert.equal(calendarMonth("2100-12").next, null);
});

test("Seoul date and malformed or repeated URL filters are handled consistently", () => {
  assert.equal(seoulToday(new Date("2026-10-15T15:30:00Z")), "2026-10-16");
  for (const value of [
    "2026-13",
    "1999-12",
    "2101-01",
    ["2026-09", "2026-10"],
    undefined,
  ])
    assert.equal(scheduleMonth(value, "2026-10-16"), "2026-10");
  assert.equal(scheduleMonth("2026-09", "2026-10-16"), "2026-09");
  assert.equal(scheduleType("broadcast"), "broadcast");
  assert.equal(scheduleType(["live", "broadcast"]), "all");
});

test("all board menu destinations match public routes and the member write contract", () => {
  for (const item of navigationGroups.flatMap((group) => group.items)) {
    if (!item.href.startsWith("/board/")) {
      assert.ok(
        ["/schedule", "/rules"].includes(item.href.split("?")[0]),
        item.href,
      );
      continue;
    }
    const id = item.href.split("/").at(-1)!;
    assert.ok(isBoard(id), item.href);
    if (id !== "notice")
      assert.ok(
        writableBoards.some((board) => board.id === id),
        id,
      );
  }
  assert.equal(cafe.name, "트롯 요정 김다현 찐팬카페");
});
