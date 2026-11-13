import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-sm">{site.name}</p>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()}・以 Next.js 靜態輸出建置
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="頁尾導覽">
          <Link href="/projects" className="link-underline text-muted hover:text-ink">
            作品
          </Link>
          <a
            href={`mailto:${site.contact.email}`}
            className="link-underline text-muted hover:text-ink"
          >
            Email
          </a>
          {site.contact.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-muted hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
