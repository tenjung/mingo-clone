import Link from "next/link";
import { ChevronDown, ScrollText } from "lucide-react";
import { cafe } from "@/domain/cafe";
import { cafeRuleChapters } from "@/data/cafe-rules";

export const metadata = {
  title: "운영 규정(안)",
  description: "김다현 찐팬카페의 회원 활동, 게시물, AI 창작물과 운영에 관한 규정안입니다.",
};

const essentials = [
  {
    title: "서로 존중하기",
    text: "욕설·비방·따돌림을 금지합니다. 다른 가수와 팬카페도 존중하고, 정치·종교적 갈등을 조장하지 않습니다.",
  },
  {
    title: "확인한 소식 나누기",
    text: "공연·방송·행사 소식에는 공식 원문을 남깁니다. 미확인 정보는 구분하고 잘못된 내용은 정정합니다.",
  },
  {
    title: "사진·영상의 권리 지키기",
    text: "공유할 권한이 있는 자료만 올립니다. 출처를 적는 것만으로 이용 허락을 대신할 수는 없습니다.",
  },
  {
    title: "AI 제작 사실 밝히기",
    text: "제목과 본문에 AI 제작 사실과 제작자를 표시합니다. 이미지에는 ‘AI 생성 이미지입니다’를 적고, 영상·음원·음성도 종류를 밝힙니다.",
  },
  {
    title: "개인정보와 사생활 보호하기",
    text: "동의 없는 연락처·주소·사적 대화·비공개 사진 공유를 금지합니다. 가수와 가족의 사생활도 존중합니다.",
  },
  {
    title: "공정하게 의견 나누기",
    text: "건설적인 비판과 이의 제기를 존중합니다. 중대한 제재 전에는 사유를 알리고 소명 기회를 부여합니다.",
  },
];

export default function Rules() {
  return (
    <article className="page-panel rules-panel" id="rules-top">
      <p className="breadcrumb">
        <Link href="/">카페홈</Link> › 운영 규정(안)
      </p>
      <header className="page-heading rules-heading">
        <div>
          <p className="tiny-label">{cafe.shortName} · 함께 지키는 약속</p>
          <h1>
            팬카페 운영 규정 <span className="rules-status">검토안</span>
          </h1>
          <p>서로의 마음과 권리를 지키며, 오래 함께 응원하기 위한 기준입니다.</p>
        </div>
        <ScrollText size={30} strokeWidth={1.2} aria-hidden="true" />
      </header>

      <aside className="rules-draft-note" aria-label="시행 전 검토 안내">
        <strong>아직 시행일이 정해지지 않은 운영안입니다.</strong>
        <p>
          회원 등급·회비·운영 조직과 의사결정 절차는 검토 단계입니다. 확정된 내용과
          시행일은 카페 공지로 안내하며, 아래 회비 조항은 현재 납부 안내가 아닙니다.
        </p>
        <Link href="/board/notice">카페 공지 확인 →</Link>
      </aside>

      <section className="rules-essentials" aria-labelledby="rules-essentials-title">
        <h2 id="rules-essentials-title">먼저 읽는 핵심 안내</h2>
        <p className="rules-section-note">자주 쓰는 이용 기준을 간단히 정리했습니다.</p>
        <ol>
          {essentials.map((item, index) => (
            <li key={item.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rules-full" aria-labelledby="rules-full-title">
        <h2 id="rules-full-title">전체 운영 규정안</h2>
        <p className="rules-section-note">
          총 10장 39조와 부칙입니다. 각 장을 눌러 조문을 펼쳐 보세요.
        </p>
        <div className="rules-chapters">
          {cafeRuleChapters.map((chapter) => (
            <details className="rules-chapter" key={chapter.id} id={chapter.id}>
              <summary>
                <span className="rules-chapter-number">{chapter.number}</span>
                <span className="rules-chapter-title">{chapter.title}</span>
                <span className="rules-article-count">{chapter.articles.length}개 조문</span>
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <div className="rules-articles">
                {chapter.id === "chapter-7" && (
                  <p className="rules-fee-note">
                    회비 금액과 납부·회계 기준은 검토안입니다. 시행 전 별도 확정과
                    공지, 정회원 가입 시 사전 동의가 필요합니다.
                  </p>
                )}
                {chapter.articles.map((article) => (
                  <section
                    className="rules-article"
                    id={`${chapter.id}-article-${article.number}`}
                    key={article.number}
                  >
                    <h3>제{article.number}조 ({article.title})</h3>
                    {article.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="rules-contact">
        <div>
          <strong>규정에 관한 의견이 있으신가요?</strong>
          <p>관련 조문과 함께 질문 · 이용 문의 게시판에 의견을 남겨 주세요.</p>
        </div>
        <Link className="button outline" href="/board/question">의견 남기기</Link>
      </div>
      <p className="rules-source-note">
        제공된 운영 규정 통합안을 바탕으로 카페 명칭과 소속사 관련 표현을 정리한
        검토안입니다. 공식 승인 여부는 확인되지 않았으며, 공식 팬카페 또는 소속사
        직영 조직임을 뜻하지 않습니다.
      </p>
      <a className="text-link rules-back-top" href="#rules-top">맨 위로 ↑</a>
    </article>
  );
}
