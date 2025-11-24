import { BadgeCheck, CaseSensitive, ChartNoAxesColumnIncreasing, Heart, MessageCircleMore } from "lucide-react";
import { Card, Separator } from "../ui";
import { UserInfo } from "./user-info";
import { AppTextEditor } from "@/components/common";

interface Props {
  props: Topic;
}

// 메인 페이지의 NEW 토픽 카드 UI에서 해당 토픽의 내용을 일부분 미리보기로
// 유저가 볼 수 있게 하기 위해 Blocknote가 가진 Block[] 타입에서
// text 요소만 추출하여 UI 구조에 맞게 설정
// 과제//////////////////////////////////////////////////////////////////
// AI쓰지말고 직접 작성
// string으로 저장되어있는 content 데이터를 가져오면서 배열형식으로 바꿔줘야함 JSON을 사용
function extractTextfromContent(content, maxChars = 200) {
  //extractTextfromContent 본문 content 호출하는 함수 지정
  // 매개변수 content , maxChars 최대길이 설정하는 매개변수인데 200까지로 설정
  const parsed = JSON.parse(content);
  // 변수선언함 parsed로  = JSON.prase를 쓰면 supabase에 string타입인 content항목을 배열로 변환함

  console.log(parsed);
  //////////////////////////////////////////////////////////////////
  let result = "";

  for (const block of parsed) {
    if (Array.isArray(block.content)) {
      for (const child of block.content) {
        if (child.text) {
          result += child.text + " "; // " " 이 코드의 의미는 띄워쓰기 => child.text가 띄워쓰기 없이 쭉 붙어서 출력됨을 방지

          if (result.length >= maxChars) {
            return result.slice(0, maxChars);
          }
        }
      }
    }
  }

  return result.trim();
}

function NewTopic({ props }: Props) {
  return (
    <Card className="p-4 gap-4">
      <div className="h-fit flex items-center gap-4">
        <div className="h-full flex flex-col justify-between">
          {/* 제목 */}
          <div className="flex flex-col">
            <CaseSensitive size={16} className="text-neutral-500" />
            <p className="font-semibold text-base line-clamp-2">{props.title}</p>
          </div>
          {/* 본문 */}
          <p className="text-neutral-500 line-clamp-3">{extractTextfromContent(props.content)}</p>
        </div>
        <div className="w-35 min-w-35 bg-accent rounded-md">
          {/* <img src="/vite.svg" alt="@SAMPLE_IMAGE" className="w-35 min-w-35 bg-accent rounded-md" /> */}
          <img src={props.thumbnail} alt="@SAMPLE_IMAGE" className="w-full min-h-35 bg-accent rounded-md object-cover" />
        </div>
      </div>
      <Separator />
      <div className="flex items-end justify-between">
        <UserInfo />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ChartNoAxesColumnIncreasing size={14} />
              <p>24</p>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircleMore size={14} />
              <p>0</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-3!" />
          <div className="flex items-center gap-1">
            <Heart size={14} className="text-rose-500" />
            <p>1</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export { NewTopic };
