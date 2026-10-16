import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Flower2,
  Heart,
  PencilLine,
  Search,
} from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { cafe, officialResources } from "@/domain/cafe";
import { currentUser } from "@/lib/repositories/topics";
import { signOut } from "@/application/auth";
import { CafeNavigation } from "./cafe-navigation";

export async function CafeShell({ children }: { children: ReactNode }) {
  const user = await currentUser();
  return (
    <>
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>
      <header className="utility-header">
        <div className="site-width utility-inner">
          <Link className="small-brand" href="/" aria-label={cafe.name}>
            <Flower2 size={18} />
            {cafe.shortName}
            <span>찐팬 커뮤니티</span>
          </Link>
          <div className="utility-links">
            <Link href="/about">카페 안내</Link>
            <i />
            {user ? (
              <form action={signOut}>
                <button type="submit">로그아웃</button>
              </form>
            ) : (
              <>
                <Link href="/sign-in">로그인</Link>
                <Link href="/sign-up">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="site-width">
        <section className="cafe-cover" aria-label="카페 대문">
          <div className="cover-copy">
            <p className="eyebrow">{cafe.eyebrow}</p>
            <Link href="/" className="cover-title" aria-label={cafe.name}>
              {cafe.shortName}
              <span className="title-flower">✳</span>
            </Link>
            <p>{cafe.description}</p>
            <span className="cover-note">
              좋아하는 마음을 차곡차곡, 우리만의 작은 정원
            </span>
          </div>
          <span className="cover-stamp">
            늘 함께,
            <br />
            찐팬카페
          </span>
        </section>
        <nav className="cafe-top-nav" aria-label="주 메뉴">
          <div>
            <Link href="/">카페홈</Link>
            <Link href="/board/notice">카페 공지</Link>
            <Link href="/schedule">소식 · 일정</Link>
            <Link href="/board/free">찐팬 이야기</Link>
            <Link href="/gallery">사진첩</Link>
          </div>
          <span>
            오늘도, 다현과 함께 <Heart size={12} />
          </span>
        </nav>
        <div className="cafe-columns">
          <aside className="cafe-sidebar">
            <details className="mobile-menu">
              <summary>
                카페 정보 · 게시판 메뉴 <ChevronRight size={15} />
              </summary>
              <Suspense
                fallback={
                  <p className="navigation-loading">
                    게시판 메뉴를 불러오는 중…
                  </p>
                }
              >
                <CafeNavigation />
              </Suspense>
            </details>
            <div className="desktop-sidebar">
              <div className="cafe-identity">
                <div className="cafe-avatar">
                  <Flower2 size={34} strokeWidth={1.1} />
                </div>
                <strong>{cafe.shortName}</strong>
                <p>{cafe.communityName}</p>
                <span className="community-label">함께 응원하는 찐팬카페</span>
              </div>
              <div className="member-box">
                <p>
                  {user
                    ? `${String(user.user_metadata?.nickname ?? "회원")}님, 반가워요.`
                    : "같은 마음으로, 함께해요."}
                </p>
                <Link
                  href={user ? "/write" : "/sign-up"}
                  className="button primary"
                >
                  {user ? "카페 글쓰기" : "카페 가입하기"}
                  {user ? <PencilLine size={14} /> : <Heart size={14} />}
                </Link>
                {!user && (
                  <Link className="login-note" href="/sign-in">
                    이미 회원이신가요? <u>로그인</u>
                  </Link>
                )}
              </div>
              <Suspense
                fallback={
                  <p className="navigation-loading">
                    게시판 메뉴를 불러오는 중…
                  </p>
                }
              >
                <CafeNavigation />
              </Suspense>
              <form
                action="/board/all"
                className="sidebar-search"
                role="search"
              >
                <label className="sr-only" htmlFor="cafe-search">
                  카페 글 검색
                </label>
                <input
                  id="cafe-search"
                  name="q"
                  placeholder="카페 글 검색"
                  maxLength={100}
                />
                <button aria-label="검색">
                  <Search size={16} />
                </button>
              </form>
              <div className="official-channel-links">
                <p>김다현 채널 바로가기</p>
                <a
                  href={officialResources.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  김다현 TV <ArrowUpRight size={12} />
                </a>
                <a
                  href={officialResources.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  김다현 인스타그램 <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="sidebar-note">
                <Flower2 size={19} />
                <p>
                  서로의 마음을 아끼며
                  <br />
                  따뜻한 이야기를 나눠요.
                </p>
                <Link href="/rules">
                  우리 카페 약속 <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </aside>
          <main id="main-content" className="cafe-main">
            {children}
          </main>
        </div>
        <footer className="cafe-footer">
          <Link href="/" className="footer-brand">
            <Flower2 size={18} />
            {cafe.shortName}
          </Link>
          <p>
            {cafe.artist}을 진심으로 응원하는 찐팬들이 함께 만드는 공간입니다.
          </p>
          <Link href="/about">카페 이용 안내</Link>
          <Link href="/rules">운영 규정(안)</Link>
          <span>다현의 노래와 함께하는 우리.</span>
        </footer>
      </div>
    </>
  );
}
