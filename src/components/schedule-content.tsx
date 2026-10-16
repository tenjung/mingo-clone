import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { officialResources } from "@/domain/cafe";
import { dateLabel } from "@/domain/cafe";
import type { ScheduleEntry } from "@/domain/schedule";
import { upcomingSchedules } from "@/lib/repositories/schedules";
import { SectionHeading } from "./board-content";

export function ScheduleList({
  entries,
}: {
  entries: readonly ScheduleEntry[];
}) {
  return (
    <div className="schedule-list">
      {entries.map((entry) => (
        <a
          className="schedule-entry"
          key={entry.id}
          href={entry.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <time dateTime={entry.date}>{dateLabel(entry.date)}</time>
          <span className={`schedule-kind ${entry.type}`}>
            {entry.type === "live" ? "공연·행사" : "방송"}
          </span>
          <div>
            <strong>{entry.title}</strong>
            <p>
              {entry.time ?? "시간 미기재"}
              {entry.venue ? ` · ${entry.venue}` : ""}
            </p>
          </div>
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

export function OfficialScheduleLinks() {
  return (
    <div className="schedule-sources">
      <div>
        <strong>공식 일정 원문 확인</strong>
        <p>
          게시글 열람에는 공식 팬카페 로그인·회원 등급이 필요할 수 있습니다.
        </p>
      </div>
      <a href={officialResources.schedule} target="_blank" rel="noreferrer">
        공식 스케줄
        <ArrowUpRight size={13} />
      </a>
      <a href={officialResources.performance} target="_blank" rel="noreferrer">
        공연 상세 공지
        <ArrowUpRight size={13} />
      </a>
    </div>
  );
}

export function ScheduleSummary() {
  const entries = upcomingSchedules();
  return (
    <section className="schedule-summary">
      <SectionHeading title="다가오는 일정" href="/schedule" />
      {entries.length ? (
        <ScheduleList entries={entries} />
      ) : (
        <div className="schedule-empty">
          <CalendarDays size={24} strokeWidth={1.2} />
          <p>확인된 일정이 아직 등록되지 않았어요.</p>
          <span>공연·행사와 방송 일정을 나눠서 확인해요.</span>
          <Link href="/schedule">
            소식 · 일정 보러 가기
            <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </section>
  );
}
