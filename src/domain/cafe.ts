export const cafe = {
  name: "트롯 요정 김다현 찐팬카페",
  shortName: "김다현 찐팬카페",
  eyebrow: "트롯 요정",
  artist: "김다현",
  communityName: "김다현 찐팬 커뮤니티",
  description: "김다현을 진심으로 응원하는 찐팬 커뮤니티",
};

export const boards = [
  {
    id: "all",
    label: "전체글 보기",
    group: "카페",
    description: "찐팬들이 나누는 소식과 이야기를 모아 봅니다.",
  },
  {
    id: "notice",
    label: "카페 공지",
    group: "찐팬카페 안내",
    description: "찐팬카페 운영과 이용에 필요한 안내입니다.",
  },
  {
    id: "welcome",
    label: "가입인사",
    group: "찐팬카페 안내",
    description: "김다현을 좋아하게 된 이야기와 반가운 첫인사를 나눠 주세요.",
  },
  {
    id: "question",
    label: "질문 · 이용 문의",
    group: "찐팬카페 안내",
    description:
      "카페 이용이나 응원 방법이 궁금하다면 찐팬들에게 물어보세요. 개인정보는 적지 말아 주세요.",
  },
  {
    id: "news",
    label: "다현 소식 · 기사",
    group: "소식 · 일정",
    description: "김다현의 새 소식과 기사를 원문 링크와 함께 공유해 주세요.",
  },
  {
    id: "schedule-tip",
    label: "일정 제보",
    group: "소식 · 일정",
    description:
      "공연·행사·방송 소식을 날짜, 장소, 확인할 수 있는 원문 링크와 함께 제보해 주세요. 제보 글이 바로 확정 일정이 되지는 않습니다.",
  },
  {
    id: "cheer",
    label: "투표 · 스밍 응원",
    group: "함께하는 찐팬",
    description:
      "진행 중인 투표와 노래 듣기 정보를 나눠요. 참여 기간과 주최 측 원문을 함께 남겨 주세요.",
  },
  {
    id: "review",
    label: "공연 · 방송 후기",
    group: "함께하는 찐팬",
    description: "직접 다녀온 공연과 함께 본 방송의 감동을 나눠 주세요.",
  },
  {
    id: "free",
    label: "찐팬 자유게시판",
    group: "함께하는 찐팬",
    description: "다현 이야기부터 소소한 일상까지, 찐팬끼리 편하게 나눠요.",
  },
  {
    id: "letter",
    label: "다현에게",
    group: "함께하는 찐팬",
    description: "다현에게 전하고 싶은 찐팬들의 응원과 마음을 남겨 주세요.",
  },
  {
    id: "photo",
    label: "사진첩",
    group: "사진 · 영상",
    description: "공유가 허용된 다현의 사진을 출처와 함께 간직해요.",
  },
  {
    id: "video",
    label: "무대 · 방송 영상",
    group: "사진 · 영상",
    description: "다시 보고 싶은 무대와 방송의 원본 영상 링크를 공유해 주세요.",
  },
] as const;
export type BoardId = (typeof boards)[number]["id"];
export function boardLabel(id: string) {
  return boards.find((b) => b.id === id)?.label ?? "이전 게시글";
}
export function boardDescription(id: BoardId) {
  return boards.find((b) => b.id === id)!.description;
}
export function isBoard(id: string): id is BoardId {
  return boards.some((b) => b.id === id);
}
export const writableBoards = boards.filter(
  (b) => b.id !== "all" && b.id !== "notice",
);

export type NavigationId = BoardId | "calendar" | "live" | "broadcast" | "rules";
export interface NavigationItem {
  id: NavigationId;
  label: string;
  href: string;
}
function boardItem(id: BoardId): NavigationItem {
  return { id, label: boardLabel(id), href: `/board/${id}` };
}
export const navigationGroups: { label: string; items: NavigationItem[] }[] = [
  {
    label: "찐팬카페 안내",
    items: [
      boardItem("notice"),
      { id: "rules", label: "운영 규정(안)", href: "/rules" },
      boardItem("welcome"),
      boardItem("question"),
    ],
  },
  {
    label: "소식 · 일정",
    items: [
      boardItem("news"),
      { id: "calendar", label: "전체 일정 달력", href: "/schedule" },
      { id: "live", label: "공연 · 행사 일정", href: "/schedule?type=live" },
      { id: "broadcast", label: "방송 일정", href: "/schedule?type=broadcast" },
      boardItem("schedule-tip"),
    ],
  },
  {
    label: "함께하는 찐팬",
    items: [
      boardItem("cheer"),
      boardItem("review"),
      boardItem("free"),
      boardItem("letter"),
    ],
  },
  { label: "사진 · 영상", items: [boardItem("photo"), boardItem("video")] },
];

// These destinations were read from the reference cafe's public menu.
export const officialResources = {
  cafe: "https://m.cafe.daum.net/dahyun0223",
  schedule: "https://m.cafe.daum.net/dahyun0223/DR1U",
  performance: "https://m.cafe.daum.net/dahyun0223/DTyt",
  youtube: "https://www.youtube.com/channel/UCfZlsE2li3OVLyLcx-ffanA",
  instagram: "https://www.instagram.com/da_hyun_0223/",
};

export function safeReturnPath(value: unknown) {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !/[\u0000-\u001f\u007f]/.test(value)
    ? value
    : "/";
}
export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(new Date(date));
}
export function plainText(content: string): string {
  // Keep compatibility with the original BlockNote JSON, without shipping an editor to readers.
  try {
    const parsed: unknown = JSON.parse(content);
    if (!Array.isArray(parsed)) return content;
    const visit = (node: unknown): string => {
      if (typeof node === "string") return node;
      if (!node || typeof node !== "object") return "";
      const value = node as Record<string, unknown>;
      if (typeof value.text === "string") return value.text;
      return [value.content, value.children]
        .filter(Array.isArray)
        .map((items) => items.map(visit).join(""))
        .join("\n");
    };
    return parsed.map(visit).join("\n\n");
  } catch {
    return content;
  }
}
export function serializeContent(text: string) {
  return JSON.stringify(
    text.split("\n").map((line) => ({
      type: "paragraph",
      content: [{ type: "text", text: line, styles: {} }],
      children: [],
    })),
  );
}
