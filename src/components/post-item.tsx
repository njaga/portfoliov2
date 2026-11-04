import Image from "next/image";
import Link from "next/link";

import {
  BLOG_TEXT,
  type BlogPreview,
  formatBlogDate,
  getEditorialCategory,
} from "@/lib/blog-editorial";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/types/blog";

type PostCard = Post | BlogPreview;

export function PostItem({
  post,
  shouldPreloadImage = false,
  locale = "en",
  variant = "list",
}: {
  readonly post: PostCard;
  readonly shouldPreloadImage?: boolean;
  readonly locale?: Locale;
  readonly variant?: "list" | "compact";
}) {
  const category = "category" in post ? post.category : getEditorialCategory(post);
  const minutes = "readingMinutes" in post ? post.readingMinutes : undefined;
  const copy = BLOG_TEXT[locale];
  const subtitle = post.metadata.subtitle || post.metadata.description;

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-edge transition-colors hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {post.metadata.image && (
          <div className="relative aspect-[16/9] bg-muted/20">
            <Image
              src={post.metadata.image}
              alt=""
              width={1200}
              height={675}
              sizes="(max-width: 640px) 100vw, 360px"
              priority={shouldPreloadImage}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-xs text-muted-foreground">{copy.categories[category]}</p>
          <h3 className="font-heading text-lg leading-snug font-semibold text-balance group-hover:underline group-hover:underline-offset-4">
            {post.metadata.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid items-center gap-5 border-b border-edge py-7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:grid-cols-[minmax(0,1fr)_minmax(190px,0.9fr)] sm:gap-9"
    >
      <div className="flex flex-col items-start gap-2.5">
        <span className="text-xs font-medium text-muted-foreground">
          {copy.categories[category]}
        </span>
        <h3 className="font-heading text-2xl leading-[1.12] font-semibold tracking-tight text-balance group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
          {post.metadata.title}
        </h3>
        <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
          <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
            {formatBlogDate(post.metadata.createdAt, locale)}
          </time>
          {minutes !== undefined && (
            <>
              <span aria-hidden="true">·</span>
              <span>{minutes} {copy.readTime}</span>
            </>
          )}
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted/20 sm:aspect-[5/3]">
        {post.metadata.image ? (
          <Image
            src={post.metadata.image}
            alt=""
            width={1200}
            height={720}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 430px"
            priority={shouldPreloadImage}
            unoptimized
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm italic text-muted-foreground">
            {copy.categories[category]}
          </div>
        )}
      </div>
    </Link>
  );
}
