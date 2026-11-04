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
}: {
  readonly post: PostCard;
  readonly shouldPreloadImage?: boolean;
  readonly locale?: Locale;
}) {
  const category = "category" in post ? post.category : getEditorialCategory(post);
  const minutes = "readingMinutes" in post ? post.readingMinutes : undefined;
  const copy = BLOG_TEXT[locale];

  return (
    <Link
      href={"/blog/" + post.slug}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-background transition-colors hover:border-foreground/30 hover:bg-muted/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {post.metadata.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={post.metadata.image}
            alt=""
            width={1200}
            height={675}
            sizes="(max-width: 640px) 100vw, 360px"
            quality={85}
            priority={shouldPreloadImage}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          {copy.categories[category]}
        </p>
        <h3 className="font-heading text-xl leading-snug font-semibold text-balance group-hover:underline group-hover:underline-offset-4">
          {post.metadata.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.metadata.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
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
    </Link>
  );
}
