import Link from "next/link";
import { cafe } from "@/domain/cafe";

const guides = [
  {
    href: "/about#first-visit",
    title: `${cafe.shortName}에 오신 여러분, 환영합니다`,
  },
  { href: "/rules", title: "팬카페 운영 규정(안) · 가입·활동 전 읽어 주세요" },
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
