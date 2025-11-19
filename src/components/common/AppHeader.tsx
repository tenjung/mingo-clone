import { NavLink } from "react-router";
import { Button, Separator } from "../ui";
import useAuthStore from "@/store/authStore";

function AppHeader() {
  const { session, logout } = useAuthStore();
  console.log("session:", session); // 로그인이 잘되었나 체크 로그아웃 상태면 null이 나옴
  return (
    <header className="fixed z-20 w-full h-12 min-h-12 flex items-center justify-center bg-[#121212] px-6">
      <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to={"/"}>
            <img src="/logo-sm.svg" alt="@LOGO" className="w-6" />
          </NavLink>
          <NavLink to={"/"}>토픽 인사이트</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/user/:id/profile"}>프로필</NavLink>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-white">{session.user.email}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  // 로그아웃 버튼을 누르면 zustand가 로그아웃을 실행하고 다시 ui를 바꿈
                  logout(); // Zustand 스토어의 logout 함수
                }}
                className="text-neutral-400 hover:text-white duration-300"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <NavLink to={"/sign-in"} className="text-neutral-400 hover:text-white duration-300">
              로그인
            </NavLink>
          )}
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/"} className="text-neutral-400 hover:text-white duration-300">
            우리가 하는 일
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
