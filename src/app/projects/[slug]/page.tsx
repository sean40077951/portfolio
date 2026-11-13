import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { Diagram } from "@/components/Diagram";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** 靜態輸出時，依這份清單預先產生每個案例的 HTML */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: project.cover ? [project.cover.src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/projects"
          className="link-underline font-mono text-sm text-muted hover:text-ink"
        >
          ← 所有作品
        </Link>

        {/* ---------------- 標題 ---------------- */}
        <header className="mt-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="label">{project.period}</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                {project.status}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{project.subtitle}</p>
          </Reveal>
        </header>
      </div>

      {/* ---------------- 封面：先看到東西長什麼樣 ---------------- */}
      {project.cover ? (
        <Reveal className="mx-auto mt-12 max-w-5xl px-6">
          <Shot shot={project.cover} priority />
        </Reveal>
      ) : project.coverDiagram ? (
        <Reveal className="mx-auto mt-12 max-w-4xl px-6">
          <Diagram name={project.coverDiagram} />
        </Reveal>
      ) : null}

      <div className="mx-auto max-w-3xl px-6">
        {/* ---------------- 成果：最重要的一句，擺最前面 ---------------- */}
        <Reveal as="section" className="mt-16">
          <h2 className="label">成果</h2>
          <p className="mt-5 text-xl font-medium leading-[1.7] sm:text-2xl">
            {project.impact}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-medium">
                    {metric.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ---------------- 這是什麼 ---------------- */}
        <Reveal as="section" className="mt-14">
          <div className="space-y-5">
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-[1.9]">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-10 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="label">我的角色</dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{project.role}</dd>
            </div>
            <div>
              <dt className="label">技術</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.map((tech) => (
                  <span key={tech} className="font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 ${
                    link.primary ? "bg-ink text-paper" : "border border-line hover:bg-raise"
                  }`}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      {/* ---------------- 章節：一章一個功能主題 ---------------- */}
      <div className="mt-8">
        {project.chapters.map((chapter, i) => (
          <section key={chapter.heading} className="mt-16">
            <Reveal className="mx-auto max-w-3xl px-6">
              <div className="flex items-baseline gap-4">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl font-bold sm:text-3xl">{chapter.heading}</h2>
              </div>

              <div className="mt-5 space-y-5">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph} className="leading-[1.9]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {chapter.diagram && (
              <Reveal className="mx-auto mt-8 max-w-4xl px-6">
                <Diagram name={chapter.diagram} />
              </Reveal>
            )}

            {chapter.shot && (
              <Reveal className="mx-auto mt-8 max-w-5xl px-6">
                <Shot shot={chapter.shot} />
              </Reveal>
            )}
          </section>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* ---------------- 小細節 ---------------- */}
        {project.details && project.details.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <h2 className="label">那些小地方</h2>
              <p className="mt-4 text-muted">
                不會寫在需求文件上，但少了就會出事的部分。
              </p>
            </Reveal>

            <div className="mt-8 space-y-8 border-t border-line pt-8">
              {project.details.map((detail, i) => (
                <Reveal key={detail.title} delay={i * 40}>
                  <h3 className="font-bold">{detail.title}</h3>
                  <p className="mt-2 leading-[1.9] text-muted">{detail.description}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- 限制 ---------------- */}
        {project.limitations && project.limitations.length > 0 && (
          <Reveal as="section" className="mt-16">
            <h2 className="label">還沒做完的部分</h2>
            <ul className="mt-6 space-y-2.5">
              {project.limitations.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* ---------------- 下一個作品 ---------------- */}
        {projects.length > 1 && (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-20 block border-t border-line pt-10"
          >
            <span className="label">下一個作品</span>
            <div className="mt-3 flex items-center justify-between gap-6">
              <h2 className="text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                {next.title}
              </h2>
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
