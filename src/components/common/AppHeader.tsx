import { NavLink } from "react-router";
import { Button, Separator } from "../ui";
import useAuthStore from "@/store/authStore";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

function AppHeader() {
  // zustand 스토어 useAuthStore에서 세션 로그아웃 가져옴
  const { session, logout, setSession } = useAuthStore();
  // 세션 정보가 실제로 불러올때까지 기존 ui를 막는 변수
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null); // 세션 정보가 있으면 저장 ?? 없으면 null
      setIsLoading(false); // 세션값 받아오면 로딩 종료
    });
    //인증 상태가 바뀔때 zustand 세션 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, [setSession]);

  // 새로고침시에 로그인이 잠시 나와서 로그인여부 로딩하는동안 표시중지
  if (isLoading) {
    return null; //
  }

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
          {/* 로그인상태면 이메일과 로그아웃버튼 표시 로그아웃 상태면 로그인버튼만 */}
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-white">{session.user.email}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  // 로그아웃 버튼을 누르면 zustand가 로그아웃을 실행하고 다시 ui를 바꿈
                  logout(); // Zustand의 logout 함수
                }}
                className="text-neutral-400 hover:text-white duration-300"
              >
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
