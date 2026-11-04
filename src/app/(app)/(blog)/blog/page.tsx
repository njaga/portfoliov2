import { ArrowUpRightIcon, MapPinIcon, RssIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { getAllPosts } from "@/data/blog";
import {
  BLOG_TEXT,
  formatBlogDate,
  toBlogPreview,
} from "@/lib/blog-editorial";
import type { Locale } from "@/lib/i18n";

import { BlogExplorer } from "./blog-explorer";

export default async function BlogPage() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
  const copy = BLOG_TEXT[locale];
  const posts = getAllPosts(locale).map(toBlogPreview);
  const featured =
    posts.find((post) => post.slug === "pourquoi-je-construis-kumba") ??
    posts[0];
  const remaining = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <div>
      <header className="px-5 pb-10 pt-12 sm:px-10 sm:pb-14 sm:pt-16">
        <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          <MapPinIcon className="size-3.5" aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h1 className="max-w-xl font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-[58ch] text-base leading-8 text-foreground/85 sm:text-lg">
          {copy.introduction}
        </p>
        <p className="mt-4 text-sm italic leading-7 text-muted-foreground">
          {copy.signature}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
          <a
            href="#articles"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 font-medium text-background transition-opacity hover:opacity-85"
          >
            {copy.latest}
            <ArrowUpRightIcon className="size-4" />
          </a>
          <Link
            href="/rss"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <RssIcon className="size-4" />
            {copy.rss}
          </Link>
        </div>
      </header>

      {featured && (
        <section className="border-y border-edge bg-muted/10 px-5 py-9 sm:px-10 sm:py-12">
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {copy.featuredLabel}
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid items-center gap-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:grid-cols-[1fr_1fr] sm:gap-10"
          >
            <div>
              <p className="text-xs text-muted-foreground">
                {copy.categories[featured.category]}
              </p>
              <h2 className="mt-3 font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-balance group-hover:underline group-hover:underline-offset-4 sm:text-4xl">
                {featured.metadata.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {featured.metadata.subtitle || featured.metadata.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={new Date(featured.metadata.createdAt).toISOString()}>
                  {formatBlogDate(featured.metadata.createdAt, locale)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{featured.readingMinutes} {copy.readTime}</span>
                <ArrowUpRightIcon className="ml-1 size-4 text-foreground" aria-hidden="true" />
              </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted/20 sm:aspect-[5/4]">
              {featured.metadata.image && (
                <Image
                  src={featured.metadata.image}
                  alt=""
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 640px) 100vw, 440px"
                  unoptimized
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                />
              )}
            </div>
          </Link>
        </section>
      )}

      <BlogExplorer posts={remaining} locale={locale} />

      <aside className="border-t border-edge bg-muted/20 px-5 py-10 sm:px-10 sm:py-12">
        <h2 className="font-heading text-2xl font-semibold">
          {copy.aboutTitle}
        </h2>
        <p className="mt-3 max-w-[58ch] text-sm leading-7 text-muted-foreground">
          {copy.about}
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
        >
          {copy.contact}
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </aside>
    </div>
  );
}
