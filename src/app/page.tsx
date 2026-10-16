import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Tv,
  Radio,
  Music2,
  ChevronRight,
  Mail,
  MessagesSquare,
  Sprout,
} from "lucide-react";
import { listTopics } from "@/lib/repositories/topics";
import { ScheduleSummary } from "@/components/schedule-content";
import { CafeGuides } from "@/components/cafe-guides";
import {
  PhotoGrid,
  PostRows,
  SectionHeading,
} from "@/components/board-content";

export default async function Home() {
  const [latest, photos, notices] = await Promise.all([
    listTopics("all", "", 1, 6),
    listTopics("photo", "", 1, 4),
    listTopics("notice", "", 1, 4),
  ]);
  return (
    <div className="home-content">
      <div className="home-breadcrumb">
        카페홈<span>반가워요, 오늘도 잘 오셨어요.</span>
      </div>
      <section className="welcome-letter">
        <div className="welcome-letter-copy">
          <span className="tiny-label">다현과 함께하는 하루</span>
          <h1>
            너의 모든 날을,
            <br />
            함께 응원해.
          </h1>
          <p>
            다현의 무대부터 우리의 소소한 하루까지.
            <br />
            좋아하는 마음이 모여 더 다정한 날들이 되기를.
          </p>
          <Link href="/board/welcome">
            처음 오셨나요? 인사 나눠요 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="letter-art">
          <div className="art-postcard portrait-postcard">
            <Image
              src="/images/dahyun-portrait.jpg"
              alt="가수 김다현의 홍보 사진"
              width={600}
              height={750}
              priority
              sizes="(max-width: 430px) 105px, (max-width: 760px) 140px, 190px"
            />
            <p>언제나 다현 편.</p>
          </div>
          <span className="postcard-tape" aria-hidden="true" />
          <span className="art-caption" aria-hidden="true">
            오늘도 응원해요 ♡
          </span>
        </div>
      </section>
      <Link className="notice-strip" href="/about">
        <span className="small-tag">안내</span>
        <strong>처음 오신 분들을 위한 카페 이용 안내</strong>
        <span className="strip-extra">함께 읽어 주세요</span>
        <ChevronRight size={15} />
      </Link>
      <nav className="home-quicklinks" aria-label="자주 찾는 찐팬 메뉴">
        <Link href="/schedule?type=live">
          <CalendarDays size={19} strokeWidth={1.4} />
          <span>공연 · 행사 일정</span>
        </Link>
        <Link href="/schedule?type=broadcast">
          <Tv size={19} strokeWidth={1.4} />
          <span>방송 일정</span>
        </Link>
        <Link href="/board/cheer">
          <Radio size={19} strokeWidth={1.4} />
          <span>투표 · 스밍 응원</span>
        </Link>
        <Link href="/board/review">
          <Music2 size={19} strokeWidth={1.4} />
          <span>공연 · 방송 후기</span>
        </Link>
      </nav>
      <div className="home-board-grid">
        <section>
          <SectionHeading title="카페 공지" href="/board/notice" />
          <CafeGuides />
          {notices.topics.length > 0 && <PostRows result={notices} compact />}
        </section>
        <ScheduleSummary />
      </div>
      <section className="recent-section">
        <SectionHeading
          title="찐팬들의 이야기"
          caption="오늘도 차곡차곡 쌓이는 마음"
          href="/board/all"
        />
        <div className="board-tabs">
          <Link href="/board/all" className="selected">
            전체글
          </Link>
          <Link href="/board/free">찐팬 자유게시판</Link>
          <Link href="/board/welcome">가입인사</Link>
          <Link href="/board/review">공연 · 방송 후기</Link>
          <Link className="tab-write" href="/write">
            글쓰기 ↗
          </Link>
        </div>
        <PostRows result={latest} />
      </section>
      <section className="gallery-section">
        <SectionHeading
          title="다현의 순간들"
          caption="오래 보고 싶은, 오래 기억할"
          href="/gallery"
        />
        <PhotoGrid result={photos} />
      </section>
      <div className="community-shortcuts">
        <Link href="/board/letter">
          <Mail size={22} strokeWidth={1.2} />
          <div>
            <strong>다현에게 보내는 편지</strong>
            <span>전하고 싶은 마음을 남겨요</span>
          </div>
          <ChevronRight size={16} />
        </Link>
        <Link href="/board/question">
          <MessagesSquare size={22} strokeWidth={1.2} />
          <div>
            <strong>궁금한 건 찐팬에게</strong>
            <span>카페 이용 · 응원 방법을 물어보세요</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      </div>
      <p className="home-signoff">
        <Sprout size={15} />
        서로를 배려하는 작은 마음이, 우리 카페를 따뜻하게 만들어요.
      </p>
    </div>
  );
}
