"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { PostItem } from "@/components/post-item";
import {
  BLOG_TEXT,
  type BlogPreview,
  EDITORIAL_CATEGORIES,
  type EditorialCategory,
} from "@/lib/blog-editorial";
import type { Locale } from "@/lib/i18n";

const PAGE_SIZE = 6;
type Filter = EditorialCategory | "all";

export function BlogExplorer({
  posts,
  locale,
}: {
  posts: BlogPreview[];
  locale: Locale;
}) {
  const copy = BLOG_TEXT[locale];
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const availableCategories = useMemo(
    () =>
      EDITORIAL_CATEGORIES.filter((category) =>
        posts.some((post) => post.category === category)
      ),
    [posts]
  );

  const filtered = useMemo(
    () =>
      filter === "all"
        ? posts
        : posts.filter((post) => post.category === filter),
    [filter, posts]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function chooseCategory(category: Filter) {
    setFilter(category);
    setPage(1);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    document.getElementById("articles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="articles" className="scroll-mt-24 px-5 py-10 sm:px-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {copy.latest}
          </p>
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            {copy.latestDescription}
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {filtered.length} {copy.articles}
        </span>
      </div>

      <div className="mb-7 flex flex-wrap gap-2" aria-label={copy.latest}>
        {(["all", ...availableCategories] as Filter[]).map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={filter === category}
            onClick={() => chooseCategory(category)}
            className={
              "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
              (filter === category
                ? "border-foreground bg-foreground text-background"
                : "border-edge bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground")
            }
          >
            {category === "all" ? copy.all : copy.categories[category]}
          </button>
        ))}
      </div>

      {visible.length ? (
        <div className="flex flex-col">
          {visible.map((post) => (
            <PostItem key={post.slug} post={post} locale={locale} variant="list" />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-edge p-8 text-center text-muted-foreground">
          {copy.empty}
        </p>
      )}

      {pageCount > 1 && (
        <nav className="mt-9 flex items-center justify-between gap-3" aria-label="Pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-edge px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
          >
            <ArrowLeftIcon className="size-4" />
            {copy.previous}
          </button>
          <span className="text-sm text-muted-foreground">
            {page} / {pageCount}
          </span>
          <button
            type="button"
            disabled={page === pageCount}
            onClick={() => changePage(page + 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-edge px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
          >
            {copy.next}
            <ArrowRightIcon className="size-4" />
          </button>
        </nav>
      )}
    </section>
  );
}
