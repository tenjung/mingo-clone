import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SignIn() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col min-w-[400px] p-6 gap-4">
        {/* 제목 */}
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">로그인</h1>
          <p className="text-sm text-gray-400">로그인을 위한 정보를 입력해주세요</p>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col gap-4">
          <Button className="bg-green-500 text-black">네이버 로그인</Button>
          <Button className="bg-yellow-300 text-black">카카오 로그인</Button>
          <Button className="bg-neutral-800 text-white">구글 로그인</Button>
        </div>

        <div className="text-center text-sm text-gray-400">
          <span className="px-3 bg-black text-gray-200 text-sm font-medium">OR CONTINUE WITH</span>
        </div>

        {/* 이메일 폼 */}
        <div className="flex flex-col gap-6">
          <div className="">
            <label htmlFor="email" className="font-medium text-sm">
              이메일
            </label>
            <Input type="email" placeholder="이메일을 입력하세요" className="mt-2" />
          </div>

          <div>
            <label htmlFor="password" className="font-medium text-sm">
              비밀번호
            </label>
            <Input type="password" placeholder="비밀번호를 입력하세요." className="mt-2" />
          </div>
          <Button className="bg-[#00598680]">로그인</Button>
        </div>

        {/* 회원가입 */}
        <p className="text-center text-sm ">
          계정이 없으신가요?{" "}
          <a href="#" className="underline">
            회원가입
          </a>
        </p>
      </div>
    </main>
  );
}

export default SignIn;
