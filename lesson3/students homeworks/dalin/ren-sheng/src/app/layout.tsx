import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreHydrator } from "@/components/store-hydrator";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "人生算法 — 不是答案,是一种思考方式",
  description:
    "一个让普通人从'听过人生算法'升级到'会用人生算法'的交互式学习网页。7 个维度 / 8 个交互模拟器 / 一份可带走的清单。",
  openGraph: {
    title: "人生算法 — 交互式学习",
    description: "认知 · 决策 · 复利 · 选择 · 反馈 · 长期主义 · 风险",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <StoreHydrator />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
