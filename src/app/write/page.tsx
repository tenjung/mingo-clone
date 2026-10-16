import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/repositories/topics";
import { writableBoards } from "@/domain/cafe";
import { publishPost } from "@/application/posts";
import { ActionForm } from "@/components/action-form";

export const metadata = { title: "글쓰기" };
export default async function Write({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board } = await searchParams;
  const category = writableBoards.some((b) => b.id === board) ? board : "free";
  const user = await currentUser();
  if (!user)
    redirect(`/sign-in?next=${encodeURIComponent(`/write?board=${category}`)}`);
  return (
    <section className="page-panel write-panel">
      <p className="breadcrumb">
        <Link href="/">카페홈</Link> › 글쓰기
      </p>
      <div className="page-heading">
        <div>
          <h1>마음을 나누는 글쓰기</h1>
          <p>오늘의 이야기, 다현에게 전하고 싶은 마음을 남겨 주세요.</p>
        </div>
      </div>
      <aside className="write-rules-reminder" aria-label="게시물 작성 안내">
        <p>
          사진·영상은 공유 권한과 출처를 확인해 주세요. AI 창작물은 제목과 본문에
          제작 사실·콘텐츠 종류·제작자를 표시하고, 개인정보는 올리지 않습니다.
        </p>
        <Link href="/rules" target="_blank" rel="noreferrer">
          운영 규정(안) 확인 (새 창) →
        </Link>
      </aside>
      <ActionForm
        action={publishPost}
        submit="글 등록하기"
        pendingText="등록 중…"
      >
        <label>
          게시판
          <select name="category" defaultValue={category}>
            {writableBoards.map((b) => (
              <option value={b.id} key={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          제목
          <input
            name="title"
            placeholder="제목을 입력해 주세요"
            maxLength={100}
            required
          />
        </label>
        <label>
          본문
          <textarea
            name="content"
            rows={14}
            placeholder="서로를 배려하는 따뜻한 이야기를 나눠 주세요."
            maxLength={20000}
            required
          />
        </label>
        <p className="form-help">
          기사·투표·일정 제보에는 확인할 원문 링크와 날짜를 함께 적어 주세요.
          일정 제보는 원문 확인 후 일정 달력에 반영합니다.
        </p>
        <label>
          사진 첨부
          <input
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
          />
          <span className="form-help">
            JPG, PNG, WebP · 최대 5MB. 직접 촬영했거나 공유할 수 있는 사진을
            올려 주세요.
          </span>
        </label>
      </ActionForm>
    </section>
  );
}
