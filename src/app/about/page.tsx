import Link from "next/link";
import { cafe, officialResources } from "@/domain/cafe";
import { Flower2 } from "lucide-react";

export const metadata = { title: "카페 이용 안내" };
export default function About() {
  return (
    <article className="page-panel about-panel">
      <p className="breadcrumb">
        <Link href="/">카페홈</Link> › 카페 이용 안내
      </p>
      <div className="about-intro">
        <Flower2 size={35} strokeWidth={1} />
        <p className="tiny-label">{cafe.shortName}에 오신 것을 환영해요</p>
        <h1>좋아하는 마음으로 만난 우리</h1>
        <p>
          {cafe.name}는 가수 김다현을 응원하는 찐팬들의 공간입니다.
          <br />
          무대의 감동도, 작은 일상의 이야기도 편하게 나눠 주세요.
        </p>
      </div>
      <section id="first-visit">
        <span>01</span>
        <div>
          <h2>처음 오셨다면, 인사부터</h2>
          <p>회원가입 후 가입인사 게시판에 반가운 첫인사를 남겨 주세요.</p>
          <Link href="/board/welcome" className="text-link">
            가입인사 게시판 →
          </Link>
        </div>
      </section>
      <section id="cafe-promise">
        <span>02</span>
        <div>
          <h2>서로에게 다정한 공간</h2>
          <p>
            다른 의견도 존중해 주세요. 비방, 사생활 침해, 개인정보 공유, 상업
            광고는 삼가 주세요.
          </p>
          <Link href="/rules" className="text-link">
            운영 규정(안) 전체 읽기 →
          </Link>
        </div>
      </section>
      <section id="photo-sharing">
        <span>03</span>
        <div>
          <h2>사진과 영상에는 출처를</h2>
          <p>
            직접 촬영했거나 공유가 허용된 자료를 올리고, 원본 출처와 촬영자를
            함께 적어 주세요.
          </p>
          <Link href="/gallery" className="text-link">
            다현의 순간들 보러 가기 →
          </Link>
        </div>
      </section>
      <section id="accurate-news">
        <span>04</span>
        <div>
          <h2>정확한 소식을 함께 나눠요</h2>
          <p>
            방송·공연 일정과 소식은 주최 측이나 공식 채널의 원문을 확인한 뒤
            공유해 주세요. 확인되지 않은 이야기는 사실처럼 전달하지 않아요.
          </p>
        </div>
      </section>
      <section id="find-your-board">
        <span>05</span>
        <div>
          <h2>필요한 게시판을 바로 찾아요</h2>
          <p>
            공연·행사와 방송은 일정 달력에서, 직접 보고 느낀 이야기는 후기
            게시판에서 나눠요. 기사·투표·스밍 정보에는 원문 링크를 남기고, 새
            일정은 일정 제보 게시판으로 알려 주세요.
          </p>
          <div className="about-board-links">
            <Link href="/schedule">소식 · 일정 →</Link>
            <Link href="/board/schedule-tip">일정 제보 →</Link>
            <Link href="/board/cheer">투표 · 스밍 응원 →</Link>
            <Link href="/board/question">질문 · 이용 문의 →</Link>
          </div>
        </div>
      </section>
      <p className="cafe-independence">
        찐팬들이 자발적으로 만드는 커뮤니티입니다. 소속사 공지와 참여 안내는{" "}
        <a href={officialResources.cafe} target="_blank" rel="noreferrer">
          김다현 공식 팬카페
        </a>
        의 원문을 함께 확인해 주세요.
      </p>
      <p className="image-credit">
        대문 속 김다현 사진: 그레인엔터테인먼트 제공 홍보 사진 ·{" "}
        <a
          href="https://www.mk.co.kr/jp/musics/11027670"
          target="_blank"
          rel="noreferrer"
        >
          사진 출처
        </a>
      </p>
    </article>
  );
}
