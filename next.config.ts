import type { NextConfig } from "next";

/**
 * GitHub Pages 的「專案頁」網址是 使用者名稱.github.io/<倉庫名>/，
 * 網站不是放在根目錄，所以要告訴 Next.js 這個前綴，CSS 與圖片才找得到。
 * 本機開發與 Cloudflare Pages（放在根目錄）不設這個變數，維持空字串。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /**
   * 靜態輸出：build 之後產生純 HTML / CSS / JS 到 out/，
   * 可以直接丟 Cloudflare Pages、GitHub Pages 等免費靜態空間，不需要 Node 伺服器。
   */
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  /** 靜態輸出沒有圖片最佳化伺服器，必須關掉 */
  images: { unoptimized: true },

  /** 每個路徑都輸出成資料夾 + index.html，靜態空間的路由才不會 404 */
  trailingSlash: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
