import type { Project } from "@/content/types";
import { sportsScheduling } from "./sports-scheduling";
import { kidExhibition } from "./kid-exhibition";

/**
 * 作品清單。
 *
 * 新增案例的步驟只有三個：
 *   1. 複製一份現有的案例檔（例如 kid-exhibition.ts）改成你的內容
 *   2. 在上面 import 進來
 *   3. 加進下面這個陣列
 *
 * 陣列順序 = 網站上的顯示順序，想主打哪個就放前面。
 */
export const projects: Project[] = [sportsScheduling, kidExhibition];

/** 首頁精選：只取標了 featured 的案例 */
export const featuredProjects = projects.filter((p) => p.featured);

/** 作品列表的篩選選項，自動從所有案例的 tags 收集，不用手動維護 */
export const allTags: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tags)),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
