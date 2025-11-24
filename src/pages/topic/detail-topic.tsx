// 우리가 필요한 정보
// - title: 제목
// - created_at: 작성일
// - content: 내용
// - thumbnail: 썸네일
// - category: 카테고리

import { Button, Separator } from "@/components/ui";
import { ArrowLeft, Trash2 } from "lucide-react";

function DetailTopic() {
  return (
    <main className="w-full min-h-[720px] flex-1 flex justify-center pb-6">
      <div
        className="relative h-100 bg-cover bg-position-[50%_50%]"
        style={{ backgroundImage: "url(https://visfrfxelojrwaoyekfi.supabase.co/storage/v1/object/public/files/topics/gr4641CSaB7fikGSHtIQJ.png)" }}
      >
        <div className="relative z-20 flex flex-col gap-6">
          <div className="flex items-center gap-2 mt-6">
            {/* 뒤로 가기 */}
            <Button variant={"outline"} size={"icon"}>
              <ArrowLeft />
            </Button>
            {/* 삭제 */}
            <Button variant={"outline"} size={"icon"} className="bg-red-900/50!">
              <Trash2 />
            </Button>
          </div>
          <div className="flex flex-col items-center gap-6 mt-28">
            {/* 카테고리 */}
            <span># IT&middot;프로그래밍</span>
            {/* 제목 */}
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">MVP를 빠르게 검증하기 위한 UI 전략, Shadcn UI가 가져다 주는 기획자의 기민함</h1>
            <Separator className="w-6! bg-white" />
            {/* 작성일 */}
            <span>2025. 11. 24</span>
          </div>
        </div>

        {/* 좌, 우, 하단 그라데이션 */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-l from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>
      <div></div>
    </main>
  );
}

export default DetailTopic;
