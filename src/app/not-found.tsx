import Link from "next/link";
import { Flower2 } from "lucide-react";
export default function NotFound() {
  return (
    <div className="not-found">
      <Flower2 size={35} />
      <h1>페이지를 찾을 수 없어요.</h1>
      <p>주소를 확인하거나 카페홈에서 다시 시작해 주세요.</p>
      <Link className="button primary" href="/">
        카페홈으로
      </Link>
    </div>
  );
}
