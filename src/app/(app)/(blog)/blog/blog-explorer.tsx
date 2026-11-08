"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import Link from "@/components/localized-link";
import { PostItem } from "@/components/post-item";
import {
  BLOG_TEXT,
  type BlogPreview,
  EDITORIAL_CATEGORIES,
  type EditorialCategory,
} from "@/lib/blog-editorial";
import { addLocaleToPath, type Locale } from "@/lib/i18n";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedCategory = searchParams.get("category");
  const filter: Filter =
    requestedCategory &&
    EDITORIAL_CATEGORIES.some((category) => category === requestedCategory)
      ? (requestedCategory as EditorialCategory)
      : "all";

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
  const requestedPage = Number(searchParams.get("page") || 1);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, pageCount)
      : 1;
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function pageHref(nextPage: number, nextFilter: Filter = filter) {
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set("category", nextFilter);
    if (nextPage > 1) params.set("page", String(nextPage));

    const suffix = params.toString();
    const pathname = addLocaleToPath("/blog", locale);
    return `${pathname}${suffix ? `?${suffix}` : ""}#articles`;
  }

  function chooseCategory(category: Filter) {
    router.push(pageHref(1, category), { scroll: false });
    document.getElementById("articles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToArticles() {
    document.getElementById("articles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const pagerClass =
    "inline-flex items-center gap-2 rounded-lg border border-edge px-3 py-2 text-sm hover:bg-muted";
  const disabledClass =
    "inline-flex items-center gap-2 rounded-lg border border-edge px-3 py-2 text-sm opacity-40";

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
          {page > 1 ? (
            <Link
              href={pageHref(page - 1)}
              scroll={false}
              onClick={scrollToArticles}
              rel="prev"
              className={pagerClass}
            >
              <ArrowLeftIcon className="size-4" />
              {copy.previous}
            </Link>
          ) : (
            <span aria-disabled="true" className={disabledClass}>
              <ArrowLeftIcon className="size-4" />
              {copy.previous}
            </span>
          )}

          <span className="text-sm text-muted-foreground">
            {locale === "fr" ? "Page" : "Page"} {page} / {pageCount}
          </span>

          {page < pageCount ? (
            <Link
              href={pageHref(page + 1)}
              scroll={false}
              onClick={scrollToArticles}
              rel="next"
              className={pagerClass}
            >
              {copy.next}
              <ArrowRightIcon className="size-4" />
            </Link>
          ) : (
            <span aria-disabled="true" className={disabledClass}>
              {copy.next}
              <ArrowRightIcon className="size-4" />
            </span>
          )}
        </nav>
      )}
    </section>
  );
}
