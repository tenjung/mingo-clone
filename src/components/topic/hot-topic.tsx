import { Card } from "../ui";
import { UserInfo } from "./user-info";

function HotTopic() {
  return (
    <Card className="p-0 border-0 bg-transparent ">
      <div className="relative">
        <img src="https://placehold.co/500?text=HOT" alt="@BG-SAMPLE" className="h-70 rounded-lg" />
        <p className="absolute bottom-4 z-10 px-4 font-semibold text-xl line-clamp-2">
          HOT Topic 제목 조회 테스트 문구입니다. NEW Topic 제목 조회 테스트 문구입니다. NEW Topic 제목 조회 테스트 문구입니다. NEW Topic 제목 조회 테스트 문구입니다. NEW Topic 제목 조회 테스트
          문구입니다.
        </p>
        <div
          className=" absolute inset-0
    bg-gradient-to-t
    from-white/50 via-white/50 to-transparent
    dark:from-black/50 dark:via-black/50 dark:to-transparent
    rounded-b-lg"
        ></div>
      </div>
      <div className="p-4">
        <UserInfo />
      </div>
    </Card>
  );
}

export { HotTopic };
