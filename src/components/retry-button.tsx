"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";

export function RetryButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      className="retry-button"
      disabled={pending}
      onClick={() => startTransition(() => router.refresh())}
    >
      <RefreshCw size={12} />
      {pending ? "불러오는 중…" : "다시 불러오기"}
    </button>
  );
}
