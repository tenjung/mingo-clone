import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";

function SignUp() {
  return (
    <div className="min-w-sm mx-auto py-8 px-6 bg-black text-white">
      {/* 제목 */}
      <div className="space-y-2 mb-6">
        <h1 className="font-bold text-2xl">회원가입</h1>
        <p className="text-sm text-gray-300">회원가입을 위한 정보를 입력해주세요.</p>
      </div>

      <form className="">
        {/* 인풋 묶음 */}
        <div className="space-y-6">
          {/* 이메일 입력 */}
          <div className="">
            <label htmlFor="email" className="block text-[15px] font-medium">
              <span className="text-[#f96859] mr-1">*</span> 이메일
            </label>
            <div className="flex gap-2">
              <Input type="email" id="email" placeholder="이메일을 입력하세요." />
              <Button type="button" className="text-white bg-[#222] px-4 py-1 rounded">
                본인 인증
              </Button>
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-[15px] font-medium">
              <span className="text-[#f96859] mr-1">*</span> 비밀번호
            </label>
            <div className="">
              <Input type="password" id="password" placeholder="비밀번호를 입력하세요." disabled />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-[15px] font-medium">
              <span className="text-[#f96859] mr-1">*</span> 비밀번호 확인
            </label>
            <div className="flex items-center">
              <Input type="password" id="confirmPassword" placeholder="비밀번호 확인을 입력하세요." disabled />
            </div>
          </div>
        </div>

        {/* 필수 동의 */}
        <div className="mt-4">
          <span className="text-[#f96859] mr-1 text-base">*</span>
          <span className="text-gray-200 font-semibold">필수 동의항목</span>
          <div className="mt-2 space-y-2 border-b border-[#333] pb-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                서비스 이용약관 동의
              </label>
              <button type="button" className="text-xs text-gray-400 flex items-center gap-1">
                자세히 <span>›</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                개인정보 수집 및 이용동의
              </label>
              <button type="button" className="text-xs text-gray-400 flex items-center gap-1">
                자세히 <span>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* 선택 동의 */}
        <div className="mt-4">
          <span className="text-gray-200 font-semibold">선택 동의항목</span>
          <div className="mt-2 space-y-2 border-b border-[#333] pb-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                마케팅 및 광고 수신 동의
              </label>
              <button type="button" className="text-xs text-gray-400 flex items-center gap-1">
                자세히 <span>›</span>
              </button>
            </div>
          </div>
        </div>
        {/* 회원가입 */}
        <div className="flex gap-2 mt-6">
          <Button type="button" className="py-2 rounded text-white">
            <ArrowLeftIcon className="" />
          </Button>
          <Button type="submit" className="flex-1 py-2 rounded bg-green-950 text-white font-semibold">
            회원가입
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          이미 계정이 있으신가요?
          <a href="/sign-in" className="underline ml-1 text-gray-200">
            로그인
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
