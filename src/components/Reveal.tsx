"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** 延遲毫秒數，讓同一區塊的元素依序出現 */
  delay?: number;
  className?: string;
  /** 預設渲染成 div，需要時可換成 section、li 等 */
  as?: "div" | "section" | "li" | "article";
}

/**
 * 捲動進場。元素進入視窗後加上 .is-visible，動畫定義在 globals.css。
 * 只觸發一次，離開視窗不會再退回去。
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 不支援 IntersectionObserver 的瀏覽器不會被加上 .js-reveal，
    // 內容本來就是顯示的（見 globals.css），這裡直接跳過即可
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
