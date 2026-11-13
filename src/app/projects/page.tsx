import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "作品",
  description: "我做過的系統：畫面、功能，以及它們解決了什麼問題。",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-16 sm:pt-20">
      <Reveal>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">作品</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          點進任一個案例，可以看到完整的畫面導覽與功能說明。
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <ProjectList />
      </Reveal>
    </section>
  );
}
