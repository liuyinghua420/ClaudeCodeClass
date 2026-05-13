export const metadata = {
  title: "关于 — 人生算法",
};

export default function AboutPage() {
  return (
    <div className="max-w-prose mx-auto px-4 md:px-8 py-16 prose-content">
      <h1 className="text-h1 text-text-primary mb-6">关于本网页</h1>
      <p>
        这是一个让普通人从"听过人生算法"升级到"会用人生算法"的交互式学习产品。
      </p>
      <p>
        市面上的"人生算法"内容大都停留在"概念介绍"层面 — 听完很爽,合上书什么也带不走。
        本网页的所有设计,都试图回答一个问题:
        <strong>能否让一个抽象概念,变成你能'亲手验证'的东西?</strong>
      </p>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">本网页与"鸡汤"有什么不同</h2>
      <ul>
        <li>不靠故事,靠概念框架与跨学科证据</li>
        <li>每个观点可被反例修正,不"事后归因"</li>
        <li>关注"决策质量",不关注"成功秘籍"</li>
        <li>每个抽象概念都配一个交互式模拟器</li>
        <li>所有用户数据本地存储,不上传服务器</li>
      </ul>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">本网页不做什么</h2>
      <ul>
        <li>不做"测一测你的人生算法等级"这类娱乐化测试</li>
        <li>不引入 AI 聊天 (本期),避免遮蔽内容本身</li>
        <li>不做付费墙</li>
        <li>不收集你的任何数据,也不投放第三方广告</li>
      </ul>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">致谢</h2>
      <p>
        中文语境下"人生算法"概念的系统化表达,主要受到老喻 (喻颖正) 同名作品的启发。
        本网页为独立解读,不直接引用其原文。
      </p>
      <p>
        本网页整合了 12 位思想家、5 个学科领域、20+ 部经典文献的洞察。
        每一条引用都标注了出处,详见
        <a href="/library">延伸阅读</a> 与
        <a href="/thinkers">思想家专题</a>。
      </p>
      <h2 className="text-h2 text-text-primary mt-10 mb-4">许可</h2>
      <ul>
        <li>代码: MIT License</li>
        <li>原创内容: CC BY-NC-SA 4.0</li>
        <li>第三方引用: 遵循"合理使用"原则,长引一律先取得授权</li>
      </ul>
    </div>
  );
}
