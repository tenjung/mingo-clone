import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { AppFooter, AppHeader } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import supabase from "@/utils/supabase";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";

function RootLayout() {
  const { session, setSession } = useAuthStore();
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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen flex flex-col">
        <AppHeader />
        {/* 페이지별 콘텐츠 영역 */}
        <main className="mt-12 w-full flex-1 flex justify-center">
          <Outlet />
        </main>
        <AppFooter />
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
