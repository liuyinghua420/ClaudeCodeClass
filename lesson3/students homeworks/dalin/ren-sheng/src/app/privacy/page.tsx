export const metadata = {
  title: "隐私声明 — 人生算法",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 md:px-8 py-16 prose-content">
      <h1 className="text-h1 text-text-primary mb-6">隐私声明</h1>
      <p>本网页对用户隐私的承诺非常简单:</p>
      <ul>
        <li><strong>无服务器存储:</strong> 你的所有反思、决策日志、模拟器历史,仅存储在你这台浏览器的 localStorage 里。</li>
        <li><strong>无登录系统:</strong> 你不需要注册任何账户。</li>
        <li><strong>无追踪 Cookie:</strong> 不使用任何分析工具的追踪 Cookie。</li>
        <li><strong>无第三方数据收集:</strong> 不接入 Google Analytics、Facebook Pixel、任何 SaaS 分析。</li>
        <li><strong>无广告:</strong> 不展示任何第三方广告。</li>
      </ul>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">这意味着什么</h2>
      <p><strong>好处:</strong> 你写下的所有思考,都是只属于你的。</p>
      <p>
        <strong>代价:</strong> 你换设备 / 浏览器 / 清缓存,数据就会丢失。
        我们提供 <a href="/my">JSON 导出 / 导入</a> 作为兜底:你可以把数据导出为本地文件,在新设备上导入。
      </p>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">数据可以删除吗</h2>
      <p>
        随时可以。在 <a href="/my">「我的清单」</a> 页底部,有"清空所有数据"按钮。
        操作不可撤销 — 如果担心丢失,先导出 JSON 备份。
      </p>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">如何确认上述承诺?</h2>
      <p>
        本网页代码以 MIT License 开源,你可以在仓库中验证本声明的真实性。
        服务器层面只有静态文件托管,没有任何数据接收端点。
      </p>
    </div>
  );
}
