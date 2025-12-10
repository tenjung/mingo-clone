import { Button } from "../ui";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const NAV_ITEMS = [
  { label: "소개", path: "/about" },
  { label: "갤러리", path: "/gallery" },
  { label: "자유게시판", path: "/board" },
  { label: "스케줄", path: "/schedule" },
];

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b shadow-sm bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 transition-colors duration-300">
      <div className="mx-auto max-w-7xl p-4 flex justify-between items-center h-16">
        {/* 팬페이지 로고/타이틀 */}
        <h1 className={`text-3xl font-extrabold tracking-tight`}>
          찐팬천사🪽 얼씨구 다현 <span className="text-xl text-yellow-500">✨</span>
        </h1>

        {/* 데스크톱 네비게이션 링크 */}
        <Menubar className="hidden md:flex border-none bg-transparent h-auto p-0 space-x-1">
          {NAV_ITEMS.map((item) => (
            <MenubarMenu key={item.path}>
              <MenubarTrigger
                // MenubarTrigger를 Button처럼 보이게 스타일링
                className={`cursor-pointer text-base font-medium py-2 px-3 rounded-lg data-[state=open]:bg-red-50 dark:data-[state=open]:bg-gray-700
                    text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 transition-colors`}
              >
                {item.label}
              </MenubarTrigger>
              {/* MenubarContent는 필요에 따라 서브 메뉴를 넣을 수 있습니다.
                // 현재는 단순 링크이므로 비워둡니다. */}
              {/* <MenubarContent>
                  <MenubarItem>서브 메뉴 예시</MenubarItem>
                </MenubarContent> */}
            </MenubarMenu>
          ))}
        </Menubar>

        {/* 로그인/가입 버튼 그룹 */}
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="border-red-400 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400">
            로그인
          </Button>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors">
            가입
          </Button>
        </div>
      </div>
    </header>

    //     <header className="fixed z-30 w-full h-12 min-h-12 flex items-center justify-center  px-6 bg-white dark:bg-gray-950">
    //       <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
    //         <div className="flex items-center gap-4 ">
    //           <img src="/public/logo-sm.svg" alt="@LOGO" className="w-6" />
    //           <NavLink to={"/"}>토픽 인사이트</NavLink>
    //           <Separator orientation="vertical" className="h-3!" />
    //           <NavLink to={"/user/:id/profile"}>프로필</NavLink>
    //           <Separator orientation="vertical" className="h-3!" />
    //           <NavLink to={"/"}>얼씨구 다현</NavLink>
    //         </div>
    //         <div className="flex items-center gap-4">
    //           {user ? (
    //             <div className="flex items-center gap-4">
    //               <span>{user.email}</span>
    //               <Separator orientation="vertical" className="h-3!" />
    //               <span className="cursor-pointer" onClick={reset}>
    //                 로그아웃
    //               </span>
    //             </div>
    //           ) : (
    //             <NavLink to={"/sign-in"} className="text-neutral-400 hover:text-white duration-300">
    //               로그인
    //             </NavLink>
    //           )}
    //           <Button variant="default" onClick={toggleTheme} className="p-2 border-white hover:bg-white hover:text-black transition">
    //             {theme === "dark" ? "라이트 모드" : "다크 모드"}
    //           </Button>
    //         </div>
    //       </div>
    //     </header>
  );
}

export { AppHeader };
