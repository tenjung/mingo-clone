import useAuthStore from "./store/authStore";
import { ChartNoAxesCombined, ChevronDown, CodeXml, DraftingCompass, Footprints, Goal, Lightbulb, List, PencilLine, Rocket, Search } from "lucide-react";
import { Button, Input } from "./components/ui";
import { HotTopic, NewTopic } from "./components/topic";
import { useNavigate } from "react-router";

import { toast } from "sonner";
import { CATEGORIES } from "./constants";

function App() {
  const navigate = useNavigate();
  const { session, setSession } = useAuthStore();

  const moveToPage = () => {
    if (!session) {
      toast.warning("토픽 작성은 로그인 후 이용 가능합니다.");
      return;
    }
    navigate("/create-topic");
  };

  return (
    <div className="w-full max-w-[1328px] h-full flex items-start py-6 gap-6">
      <aside className="sticky top-18 w-60 min-w-60 hidden sm:flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <p className="text-xl font-semibold">카테고리</p>
          <ChevronDown />
        </div>
        <div className="flex flex-col gap-2">
          <Button className="flex justify-start text-white bg-card hover:bg-card hover:text-white hover:pl-6 duration-500">
            <List />
            전체
          </Button>
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button key={category.label} className="flex justify-start text-neutral-500 bg-transparent hover:bg-card hover:text-white hover:pl-6 duration-500">
                <IconComponent />
                {category.label}
              </Button>
            );
          })}
        </div>
      </aside>
      <div className="min-h-screen flex-1 flex flex-col gap-12">
        {/* 검색창 */}
        <section className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/gifs/heart.gif" alt="@HEART_GIFS" className="w-8" />
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">지식과 인사이트를 모아,</h3>
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">토픽으로 깊이 있게 나누세요!</h3>
          </div>
          {/* 검색창 */}
          <div className="w-full max-w-lg flex items-center gap-2 border py-2 pl-4 pr-3 rounded-full">
            <Search size={24} className="text-neutral-500 -mr-2" />
            <Input placeholder="관심 있는 클래스, 토픽 주제를 검색하세요." className="border-none bg-transparent! focus-visible:ring-0 placeholder:text-base" />
            <Button variant={"secondary"} className="rounded-full">
              검색
            </Button>
          </div>
        </section>
        {/* HOT 토픽 */}

        <section className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/gifs/writing-hand.gif" alt="@WRITING-HAND_GIFS" className="w-7 mb-2" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">HOT 토픽</h4>
            </div>
            <p className="text-neutral-500 text-base">지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를 얻어보세요.</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <HotTopic />
            <HotTopic />
            <HotTopic />
            <HotTopic />
          </div>
        </section>
        {/* NEW 토픽 */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/gifs/writing-hand.gif" alt="@WRITING-HAND" className="w-7 mb-2" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">NEW 토픽</h4>
            </div>
            <p className="text-neutral-500 text-base">새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의 토픽을 작성해보세요.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <NewTopic />
            <NewTopic />
            <NewTopic />
            <NewTopic />
          </div>
        </section>
      </div>
      <Button className="fixed bottom-6 left-1/2 transform -translate-x-1/2 py-5! px-5! rounded-full" onClick={moveToPage}>
        <PencilLine />
        토픽 작성하기
      </Button>
    </div>
  );
}

export default App;
