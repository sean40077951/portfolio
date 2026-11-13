# 作品集網站

Next.js 16 + TypeScript + Tailwind CSS v4，以**靜態輸出**（`output: "export"`）建置。
`npm run build` 產出的是純 HTML / CSS / JS，可直接丟到 Cloudflare Pages、GitHub Pages 等免費靜態空間。

> **這是作品集，不是履歷。**
> 版面的主角是作品畫面與做出來的功能，所以網站上刻意沒有技能條、年資、學歷與經歷時間軸。
> 需要那些東西的話，它們屬於另外一份履歷。

## 開發

```bash
npm run dev     # 本機開發 http://localhost:3000
npm run build   # 產生靜態網站到 out/
npm run lint    # 檢查程式碼
```

預覽建置後的真實結果：`npm run build` 然後 `npx serve out`。

## 目錄結構

```
src/
├─ app/                     # 路由
│  ├─ page.tsx              # 首頁：開場兩句 + 作品
│  ├─ projects/page.tsx     # 作品列表
│  ├─ projects/[slug]/      # 案例頁（共用模板）
│  ├─ layout.tsx            # 全站框架、字型、主題
│  └─ globals.css           # 色票與共用樣式
├─ components/              # 共用元件
└─ content/                 # ★ 平常只需要改這裡
   ├─ site.ts               # 自我介紹、聯絡方式
   ├─ types.ts              # 內容欄位定義（每個欄位都有註解）
   └─ projects/
      ├─ index.ts           # 作品清單（決定顯示順序）
      ├─ sports-scheduling.ts
      └─ kid-exhibition.ts
```

## 新增一個作品

1. 複製 `src/content/projects/sports-scheduling.ts`，改名成新案例的檔名。
2. 照 `src/content/types.ts` 的欄位填內容。
3. 到 `src/content/projects/index.ts` import 進來，加進 `projects` 陣列。

不用改任何版面或元件。想讓它出現在首頁，加上 `featured: true`。

### 案例頁的內容順序

順序是刻意的：**封面圖 → 成果 → 這是什麼 → 章節（一章一個功能主題）→ 那些小地方 → 還沒做完的部分**。

這個結構參考了幾個公認做得好的工程師作品集（Emil Kowalski、Brittany Chiang），歸納出三件事：

1. **成果擺最前面。** 不要讓人讀到最後才知道這東西有沒有用。有真實數字就放數字。
2. **章節用功能主題切，不要用「背景／挑戰／解法」。** 那種標題像課堂報告。直接寫「漏排師資提醒」「名額不會超賣」，每一章配一張畫面。
3. **每一章都要寫取捨。** 「我選了 A」不值錢，「我本來要用 B，但 B 在某情況下會壞，所以改用 A」才值錢。寫案例時刻意把否決掉的方案寫進去。

`details`（那些小地方）這一段也是學來的——小細節最能看出做工，而且是別人抄不走的部分。

## 截圖怎麼拍

**圖是這個網站的主角，值得花時間拍好。**

- 圖片放 `public/projects/<專案代號>/`，檔名用英數字（中文檔名在某些靜態空間會出問題）
- 桌機畫面：瀏覽器 F12 → `Ctrl+Shift+M` → 寬度設 **1440** → `Ctrl+Shift+P` 輸入 `screenshot` → 「Capture screenshot」
- 手機畫面：同上，裝置選 **iPhone 14 Pro**
- **畫面裡要有資料**，空白的表格與列表完全沒有說服力
- 關掉會跑進畫面的瀏覽器擴充套件

填進 `shots` 時 `width` / `height` 是必填的，先寫死尺寸瀏覽器才能預留空間，圖載入時版面不會跳動。取得 PNG 尺寸：

```bash
node -e "const b=require('fs').readFileSync('圖檔.png');console.log(b.readUInt32BE(16)+'x'+b.readUInt32BE(20))"
```

每張圖都要寫 `caption`（這個畫面在做什麼）。只放圖，看的人不會知道自己在看什麼。

### ⚠️ 客戶資料要先處理

`public/projects/sports-scheduling/` 目前的截圖含有**真實客戶資料**：合作單位全名、教練姓名、
使用者姓名與實際金額。公開前請擇一處理：

1. 在專案裡建一組假資料重拍（最乾淨）
2. 把敏感區域打上馬賽克
3. 確認客戶同意公開後照原樣使用

## 上線前的待辦

集中在 `src/content/site.ts`：

- [ ] `site.url` → 換成正式網域
- [ ] `site.contact.links` → GitHub 帳號目前還是 `your-account`
- [ ] 處理上面提到的客戶資料問題
- [ ] 補上怪獸放電場專案的畫面（`kid-exhibition.ts` 裡有需要哪幾張的清單）

## 部署

### Cloudflare Pages（推薦）

1. 專案推上 GitHub
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → 連結 Git repo
3. 建置設定：
   - Framework preset：`Next.js (Static HTML Export)`
   - Build command：`npm run build`
   - Build output directory：`out`

之後每次 push 到 main 會自動重新部署。

### GitHub Pages

已附 `.github/workflows/deploy.yml`，推上 GitHub 後到 Settings → Pages → Source 選
**GitHub Actions** 即可。

> ⚠️ 若網址是 `帳號.github.io/portfolio` 這種**專案頁**，需要在 `next.config.ts` 加
> `basePath: "/portfolio"`，否則樣式與連結會壞掉。用自訂網域或 Cloudflare Pages 沒有這個問題。

## 技術說明

- **靜態輸出**：這個網站沒有需要伺服器運算的功能，純靜態載入最快、部署免費，也不會有用量超額問題。
- **深色模式**：以 class 控制，切換結果存在 `localStorage`，初始主題由 `layout.tsx` 的 inline script 在繪製前套用，避免閃爍。
- **進場動畫**：`<html>` 要有 `.js-reveal` 才會啟用，關閉 JavaScript 時內容照常顯示，不會整頁空白。
- **字型**：以 `next/font` 自架 Noto Sans TC 與 JetBrains Mono，不會對外部發出額外請求。
