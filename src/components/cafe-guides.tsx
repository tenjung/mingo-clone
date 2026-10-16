import Link from "next/link";
import { cafe } from "@/domain/cafe";

const guides = [
  {
    href: "/about#first-visit",
    title: `${cafe.shortName}에 오신 여러분, 환영합니다`,
  },
  { href: "/about#cafe-promise", title: "서로를 배려하는 우리 카페의 약속" },
  {
    href: "/about#photo-sharing",
    title: "사진·영상을 나누기 전에 읽어 주세요",
  },
];

export function CafeGuides() {
  return (
    <div className="cafe-guides">
      {guides.map((guide) => (
        <Link href={guide.href} key={guide.href}>
          <span className="guide-label">안내</span>
          <span>{guide.title}</span>
          <span className="guide-required">필독</span>
        </Link>
      ))}
    </div>
  );
}
