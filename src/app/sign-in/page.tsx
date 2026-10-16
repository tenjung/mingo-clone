import Link from "next/link";
import { Flower2 } from "lucide-react";
import { googleSignIn, signIn } from "@/application/auth";
import { ActionForm } from "@/components/action-form";
import { cafe, safeReturnPath } from "@/domain/cafe";

export const metadata = { title: "로그인" };

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; message?: string }>;
}) {
  const query = await searchParams;
  return (
    <section className="auth-panel">
      <Flower2 size={30} strokeWidth={1.1} />
      <p className="tiny-label">{cafe.shortName}</p>
      <h1>다시 만나 반가워요.</h1>
      <p>같은 마음을 나누는 {cafe.communityName}입니다.</p>
      {query.message && (
        <p className="form-message error" role="alert">
          {query.message === "logout-failed"
            ? "로그아웃에 실패했습니다. 다시 시도해 주세요."
            : "인증을 완료하지 못했습니다. 다시 로그인해 주세요."}
        </p>
      )}
      <ActionForm action={signIn} submit="로그인" pendingText="로그인 중…">
        <input type="hidden" name="next" value={safeReturnPath(query.next)} />
        <label>
          이메일
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일 주소"
            required
            maxLength={254}
          />
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            required
          />
        </label>
      </ActionForm>
      <div className="oauth-form">
        <ActionForm
          action={googleSignIn}
          submit="Google로 로그인"
          pendingText="연결 중…"
        >
          <input type="hidden" name="next" value={safeReturnPath(query.next)} />
        </ActionForm>
      </div>
      <p className="auth-switch">
        아직 회원이 아니신가요? <Link href="/sign-up">회원가입</Link>
      </p>
    </section>
  );
}
