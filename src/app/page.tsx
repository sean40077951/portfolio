import Link from "next/link";
import { site } from "@/content/site";
import { featuredProjects, projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const hasMore = projects.length > featuredProjects.length;

  return (
    <>
      {/* ---------------- 開場：短，讓人快點捲到作品 ---------------- */}
      <section className="mx-auto max-w-4xl px-6 pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Reveal>
          <h1 className="text-[2.25rem] font-black leading-[1.15] sm:text-5xl lg:text-6xl">
            {site.intro.headline[0]}
            <br />
            {site.intro.headline[1]}
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {site.intro.description}
          </p>
        </Reveal>
      </section>

      {/* ---------------- 作品：這個網站的主角 ---------------- */}
      <section className="mx-auto max-w-4xl px-6 pb-8">
        <div className="space-y-24">
          {featuredProjects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal className="mt-20 border-t border-line pt-8">
            <Link href="/projects" className="link-underline text-sm">
              看全部 {projects.length} 件作品 →
            </Link>
          </Reveal>
        )}
      </section>

    </>
  );
}
