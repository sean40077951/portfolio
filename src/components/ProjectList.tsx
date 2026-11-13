"use client";

import { useMemo, useState } from "react";
import { allTags, projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

const ALL = "全部";

/** 作品列表＋分類篩選。篩選在瀏覽器端完成，不需要後端。 */
export function ProjectList() {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.tags.includes(active))),
    [active],
  );

  // 只有一個分類時不必顯示篩選列
  const showFilters = allTags.length > 1;
  const tabs = [ALL, ...allTags];

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="作品分類">
          {tabs.map((tag) => {
            const selected = tag === active;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tag)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:bg-raise hover:text-ink"
                }`}
              >
                {tag}
                {tag !== ALL && (
                  <span className="ml-1.5 font-mono text-xs opacity-60">
                    {projects.filter((p) => p.tags.includes(tag)).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-12 space-y-20">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">這個分類還沒有作品。</p>
      )}
    </>
  );
}
