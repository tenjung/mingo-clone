import { NavLink } from "react-router";
import { Separator } from "../ui";

function AppHeader() {
  return (
    <header className="w-full h-12 flex items-center justify-center bg-[#121212] px-6">
      <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <img src="" alt="@LOGO" /> */}
          <NavLink to={"/"}>토픽 인사이트</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/user/:id/profile"}>프로필</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/sign-in"} className="text-neutral-400 hover:text-white duration-300">
            로그인
          </NavLink>
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
