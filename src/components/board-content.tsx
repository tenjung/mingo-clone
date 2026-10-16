import Link from "next/link";
import { ArrowRight, Camera, ChevronRight, FileText } from "lucide-react";
import { boardLabel, dateLabel } from "@/domain/cafe";
import type { TopicsResult } from "@/lib/repositories/topics";
import { RetryButton } from "./retry-button";

export function SectionHeading({
  title,
  caption,
  href,
}: {
  title: string;
  caption?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        {title}
        {caption && <span>{caption}</span>}
      </h2>
      {href && (
        <Link href={href}>
          더보기
          <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

export function EmptyPosts({
  unavailable,
  compact = false,
}: {
  unavailable: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`empty-posts ${compact ? "compact" : ""}`}>
      <FileText size={23} strokeWidth={1.25} />
      <strong>
        {unavailable
          ? "게시글을 불러오지 못했어요."
          : "아직 등록된 글이 없어요."}
      </strong>
      <p>
        {unavailable
          ? "잠시 후 다시 방문해 주세요."
          : "우리의 첫 이야기를 남겨 주세요."}
      </p>
      {unavailable ? (
        <RetryButton />
      ) : (
        <Link href="/write">
          첫 글 남기기
          <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

export function PostRows({
  result,
  compact = false,
}: {
  result: TopicsResult;
  compact?: boolean;
}) {
  if (!result.topics.length)
    return <EmptyPosts unavailable={result.unavailable} compact={compact} />;
  return (
    <div className="post-list">
      {result.topics.map((post) => (
        <Link key={post.id} href={`/topic/${post.id}`} className="post-row">
          <span className="post-category">{boardLabel(post.category)}</span>
          <span className="post-title">{post.title}</span>
          <time dateTime={post.created_at}>{dateLabel(post.created_at)}</time>
        </Link>
      ))}
    </div>
  );
}

export function PhotoGrid({ result }: { result: TopicsResult }) {
  if (!result.topics.length)
    return (
      <div className="photo-empty">
        <div className="photo-empty-frame">
          <Camera size={26} strokeWidth={1} />
          <span>다현의 순간</span>
        </div>
        <div>
          <strong>좋아하는 순간을 오래도록</strong>
          <p>
            {result.unavailable
              ? "지금은 사진첩에 연결할 수 없어요."
              : "함께 간직하고 싶은 다현의 사진을 올려 주세요."}
          </p>
          <Link href="/write?board=photo">
            사진 올리기 <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    );
  return (
    <div className="photo-grid">
      {result.topics.map((post) => (
        <Link href={`/topic/${post.id}`} key={post.id} className="photo-item">
          {post.thumbnail ? (
            <img src={post.thumbnail} alt={post.title} loading="lazy" />
          ) : (
            <div className="photo-placeholder">
              <Camera size={25} />
            </div>
          )}
          <strong>{post.title}</strong>
          <time dateTime={post.created_at}>{dateLabel(post.created_at)}</time>
        </Link>
      ))}
    </div>
  );
}
