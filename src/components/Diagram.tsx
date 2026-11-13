import type { DiagramKey } from "@/content/types";

/**
 * 圖解。
 *
 * 截圖只能呈現「做出來長什麼樣」，圖解能呈現「當初怎麼想」——
 * 後者才是別人抄不走、也最能說服人的部分。
 *
 * 全部用一般元素加框線畫成，沒有用 SVG 座標，
 * 所以手機上會自動換行，深淺色也自動跟著主題走。
 */
export function Diagram({ name }: { name: DiagramKey }) {
  switch (name) {
    case "booking-flow":
      return <BookingFlow />;
    case "oversell-compare":
      return <OversellCompare />;
    case "data-hierarchy":
      return <DataHierarchy />;
    case "sports-before-after":
      return <SportsBeforeAfter />;
    default:
      return null;
  }
}

/** 外框：讓每張圖解看起來跟截圖是同一個層級的東西 */
function Frame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="rounded-xl border border-line bg-raise p-6 sm:p-8">
      <div>{children}</div>
      <figcaption className="label mt-6 block">{caption}</figcaption>
    </figure>
  );
}

/** 預約的四個步驟 */
function BookingFlow() {
  const steps = [
    { n: "01", title: "選日期", note: "未開放的月份鎖住" },
    { n: "02", title: "選場次與人數", note: "即時顯示剩餘名額" },
    { n: "03", title: "填報名資料", note: "同一組聯絡方式不能重複" },
    { n: "04", title: "完成", note: "給預約編號" },
  ];

  return (
    <Frame caption="家長端：四個步驟完成報名">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {steps.map((step, i) => (
          <li key={step.n} className="flex flex-1 items-center gap-3">
            <div className="flex-1 rounded-lg border border-line bg-paper p-4">
              <span className="label">{step.n}</span>
              <p className="mt-1.5 font-bold">{step.title}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{step.note}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="shrink-0 text-muted">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/** 兩種扣名額的寫法對照——這張圖是整個案例最想讓人看懂的一件事 */
function OversellCompare() {
  return (
    <Frame caption="同一秒兩個人搶最後 2 個名額時，兩種寫法的差別">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* 錯誤做法 */}
        <div className="rounded-lg border border-line bg-paper p-5">
          <p className="font-bold">先讀、再判斷、再寫入</p>
          <ol className="mt-4 space-y-2.5 font-mono text-xs leading-relaxed">
            <li className="text-muted">A 讀到：剩餘 2</li>
            <li className="text-muted">B 讀到：剩餘 2</li>
            <li>A 判斷 2 ≥ 2 → 寫入</li>
            <li>B 判斷 2 ≥ 2 → 寫入</li>
            <li className="border-t border-line pt-2.5 font-bold">
              結果：剩餘 −2，超賣
            </li>
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            兩個請求都在對方寫入前就讀完了，所以兩邊的判斷都成立。
          </p>
        </div>

        {/* 正確做法 */}
        <div className="rounded-lg border-2 border-ink bg-paper p-5">
          <p className="font-bold">判斷和寫入合成同一步</p>
          <ol className="mt-4 space-y-2.5 font-mono text-xs leading-relaxed">
            <li className="text-muted">A：更新 … 若剩餘 ≥ 2</li>
            <li>→ 更新 1 筆，剩餘 0</li>
            <li className="text-muted">B：更新 … 若剩餘 ≥ 2</li>
            <li>→ 更新 0 筆，交易回滾</li>
            <li className="border-t border-line pt-2.5 font-bold">
              結果：剩餘 0，B 顯示額滿
            </li>
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            條件由資料庫在同一個原子操作裡檢查，中間沒有別人插進來的空檔。
          </p>
        </div>
      </div>
    </Frame>
  );
}

/** 課程的資料階層 */
function DataHierarchy() {
  const levels = [
    { name: "合作單位", example: "某社區活動中心", note: "105 個" },
    { name: "課程系列", example: "身腦適能知覺動作訓練", note: "一個單位可有多個系列" },
    { name: "期別", example: "第一期 1/3 – 3/28", note: "請款與核銷的單位" },
    { name: "堂次", example: "1/3 週六 09:00–10:30", note: "實際上課的一堂" },
  ];

  return (
    <Frame caption="資料階層：核銷與薪資都是從這條線推導出來的">
      <ol className="space-y-2">
        {levels.map((level, i) => (
          <li key={level.name} style={{ paddingLeft: `${i * 1.5}rem` }}>
            <div className="rounded-lg border border-line bg-paper p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-bold">{level.name}</span>
                <span className="font-mono text-xs text-muted">{level.example}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{level.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-2 space-y-2 pl-0 sm:pl-[6rem]">
        <p className="label">堂次底下再掛三樣東西</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {["教練指派（分指導員／協助員）", "核銷檢查點（前測／後測）", "課後上傳（照片與紀錄）"].map(
            (item) => (
              <div
                key={item}
                className="rounded-lg border border-dashed border-line bg-paper p-3 text-xs leading-relaxed"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </Frame>
  );
}

/** 導入前後對照 */
function SportsBeforeAfter() {
  const rows = [
    {
      task: "排課",
      before: "Excel 排好，再抄到紙本課表與群組公告",
      after: "系統排一次，月曆、教練端、核銷同時更新",
    },
    {
      task: "漏排師資",
      before: "行政每週人工巡一次課表找出來",
      after: "資料不一致時提醒自動出現在首頁",
    },
    {
      task: "核銷進度",
      before: "手動記住每一期的前後測時程",
      after: "建立期別時自動產生檢查點，逾期自動標示",
    },
    {
      task: "月底算薪",
      before: "依課表手算鐘點費、獎金、扣款",
      after: "依實際上完的堂次自動結算，每筆可往回追",
    },
  ];

  return (
    <Frame caption="同一件事，導入前後的做法對照">
      <div className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
        <div className="hidden bg-paper sm:grid sm:grid-cols-[6rem_1fr_1fr]">
          <span className="label p-3">項目</span>
          <span className="label p-3">原本</span>
          <span className="label p-3">現在</span>
        </div>

        {rows.map((row) => (
          <div
            key={row.task}
            className="grid gap-2 bg-paper p-3 sm:grid-cols-[6rem_1fr_1fr] sm:gap-0"
          >
            <span className="font-bold sm:p-3 sm:text-sm">{row.task}</span>
            <span className="text-sm leading-relaxed text-muted sm:p-3">
              {row.before}
            </span>
            <span className="text-sm leading-relaxed sm:p-3">{row.after}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
