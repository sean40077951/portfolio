import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="label">404</p>
      <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
        這個頁面不存在
      </h1>
      <p className="mt-5 text-muted">
        連結可能已經失效，或是網址打錯了。
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          回首頁
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-raise"
        >
          看作品
        </Link>
      </div>
    </div>
  );
}
