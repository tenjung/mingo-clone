import Link from "next/link";
import { Flower2 } from "lucide-react";
import { signUp } from "@/application/auth";
import { ActionForm } from "@/components/action-form";

export const metadata = { title: "회원가입" };
export default function SignUp() {
  return (
    <section className="auth-panel">
      <Flower2 size={30} strokeWidth={1.1} />
      <p className="tiny-label">함께하는 마음</p>
      <h1>우리, 함께 응원해요.</h1>
      <p>김다현을 좋아하는 찐팬이라면, 함께해요.</p>
      <ActionForm action={signUp} submit="가입하기" pendingText="가입 중…">
        <label>
          닉네임
          <input
            name="nickname"
            autoComplete="nickname"
            placeholder="카페에서 사용할 이름"
            minLength={2}
            maxLength={20}
            required
          />
        </label>
        <label>
          이메일
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="인증 메일을 받을 주소"
            maxLength={254}
            required
          />
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="8자 이상 입력해 주세요"
            minLength={8}
            required
          />
        </label>
        <label>
          비밀번호 확인
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="한 번 더 입력해 주세요"
            minLength={8}
            required
          />
        </label>
        <p className="form-help">
          가입 후 이메일 인증이 필요할 수 있습니다.{" "}
          가입 전{" "}
          <Link href="/rules" target="_blank" rel="noreferrer">
            운영 규정(안) (새 창)
          </Link>
          과{" "}
          <Link href="/about" target="_blank" rel="noreferrer">
            카페 이용 안내 (새 창)
          </Link>
          를 확인해 주세요.
        </p>
      </ActionForm>
      <p className="auth-switch">
        이미 회원이신가요? <Link href="/sign-in">로그인</Link>
      </p>
    </section>
  );
}
