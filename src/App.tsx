import { ChartNoAxesCombined, ChevronDown, CodeXml, DraftingCompass, Footprints, Goal, Lightbulb, List, Rocket } from "lucide-react";
import { Button } from "./components/ui";

const CATEGORIES = [
  // { icon: List, label: "전체" },
  { icon: Lightbulb, label: "인문학" },
  { icon: Rocket, label: "스타트업" },
  { icon: CodeXml, label: "IT·프로그래밍" },
  { icon: Goal, label: "서비스·전략 기획" },
  { icon: ChartNoAxesCombined, label: "마케팅" },
  { icon: DraftingCompass, label: "디자인·일러스트" },
  { icon: Footprints, label: "자기계발" },
];

function App() {
  return (
    <div className="w-full max-w-[1328px] h-full flex items-start py-6 gap-6">
      <aside className="w-60 min-w-60 hidden sm:flex flex-col gap-4">
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
              <Button className="flex justify-start text-neutral-500 bg-transparent hover:bg-card hover:text-white hover:pl-6 duration-500">
                <IconComponent />
                {category.label}
              </Button>
            );
          })}
        </div>
      </aside>
      <div className="min-h-screen flex-1 flex flex-col gap-12">
        {/* 검색창 */}
        <section className="flex-1 flex items-center justify-center bg-gray-400">검색창</section>
        {/* HOT 토픽 */}
        <section className="flex-1 flex items-center justify-center bg-gray-500">핫 토픽</section>
        {/* NEW 토픽 */}
        <section className="flex-1 flex items-center justify-center bg-gray-600">뉴 토픽</section>
      </div>
    </div>
  );
}

export default App;
