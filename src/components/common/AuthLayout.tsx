import { Button } from "../ui/button";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 헤더-------------------------------- */}
      <header className="flex items-center justify-center h-20 w-full ">
        <div className="flex items-center justify-between w-full max-w-[1328px]">
          <div className="flex gap-4">
            <img src="src\assets\logo-sm.svg" alt="logo" />

            <nav className="flex gap-2">
              <a href="#">클래스</a>
              <a href="#">배움 노트</a>
              <span>|</span>
              <a href="#">토픽</a>
              <span>|</span>
              <a href="#">밍랩</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="#">로그인</a>
            <button>우리가 하는일</button>
          </div>
        </div>
      </header>

      {/* 메인-------------------------------------- */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>

      {/* 푸터---------------------------------- */}
      <footer className="w-full mt-8 border-t">
        <div className="max-w-[1328px] mx-auto px-4 py-8">
          {/* 1번재 줄 */}
          <div className="flex items-start justify-between mb-4">
            {/* 좌상단 */}
            <div className="flex flex-col gap-4">
              <span className="font-bold text-2xl">
                나의 학습 여정이, <br />
                나만의 창작으로 이어지는 플랫폼
              </span>
              <div className="flex gap-2">
                <Button>
                  <img src="src/assets/youtube.svg" alt="" className="w-8 h-8" />
                </Button>
                <Button>
                  {" "}
                  <img src="src/assets/threads.svg" alt="" className="w-8 h-8" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <a href="">이용약관</a>
              <span>|</span>
              <a href="">개인정보처리방침</a>
              <span>|</span>
              <a href="">클래스 론칭 문의</a>
            </div>
          </div>

          {/* 2번째 줄 */}
          <div className="flex items-start justify-between mb-4 border-t-1 pt-4">
            {/* 좌하단 고객센터 */}
            <div>
              <div className="font-semibold mb-1">고객센터</div>
              <div className="text-sm">평일 오전 9시 ~ 오후 6시</div>
              <div className="text-sm">문의: mingoteam@naver.com</div>
              <div className="mt-10">© Mingo Team all rights reserved</div>
            </div>

            {/* 우상단 사업자 정보 */}
            <div className="">
              <div className="font-semibold mb-1">사업자 정보</div>
              <div className="text-sm">대표이사: 박성재</div>
              <div className="text-sm">사업자 번호: 696-48-01248</div>
              <div className="text-sm">통신판매신고번호: 2025-서울서초-1014</div>
              <div className="text-sm">주소: 서울특별시 서초구 서초대로 15길 33</div>
              <div className="text-sm">대표번호: 070-8080-4429</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
