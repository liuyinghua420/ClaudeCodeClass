import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 py-10 bg-bg-subtle/50">
      <div className="max-w-content mx-auto px-4 md:px-8 text-sm text-text-secondary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-text-primary mb-3">学习路径</h4>
            <ul className="space-y-2">
              <li><Link href="/m/cognition" className="hover:text-accent">从头开始</Link></li>
              <li><Link href="/my" className="hover:text-accent">我的清单</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">资源</h4>
            <ul className="space-y-2">
              <li><Link href="/library" className="hover:text-accent">延伸阅读</Link></li>
              <li><Link href="/thinkers" className="hover:text-accent">思想家</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">关于</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-accent">本网页是什么</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">隐私声明</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-3">许可</h4>
            <ul className="space-y-2 text-xs">
              <li>代码: MIT</li>
              <li>内容: CC BY-NC-SA 4.0</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-xs text-text-muted leading-relaxed">
          <p className="mb-2">
            中文语境下"人生算法"概念的系统化表达,主要受到老喻 (喻颖正) 同名作品的启发。
            本网页为独立解读,不直接引用其原文。
          </p>
          <p>
            本网页所有用户数据仅存储于你的浏览器本地 (localStorage),不上传至任何服务器。
          </p>
        </div>
      </div>
    </footer>
  );
}
