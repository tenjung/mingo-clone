import { ChartNoAxesCombined, CodeXml, DraftingCompass, Footprints, Goal, Lightbulb, List, Rocket } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";
import { Separator } from "@radix-ui/react-separator";

export const CATEGORIES = [
  { icon: List, label: "전체", value: "" },
  { icon: Lightbulb, label: "인문학", value: "humidity" },
  { icon: Rocket, label: "스타트업", value: "start-up" },
  { icon: CodeXml, label: "IT·프로그래밍", value: "programming" },
  { icon: Goal, label: "서비스·전략 기획", value: "planning" },
  { icon: ChartNoAxesCombined, label: "마케팅", value: "marketing" },
  { icon: DraftingCompass, label: "디자인·일러스트", value: "design" },
  { icon: Footprints, label: "자기계발", value: "self-development" },
];

const ACCENT_COLOR_CLASS = "text-red-600 dark:text-red-400"; // 팬페이지 포인트 색상

// 최신 뉴스 및 공지 임시 데이터
const LATEST_NEWS = [
  { id: 1, title: "새 앨범 '청춘' 발매 기념 V라이브 안내", date: "2025.11.28" },
  { id: 2, title: "SBS 가요대전 스페셜 무대 팬 참여 신청", date: "2025.11.25" },
  { id: 3, title: "📸 다현 포토카드 나눔 이벤트 당첨자 발표", date: "2025.11.20" },
  { id: 4, title: "공식 팬클럽 5기 모집 기간 연장 공지", date: "2025.11.15" },
];

// 메인 캐러셀에 들어갈 임시 데이터
const PROMO_SLIDES = [
  { id: 1, alt: "김다현 - 청춘 (Cheongchun) 컨셉 포토", caption: "New Album '청춘' Release!", color: "bg-pink-500" },
  { id: 2, alt: "김다현 - 전국 투어 콘서트 '꿈'", caption: "2026 National Tour Concert 'DREAM'", color: "bg-indigo-500" },
  { id: 3, alt: "김다현 - 멜론 뮤직 어워드 대상 수상", caption: "MMA Daesang! Thank you Dahyun!", color: "bg-red-500" },
];

///////1130 작업
//

function App() {
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-12">
      {/* 1. 메인 프로모션 캐러셀 */}
      <section className="mt-6">
        <Carousel className="w-full max-w-full">
          <CarouselContent className="rounded-xl overflow-hidden shadow-2xl">
            {PROMO_SLIDES.map((item) => (
              <CarouselItem key={item.id}>
                {/* 캐러셀 슬라이드 내용 */}
                <div className={`relative aspect-16/6 md:aspect-16/5 flex items-center justify-center rounded-xl transition-all duration-500 ${item.color}`}>
                  {/* 임시 이미지/배너 영역 - 실제 이미지로 대체 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(https://placehold.co/1200x400/${item.color.slice(3, -4)}/ffffff?text=Dahyun+Official)` }}
                  ></div>

                  <div className="relative text-center p-6 sm:p-10 text-white">
                    <p className="text-sm font-light mb-2 opacity-80">PROMOTION</p>
                    <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight drop-shadow-lg">{item.caption}</h2>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg transition-transform hover:scale-[1.02]">
                      자세히 보기
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* 캐러셀 이동 버튼 */}
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <Separator />

      {/* 2. 주요 정보 섹션: 최신 뉴스 및 팬 활동 그리드 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📰 최신 뉴스 & 공지 카드 (더 넓은 영역 차지) */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg h-full transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-2xl font-bold ${ACCENT_COLOR_CLASS}`}>📌 최신 뉴스 & 공지</CardTitle>
              <Button variant="link" className="text-sm">
                전체보기 &rarr;
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {LATEST_NEWS.map((news) => (
                // hover 효과를 추가하여 클릭 가능한 요소임을 명시
                <div
                  key={news.id}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <span className="font-medium truncate text-gray-800 dark:text-gray-200">{news.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-4">{news.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 💬 커뮤니티 활동/바로가기 카드 */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full flex flex-col transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-700 dark:text-gray-300">🌟 팬 커뮤니티</CardTitle>
              <CardDescription>함께 응원하고 소통하며 추억을 공유해요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 grow">
              {/* 버튼에 강조 색상 적용 */}
              <Button className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors">자유게시판 (Talk)</Button>
              <Button className="w-full" variant="outline">
                팬아트 갤러리 🎨
              </Button>
              <Button className="w-full" variant="secondary">
                스케줄 확인하기 📅
              </Button>
            </CardContent>
            <CardFooter className="pt-4 border-t mt-auto">
              <p className="text-xs text-gray-500 dark:text-gray-400">로그인 후 모든 커뮤니티 활동에 참여하실 수 있습니다.</p>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      {/* 3. 소셜 미디어/공식 채널 바로가기 */}
      <section className="text-center py-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">공식 채널 바로가기</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {/* 각 버튼에 소셜 미디어 색상 적용 */}
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md min-w-[150px]">
            📺 YouTube
          </Button>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-md min-w-[150px]">
            📸 Instagram
          </Button>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md min-w-[150px]">
            💚 Official Cafe
          </Button>
          <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 min-w-[150px]">
            🔗 Other Links
          </Button>
        </div>
      </section>
    </main>

    // <div className="w-full max-w-[1328px] h-full flex items-start py-6 gap-6">
    //   <aside className="sticky top-18 w-60 min-w-60 hidden sm:flex flex-col gap-4">
    //     <div className="flex items-center gap-3">
    //       <p className="text-xl font-semibold">카테고리</p>
    //       <ChevronDown />
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       {/* 전체버튼 */}
    //       {CATEGORIES.map((item, index) => {
    //         const IconComponent = item.icon;
    //         const isActive = item.value === category;

    //         return (
    //           <Button
    //             key={index}
    //             className={`${isActive && "pl-6! text-white! bg-card!"} flex justify-start text-neutral-500 bg-transparent hover:bg-card hover:text-white hover:pl-6 duration-500`}
    //             onClick={() => handleCategoryChange(item.value)}
    //           >
    //             <IconComponent />
    //             {item.label}
    //           </Button>
    //         );
    //       })}
    //     </div>
    //   </aside>
    //   <div className="min-h-screen flex-1 flex flex-col gap-12">
    //     {/* 검색창 */}
    //     <section className="w-full flex flex-col items-center justify-center gap-6">
    //       <div className="flex flex-col">
    //         <div className="flex items-center gap-2">
    //           <img src="/gifs/heart.gif" alt="@HEART_GIFS" className="w-8" />
    //           <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">지식과 인사이트를 모아,</h3>
    //         </div>
    //         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">토픽으로 깊이 있게 나누세요!</h3>
    //       </div>
    //       {/* 검색창 */}
    //       <div className="w-full max-w-lg flex items-center gap-2 border py-2 pl-4 pr-3 rounded-full">
    //         <Search size={24} className="text-neutral-500 -mr-2" />
    //         <Input
    //           placeholder="관심 있는 클래스, 토픽 주제를 검색하세요."
    //           onChange={(event) => setSearchValue(event.target.value)}
    //           className="border-none bg-transparent! focus-visible:ring-0 placeholder:text-base"
    //         />
    //         <Button variant={"secondary"} className="rounded-full" onClick={handleSearch}>
    //           검색
    //         </Button>
    //       </div>
    //     </section>
    //     {/* HOT 토픽 */}

    //     <section className="flex flex-col gap-6">
    //       <div className="flex flex-col">
    //         <div className="flex items-center gap-2">
    //           <img src="/gifs/writing-hand.gif" alt="@WRITING-HAND_GIFS" className="w-7 mb-2" />
    //           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">HOT 토픽</h4>
    //         </div>
    //         <p className="text-neutral-500 text-base">지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를 얻어보세요.</p>
    //       </div>

    //       <div className="grid grid-cols-4 gap-6">
    //         <HotTopic />
    //         <HotTopic />
    //         <HotTopic />
    //         <HotTopic />
    //       </div>
    //     </section>
    //     {/* NEW 토픽 */}
    //     <section className="flex-1 flex flex-col gap-6">
    //       <div className="flex flex-col">
    //         <div className="flex items-center gap-2">
    //           <img src="/gifs/writing-hand.gif" alt="@WRITING-HAND" className="w-7 mb-2" />
    //           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">NEW 토픽</h4>
    //         </div>
    //         <p className="text-neutral-500 text-base">새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의 토픽을 작성해보세요.</p>
    //       </div>
    //       {topics.length === 0 ? (
    //         <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
    //           <img src="/vite.svg" alt="" className="w-6 h-6 opacity-50" />
    //           <p className="text-neutral-500/50">조회 가능한 데이터가 없습니다.</p>
    //         </div>
    //       ) : (
    //         <div className="grid grid-cols-2 gap-6">
    //           {/* 둘 중 하나의 방법으로 최신순으로 나열한다. */}
    //           {/* {topics
    //             .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    //             .map((topic) => (
    //               <NewTopic props={topic} />
    //             ))} */}
    //           {[...topics].reverse().map((topic) => (
    //             <NewTopic props={topic} />
    //           ))}
    //         </div>
    //       )}
    //     </section>
    //   </div>
    //   <Button className="fixed bottom-6 left-1/2 transform -translate-x-1/2 py-5! px-5! rounded-full" onClick={moveToPage}>
    //     <PencilLine />
    //     토픽 작성하기
    //   </Button>
    // </div>
  );
}

export default App;
