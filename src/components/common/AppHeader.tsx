import { NavLink } from "react-router";
import { Button, Separator } from "../ui";

import { useTheme } from "../theme-provider";
import { useAuthStore } from "@/store/authStore";

function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { user, reset } = useAuthStore();

  // 버튼 클릭 시 다크/라이트 모드 토글
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed z-20 w-full h-12 min-h-12 flex items-center justify-center  px-6 bg-white dark:bg-gray-950">
      <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <img src="/public/logo-sm.svg" alt="@LOGO" className="w-6" />
          <NavLink to={"/"}>토픽 인사이트</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/user/:id/profile"}>프로필</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/"}>우리가 하는 일</NavLink>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span>{user.email}</span>
              <Separator orientation="vertical" className="h-3!" />
              <span className="cursor-pointer" onClick={reset}>
                로그아웃
              </span>
            </div>
          ) : (
            <NavLink to={"/sign-in"} className="text-neutral-400 hover:text-white duration-300">
              로그인
            </NavLink>
          )}
          <Button variant="default" onClick={toggleTheme} className="p-2 border-white hover:bg-white hover:text-black transition">
            {theme === "dark" ? "라이트 모드" : "다크 모드"}
          </Button>
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
