import { ThemeProvider } from "@/components/theme-provider";
import { AppFooter, AppHeader } from "@/components/common";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full flex flex-col">
        <AppHeader />
        {/* 페이지별 콘텐츠 영역 */}
        <main className="w-full flex-1 flex justify-center">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
