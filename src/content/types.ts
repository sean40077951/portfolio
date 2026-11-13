/**
 * 作品集的內容型別定義。
 *
 * 結構參考了幾個公認做得好的工程師作品集（Emil Kowalski、Brittany Chiang），
 * 歸納出三個原則：
 *
 *   1. 成果擺最前面。不要讓人讀到最後才知道這東西有沒有用。
 *   2. 章節用「功能主題」切，不要用「背景／挑戰／解法」這種制式標題。
 *      每一章配一張畫面，講清楚做了什麼、為什麼這樣選、否決了什麼。
 *   3. 留一段寫小細節。小細節最能看出做工。
 *
 * 新增案例 = 在 src/content/projects/ 新增一個檔案，照這個型別填完，再到 index.ts 匯入。
 */

/** 專案目前的狀態，顯示成標題旁的小標籤 */
export type ProjectStatus = "已上線" | "開發中" | "內部使用中" | "原型";

/** 外部連結，例如線上展示、GitHub */
export interface ProjectLink {
  label: string;
  href: string;
  /** 設 true 會變成實心的主要按鈕 */
  primary?: boolean;
}

/**
 * 一張作品畫面。
 *
 * 寬高必填——先寫死尺寸，瀏覽器才能預留空間，圖載入時版面不會跳動。取得 PNG 尺寸：
 *   node -e "const b=require('fs').readFileSync('圖.png');console.log(b.readUInt32BE(16)+'x'+b.readUInt32BE(20))"
 */
export interface ProjectShot {
  /** public/ 底下的路徑，例如 /projects/xxx/01.png */
  src: string;
  /** 給讀螢幕軟體與圖片載入失敗時看的描述 */
  alt: string;
  width: number;
  height: number;
}

/**
 * 案例的一個章節 = 一個功能主題。
 *
 * 寫法建議（這是整個作品集最重要的部分）：
 *   heading  用功能名稱，不要用「挑戰」「解法」
 *   body     第一段講這個畫面在做什麼；第二段講為什麼這樣做，
 *            最好明講「原本可以怎麼做、為什麼沒那樣做」——取捨比結論有價值
 *   shot     這個主題的畫面。沒有圖的章節也能成立，但盡量補上
 */
export interface ProjectChapter {
  heading: string;
  body: string[];
  shot?: ProjectShot;
  /** 圖解，接在文字底下。可以跟 shot 並存 */
  diagram?: DiagramKey;
}

/**
 * 可以插進章節裡的圖解，實作在 src/components/Diagram.tsx。
 *
 * 沒有截圖的案例靠這個撐場面；有截圖的案例靠這個補上「截圖拍不出來的思路」。
 * 要新增一張圖解：在這裡加一個代號，再到 Diagram.tsx 加對應的元件。
 */
export type DiagramKey =
  /** 家長端四步驟預約流程 */
  | "booking-flow"
  /** 兩種扣名額寫法的對照（會超賣 vs 不會超賣） */
  | "oversell-compare"
  /** 課程的資料階層：單位 → 系列 → 期別 → 堂次 */
  | "data-hierarchy"
  /** 導入前後的做法對照表 */
  | "sports-before-after";

/** 小細節：一句話講一個容易被忽略、但做了會差很多的地方 */
export interface ProjectDetail {
  title: string;
  description: string;
}

/** 可量化的規模或成果 */
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  /** 網址用的代號，會變成 /projects/<slug> */
  slug: string;
  title: string;
  /** 一句話說明這是什麼系統 */
  subtitle: string;
  period: string;
  /** 你在這個案子裡的角色 */
  role: string;
  status: ProjectStatus;
  tags: string[];
  stack: string[];
  /** 列表卡片用的一句話。參考對象都控制在 1～2 句，別寫長 */
  summary: string;

  /**
   * 成果，放在案例頁最上方。
   * 一句話講清楚這東西現在怎麼被使用、解決掉什麼。
   * 有真實數字就放數字（多少人在用、省下多少時間、處理多少筆資料）。
   */
  impact: string;
  metrics: ProjectMetric[];

  /** 封面圖。沒有圖時版面會自動改用文字封面 */
  cover?: ProjectShot;
  /** 還沒有截圖的案例，可以用一張圖解當封面，卡片才不會開天窗 */
  coverDiagram?: DiagramKey;
  /** 這是什麼、給誰用。1～2 段就好，細節留給章節 */
  overview: string[];
  /** 案例頁的主體，一章一個功能主題 */
  chapters: ProjectChapter[];
  /** 小細節（選填） */
  details?: ProjectDetail[];
  /** 誠實寫下還沒做完的部分（選填） */
  limitations?: string[];
  links?: ProjectLink[];
  /** 設 true 會排在首頁 */
  featured?: boolean;
}
