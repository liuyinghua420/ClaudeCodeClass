import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-4 md:px-8 py-32 text-center">
      <h1 className="text-display text-accent mb-4">404</h1>
      <p className="text-h3 text-text-primary mb-2">这个页面不在地图上。</p>
      <p className="text-text-secondary mb-8">
        但你不在地图上,也不一定意味着你迷路了。
      </p>
      <Link href="/">
        <Button>回到首页</Button>
      </Link>
    </div>
  );
}
