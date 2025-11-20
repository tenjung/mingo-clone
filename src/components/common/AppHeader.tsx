import { NavLink } from "react-router";
import { Button, Separator } from "../ui";
import useAuthStore from "@/store/authStore";
import supabase from "@/utils/supabase";

function AppHeader() {
  // zustand 스토어 useAuthStore에서 세션 로그아웃 가져옴
  const { session } = useAuthStore();
  // 세션 정보가 실제로 불러올때까지 기존 ui를 막는 변수
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
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
          {/* 로그인상태면 이메일과 로그아웃버튼 표시 로그아웃 상태면 로그인버튼만 */}
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-white">{session.user.email}</span>
              <Button variant="ghost" onClick={handleLogout} className="text-neutral-400 hover:text-white duration-300">
                로그아웃
              </Button>
            </div>
          ) : (
            // 로그아웃 상태는 로그인 버튼만 노출
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
