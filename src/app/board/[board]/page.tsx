import Link from "next/link";
import { notFound } from "next/navigation";
import { PencilLine, Search } from "lucide-react";
import { boardDescription, boardLabel, isBoard } from "@/domain/cafe";
import { listTopics } from "@/lib/repositories/topics";
import { PostRows, PhotoGrid } from "@/components/board-content";
import { CafeGuides } from "@/components/cafe-guides";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  return { title: boardLabel((await params).board) };
}

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { board } = await params;
  if (!isBoard(board)) notFound();
  const query = await searchParams;
  const search = (typeof query.q === "string" ? query.q : "").slice(0, 100);
  const page = Math.min(1000, Math.max(1, Math.floor(Number(query.page) || 1)));
  const result = await listTopics(board, search, page);
  const pages = Math.ceil(result.total / 12);
  const pageHref = (number: number) =>
    `/board/${board}?${new URLSearchParams({ q: search, page: String(number) })}`;
  return (
    <section className="page-panel">
      <p className="breadcrumb">
        <Link href="/">카페홈</Link>
        <span>›</span>
        {boardLabel(board)}
      </p>
      <div className="page-heading">
        <div>
          <h1>{boardLabel(board)}</h1>
          <p>{boardDescription(board)}</p>
        </div>
        {board !== "notice" && (
          <Link className="button primary" href={`/write?board=${board}`}>
            <PencilLine size={14} />
            글쓰기
          </Link>
        )}
      </div>
      <div className="board-toolbar">
        <span>
          {search ? `‘${search}’ 검색 결과` : "등록된 글"}{" "}
          <strong>{result.unavailable ? "—" : result.total}</strong>
        </span>
        <form role="search">
          <label className="sr-only" htmlFor="board-search">
            게시글 제목 검색
          </label>
          <input
            name="q"
            id="board-search"
            defaultValue={search}
            placeholder="제목으로 검색"
            maxLength={100}
          />
          <button aria-label="게시글 검색">
            <Search size={16} />
          </button>
        </form>
      </div>
      {board === "notice" && !search && <CafeGuides />}
      {board === "photo" ? (
        <PhotoGrid result={result} />
      ) : (
        <>
          <div className="post-table-head">
            <span>게시판</span>
            <span>제목</span>
            <span>작성일</span>
          </div>
          <PostRows result={result} />
        </>
      )}
      {pages > 1 && (
        <nav className="pagination" aria-label="게시판 페이지">
          {page > 1 && <Link href={pageHref(page - 1)}>이전</Link>}
          <span>
            {page} / {pages}
          </span>
          {page < pages && <Link href={pageHref(page + 1)}>다음</Link>}
        </nav>
      )}
      {search && (
        <Link className="text-link" href={`/board/${board}`}>
          검색 초기화
        </Link>
      )}
    </section>
  );
}
