import type { TOCItemType } from "fumadocs-core/server";
import { ArrowUpRightIcon, BookOpenIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";

import { InlineTOC } from "@/components/inline-toc";
import Link from "@/components/localized-link";
import { MDX } from "@/components/mdx";
import { PostItem } from "@/components/post-item";
import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";
import { USER } from "@/data/user";
import {
  BLOG_TEXT,
  type BlogPreview,
  formatBlogDate,
  getEditorialCategory,
  getReadingMinutes,
} from "@/lib/blog-editorial";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/types/blog";

export function BlogPostContent({
  post,
  toc,
  locale,
  related,
}: {
  readonly post: Post;
  readonly toc: TOCItemType[];
  readonly locale: Locale;
  readonly related: BlogPreview[];
}) {
  const copy = BLOG_TEXT[locale];
  const category = getEditorialCategory(post);
  const readingMinutes = getReadingMinutes(post.content);
  const articleUrl = SITE_INFO.url + "/blog/" + post.slug;
  const shareUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=" +
    encodeURIComponent(articleUrl);

  return (
    <article className="pb-12">
      <header className="px-5 pb-8 pt-7 sm:px-10 sm:pt-10">
        <p className="mb-4 text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {copy.categories[category]}
        </p>
        <h1 className="font-heading text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-5xl">
          {post.metadata.title}
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg leading-8 font-medium text-foreground/75 sm:text-2xl sm:leading-9">
          {post.metadata.subtitle || post.metadata.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{USER.displayName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
            {formatBlogDate(post.metadata.createdAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <BookOpenIcon className="size-3.5" />
            {readingMinutes} {copy.readTime}
          </span>
        </div>
      </header>

      {(post.metadata.illustration || post.metadata.image) && (
        <div className="px-5 pb-8 sm:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={post.metadata.illustration || post.metadata.image || ""}
              alt=""
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 720px"
              priority
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="px-5 sm:px-10">
        <div className="mx-auto max-w-[65ch]">
          {toc.length > 2 && (
            <div className="mb-8">
              <InlineTOC items={toc}>{copy.toc}</InlineTOC>
            </div>
          )}

          <Prose className="prose-base max-w-none font-sans leading-8 prose-p:leading-8 prose-li:leading-8 prose-headings:scroll-mt-24 prose-blockquote:border-edge prose-blockquote:text-foreground prose-img:rounded-xl prose-pre:overflow-x-auto">
            <MDX code={post.content} />
          </Prose>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-y border-edge py-5">
            <span className="text-sm text-muted-foreground">
              {copy.categories[category]}
            </span>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
            >
              <LinkedinIcon className="size-4" />
              {copy.share}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>

          <aside className="my-10 flex items-start gap-4 rounded-2xl border border-edge bg-muted/20 p-5">
            <Image
              src={USER.avatar}
              alt={USER.displayName}
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full object-cover"
            />
            <div>
              <h2 className="font-heading text-lg font-semibold">{copy.authorTitle}</h2>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {copy.authorBio}
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
              >
                {copy.contact}
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 border-t border-edge px-5 pt-10 sm:px-10">
          <h2 className="mb-6 font-heading text-2xl font-semibold">{copy.more}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <PostItem key={item.slug} post={item} locale={locale} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
