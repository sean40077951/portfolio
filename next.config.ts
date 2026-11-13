import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 靜態輸出：build 之後產生純 HTML / CSS / JS 到 out/，
   * 可以直接丟 Cloudflare Pages、GitHub Pages 等免費靜態空間，不需要 Node 伺服器。
   */
  output: "export",

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
