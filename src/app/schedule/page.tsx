import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  List,
  Calendar,
  Send,
} from "lucide-react";
import {
  calendarMonth,
  scheduleLabel,
  scheduleMonth,
  scheduleType,
  seoulToday,
  type ScheduleFilter,
} from "@/domain/schedule";
import { listSchedules } from "@/lib/repositories/schedules";
import {
  OfficialScheduleLinks,
  ScheduleList,
} from "@/components/schedule-content";

export const metadata = { title: "다현 소식 · 일정" };
export default async function Schedule({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; type?: string; view?: string }>;
}) {
  const query = await searchParams;
  const today = seoulToday();
  const month = scheduleMonth(query.month, today);
  const type = scheduleType(query.type);
  const view = query.view === "list" ? "list" : "calendar";
  const calendar = calendarMonth(month);
  const entries = listSchedules(month, type);
  const href = (
    overrides: { month?: string; type?: ScheduleFilter; view?: string } = {},
  ) => {
    const selected = { month, type, view, ...overrides };
    const params = new URLSearchParams({ month: selected.month });
    if (selected.type !== "all") params.set("type", selected.type);
    if (selected.view === "list") params.set("view", "list");
    return `/schedule?${params}`;
  };
  return (
    <section className="page-panel schedule-panel">
      <p className="breadcrumb">
        <Link href="/">카페홈</Link> › 소식 · 일정
      </p>
      <div className="page-heading">
        <div>
          <h1>{scheduleLabel(type)}</h1>
          <p>다현을 만나는 날, 함께 응원하는 날을 모아요.</p>
        </div>
        <Link className="button outline" href="/write?board=schedule-tip">
          <Send size={14} />
          일정 제보
        </Link>
      </div>
      <div className="schedule-controls">
        <nav className="schedule-type-tabs" aria-label="일정 종류">
          {(
            [
              { type: "all", label: "전체 일정" },
              { type: "live", label: "공연 · 행사" },
              { type: "broadcast", label: "방송" },
            ] as const
          ).map((item) => (
            <Link
              key={item.type}
              href={href({ type: item.type })}
              aria-current={type === item.type ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="schedule-view-tabs" aria-label="일정 보기 방식">
          <Link
            href={href({ view: "calendar" })}
            aria-current={view === "calendar" ? "page" : undefined}
          >
            <Calendar size={14} />
            달력
          </Link>
          <Link
            href={href({ view: "list" })}
            aria-current={view === "list" ? "page" : undefined}
          >
            <List size={14} />
            목록
          </Link>
        </nav>
      </div>
      <div className="calendar-toolbar">
        {calendar.previous ? (
          <Link href={href({ month: calendar.previous })} aria-label="이전 달">
            <ChevronLeft size={19} />
          </Link>
        ) : (
          <span className="calendar-disabled">
            <ChevronLeft size={19} />
          </span>
        )}
        <h2>
          {calendar.year}년 {calendar.number}월
        </h2>
        {calendar.next ? (
          <Link href={href({ month: calendar.next })} aria-label="다음 달">
            <ChevronRight size={19} />
          </Link>
        ) : (
          <span className="calendar-disabled">
            <ChevronRight size={19} />
          </span>
        )}
        <Link
          className="calendar-today"
          href={href({ month: today.slice(0, 7) })}
        >
          이번 달
        </Link>
      </div>
      <p className="schedule-count">
        {calendar.number}월 등록 일정 <strong>{entries.length}</strong>개{" "}
        <span>· 공연·행사 / 방송 구분</span>
      </p>
      {view === "calendar" && (
        <div
          className="calendar"
          role="table"
          aria-label={`${calendar.year}년 ${calendar.number}월 달력`}
        >
          <div className="calendar-week" role="row">
            {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
              <div role="columnheader" key={d}>
                {d}
              </div>
            ))}
          </div>
          {calendar.weeks.map((week, index) => (
            <div role="row" className="calendar-week" key={index}>
              {week.map((cell, day) => (
                <div
                  className={cell.date === today ? "is-today" : ""}
                  role="cell"
                  key={day}
                >
                  {cell.date && (
                    <>
                      <time dateTime={cell.date}>{cell.day}</time>
                      <div className="calendar-events">
                        {entries
                          .filter((entry) => entry.date === cell.date)
                          .map((entry) => (
                            <a
                              href={entry.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              key={entry.id}
                              className={entry.type}
                              title={entry.title}
                            >
                              {entry.time && <span>{entry.time} </span>}
                              {entry.title}
                            </a>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {entries.length ? (
        <>
          {view === "calendar" && (
            <h2 className="schedule-list-heading">이번 달 일정 자세히 보기</h2>
          )}
          <ScheduleList entries={entries} />
        </>
      ) : (
        <div className="schedule-no-entries">
          <CalendarDays size={24} strokeWidth={1.3} />
          <strong>
            {calendar.number}월에 등록된{" "}
            {type === "live"
              ? "공연·행사 "
              : type === "broadcast"
                ? "방송 "
                : ""}
            일정이 없습니다.
          </strong>
          <p>새 소식이 있다면 원문 링크와 함께 알려 주세요.</p>
          <Link href="/write?board=schedule-tip">일정 제보하기 →</Link>
        </div>
      )}
      <OfficialScheduleLinks />
      <p className="calendar-note">
        제보 내용을 확인한 뒤 일정에 반영합니다. 참여 전 주최 측 원문에서
        일시·장소를 다시 확인해 주세요.
      </p>
    </section>
  );
}
