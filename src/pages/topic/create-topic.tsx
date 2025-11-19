import { useNavigate } from "react-router";
import { Button, Separator } from "@/components/ui";
import { Asterisk } from "lucide-react";

function CreateTopic() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[600px]">
      <form className="flex flex-1 gap-8 py-10">
        {/* Step 1*/}

        <section className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-amber-600">Step 1</span>
            <span>토픽 작성하기</span>
          </div>
          <Separator />
          <div>
            <label className="block mb-2">
              <div className="flex items-center gap-1 ">
                <Asterisk size={14} className="text-red-400" /> <span className="">제목</span>
              </div>
            </label>
            <input type="text" className="w-full p-4 rounded bg-neutral-900 text-white" placeholder="토픽 제목을 입력하세요." required />
          </div>
          <div>
            <label className=" block mb-2">
              <div className="flex items-center gap-1 ">
                <Asterisk size={14} className="text-red-400" /> <span className="">본문</span>
              </div>
            </label>
            <textarea rows={7} className="w-full p-4 rounded bg-neutral-900 text-white" placeholder="본문" required />
          </div>
        </section>

        {/* Step 2 */}
        <section className="min-w-[320px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-amber-600">Step 2</span>
            <span>카테고리 및 썸네일 등록</span>
          </div>
          <Separator />
          <div>
            <label className=" block mb-2">
              <div className="flex items-center gap-1 ">
                <Asterisk size={14} className="text-red-400" /> <span className="">카테고리</span>
              </div>
            </label>
            <select className="w-full p-2 rounded bg-neutral-900 text-white" required defaultValue="">
              <option value="" disabled>
                토픽(주제) 선택
              </option>
              <option value="인문학">인문학</option>
              <option value="스타트업">스타트업</option>
              <option value="IT·프로그래밍">IT·프로그래밍</option>
              <option value="서비스·전략 기획">서비스·전략 기획</option>
              <option value="마케팅">마케팅</option>
              <option value="디자인·일러스트">디자인·일러스트</option>
              <option value="자기계발">자기계발</option>
            </select>
          </div>
          <div>
            <label className=" block mb-2">
              <div className="flex items-center gap-1 ">
                <Asterisk size={14} className="text-red-400" /> <span className="">카테고리</span>
              </div>
            </label>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full min-h-[120px] flex items-center justify-center border rounded bg-neutral-900">
                <span className="text-neutral-400">이미지 없음</span>
              </div>
              <input type="file" accept="image/*" className="w-full" />
            </div>
          </div>
        </section>
      </form>

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-4 pb-8">
        <Button
          onClick={() => navigate("/")} // 홈페이지로 돌아감
          className="bg-neutral-700 text-white px-6 py-2 rounded"
        >
          취소
        </Button>
        <Button
          type="submit"
          className="bg-amber-600 text-black px-6 py-2 rounded font-bold"
          // 저장 연결 필요
        >
          저장
        </Button>
      </div>
    </div>
  );
}
export default CreateTopic;
