"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

/** 訂閱捲動位置，用來決定導覽列要不要顯示底線 */
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();

  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  /**
   * 手機選單的開關。
   * 記住「在哪一頁打開的」而不是單純的 true／false，
   * 這樣換頁時選單會自動收起來，不需要額外寫 effect 去關它。
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/80 backdrop-blur-md transition-colors ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight transition-opacity hover:opacity-60"
        >
          {site.name}
          <span className="text-muted">.</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden sm:flex sm:items-center sm:gap-1" aria-label="主要導覽">
            {site.nav.map((item) => {
              const active =
                item.href.startsWith("/") &&
                !item.href.includes("#") &&
                pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-raise ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenedOn(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:bg-raise sm:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 手機選單 */}
      <div
        className={`overflow-hidden border-line transition-[max-height] duration-300 sm:hidden ${
          menuOpen ? "max-h-64 border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-2" aria-label="行動版導覽">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenedOn(null)}
              className="border-b border-line py-3 text-sm last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
