import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Diagram } from "@/components/Diagram";

/**
 * 作品卡片。
 * 圖片佔掉大部分面積——訪客先看到作品長什麼樣，再決定要不要讀文字。
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {project.cover ? (
        <div className="overflow-hidden rounded-xl border border-line bg-raise">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      ) : project.coverDiagram ? (
        // 還沒有截圖的案例，用圖解撐住版面，不要讓卡片開天窗
        <Diagram name={project.coverDiagram} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-raise">
          <CoverFallback title={project.title} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
          {project.title}
        </h3>
        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
          {project.status}
        </span>
        <span className="ml-auto font-mono text-xs text-muted">{project.period}</span>
      </div>

      <p className="mt-1.5 text-muted">{project.subtitle}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="max-w-2xl leading-relaxed">{project.summary}</p>
        {/* 一個醒目數字勝過一段形容詞 */}
        {project.metrics[0] && (
          <span className="rounded-full bg-raise px-3 py-1 font-mono text-xs">
            {project.metrics[0].value} {project.metrics[0].label}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="font-mono text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <span className="link-underline ml-auto text-sm font-medium">
          看這個案例 →
        </span>
      </div>
    </Link>
  );
}

/** 還沒有截圖時的替代封面，不要讓版面開天窗 */
function CoverFallback({ title }: { title: string }) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 border-b border-line">
      <span className="font-mono text-4xl font-medium opacity-20 sm:text-6xl">
        {title.slice(0, 2)}
      </span>
      <span className="label">畫面準備中</span>
    </div>
  );
}
