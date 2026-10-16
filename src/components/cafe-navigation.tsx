"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  CalendarRange,
  ChevronRight,
  Heart,
  HelpCircle,
  Image,
  LayoutList,
  Mail,
  Megaphone,
  MessageCircle,
  Music2,
  Newspaper,
  Radio,
  ScrollText,
  Send,
  Tv,
  UserRoundPlus,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  navigationGroups,
  type NavigationId,
  type NavigationItem,
} from "@/domain/cafe";
import { scheduleType } from "@/domain/schedule";

const icons: Record<NavigationId, LucideIcon> = {
  all: LayoutList,
  notice: Megaphone,
  rules: ScrollText,
  welcome: UserRoundPlus,
  question: HelpCircle,
  news: Newspaper,
  "schedule-tip": Send,
  calendar: CalendarDays,
  live: CalendarRange,
  broadcast: Tv,
  cheer: Radio,
  review: Music2,
  free: MessageCircle,
  letter: Mail,
  photo: Image,
  video: Video,
};

export function CafeNavigation() {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentType = scheduleType(params?.get("type"));
  const active = (href: string) => {
    const [path, query] = href.split("?");
    return (
      pathname === path &&
      (path !== "/schedule" ||
        currentType === scheduleType(new URLSearchParams(query).get("type")))
    );
  };
  const itemLink = (item: NavigationItem) => {
    const Icon = icons[item.id];
    return (
      <Link
        key={item.id}
        href={item.href}
        aria-current={active(item.href) ? "page" : undefined}
      >
        <Icon size={15} strokeWidth={1.6} />
        <span>{item.label}</span>
        {item.id === "letter" && <Heart className="nav-heart" size={11} />}
      </Link>
    );
  };
  return (
    <nav aria-label="찐팬카페 게시판" className="board-nav">
      <div className="nav-all">
        {itemLink({ id: "all", label: "전체글 보기", href: "/board/all" })}
      </div>
      {navigationGroups.map((group) => (
        <div className="navigation-group" key={group.label}>
          <p className="nav-group">
            {group.label}
            <ChevronRight size={12} />
          </p>
          <div className="navigation-items">{group.items.map(itemLink)}</div>
        </div>
      ))}
      <Link
        href="/about"
        aria-current={pathname === "/about" ? "page" : undefined}
      >
        <BookOpen size={15} strokeWidth={1.6} />
        찐팬카페 이용 안내
      </Link>
    </nav>
  );
}
