import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { boardLabel, dateLabel, plainText } from "@/domain/cafe";
import { currentUser, findTopic } from "@/lib/repositories/topics";
import { deletePost } from "@/application/posts";
import { ActionForm } from "@/components/action-form";
import { RetryButton } from "@/components/retry-button";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { topic, unavailable } = await findTopic(id);
  if (unavailable)
    return (
      <div className="page-panel">
        <h1>게시글을 불러오지 못했어요.</h1>
        <p>잠시 후 다시 시도해 주세요.</p>
        <RetryButton />
      </div>
    );
  if (!topic) notFound();
  const user = await currentUser();
  return (
    <article className="page-panel article-panel">
      <p className="breadcrumb">
        <Link href={`/board/${topic.category}`}>
          {boardLabel(topic.category)}
        </Link>{" "}
        › 게시글
      </p>
      <header>
        <span className="small-tag">{boardLabel(topic.category)}</span>
        <h1>{topic.title}</h1>
        <p>
          <time dateTime={topic.created_at}>{dateLabel(topic.created_at)}</time>
        </p>
      </header>
      {topic.thumbnail && (
        <img
          className="article-photo"
          src={topic.thumbnail}
          alt={topic.title}
        />
      )}
      <div className="article-content">{plainText(topic.content)}</div>
      {user?.id === topic.author && (
        <details className="post-management">
          <summary>내 글 관리</summary>
          <p>삭제한 글은 복구할 수 없습니다.</p>
          <ActionForm action={deletePost} submit="내 글 삭제하기">
            <input type="hidden" name="id" value={topic.id} />
            <label className="confirm-delete">
              <input name="confirmed" type="checkbox" value="yes" required />이
              글을 삭제하겠습니다.
            </label>
          </ActionForm>
        </details>
      )}
      <Link className="button outline" href="/board/all">
        <ArrowLeft size={14} />
        목록으로
      </Link>
    </article>
  );
}
