import dayjs from "dayjs";
import { getTableOfContents } from "fumadocs-core/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { findNeighbour, getAllPosts, getPostBySlug } from "@/data/blog";
import { USER } from "@/data/user";
import { getEditorialCategory, toBlogPreview } from "@/lib/blog-editorial";
import { addLocaleToPath, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo";
import { getRequestLocale } from "@/lib/server-locale";
import type { Post } from "@/types/blog";

import { Back } from "./back";
import { BlogNavigation } from "./blog-navigation";
import { BlogPostContent } from "./blog-post-content";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const locale = await getRequestLocale();

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return notFound();
  }

  const title = post.metadata.seoTitle || post.metadata.title;
  const description = post.metadata.description;
  const shareTitle = post.metadata.shareTitle || title;
  const shareDescription = post.metadata.shareDescription || description;
  const { image, createdAt, updatedAt } = post.metadata;

  // Construire l'URL absolue de l'image
  // An English share card is always generated from the English title, not a
  // language-neutral photo that may contain French text.
  const ogImagePath =
    locale === "en"
      ? `/og/simple?title=${encodeURIComponent(shareTitle)}`
      : image || `/og/simple?title=${encodeURIComponent(shareTitle)}`;
  const ogImage = ogImagePath.startsWith("http")
    ? ogImagePath
    : `${SITE_INFO.url}${ogImagePath}`;

  const articlePath = `/blog/${post.slug}`;
  const blogUrl = `${SITE_INFO.url}${addLocaleToPath(articlePath, locale)}`;

  return {
    ...localizedMetadata(locale, articlePath, title, description),
    openGraph: {
      url: blogUrl,
      type: "article",
      locale: locale === "fr" ? "fr_SN" : "en_US",
      title: shareTitle,
      description: shareDescription,
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: shareTitle,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [ogImage],
    },
  };
}

function getPageJsonLd(post: Post, locale: Locale): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    ...(post.metadata.subtitle ? { alternativeHeadline: post.metadata.subtitle } : {}),
    description: post.metadata.description,
    image:
      locale === "en" || !post.metadata.image
        ? `${SITE_INFO.url}/og/simple?title=${encodeURIComponent(post.metadata.shareTitle || post.metadata.title)}`
        : post.metadata.image.startsWith("http")
          ? post.metadata.image
          : `${SITE_INFO.url}${post.metadata.image}`,
    url: `${SITE_INFO.url}${addLocaleToPath(`/blog/${post.slug}`, locale)}`,
    datePublished: dayjs(post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${USER.website}/#person`,
      name: USER.displayName,
      identifier: USER.username,
      url: USER.website,
      image: `${USER.website}${USER.avatar}`,
      sameAs: USER.otherWebsites,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  const locale = await getRequestLocale();

  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const toc = getTableOfContents(post.content);
  // const tocDepth2Count = toc.reduce(
  //   (count, item) => (item.depth === 2 ? count + 1 : count),
  //   0
  // );

  const allPosts = getAllPosts(locale);
  const { previous, next } = findNeighbour(allPosts, slug);
  const category = getEditorialCategory(post);
  const related = allPosts
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(getEditorialCategory(b) === category) -
        Number(getEditorialCategory(a) === category)
    )
    .slice(0, 2)
    .map(toBlogPreview);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post, locale)).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex items-center justify-between p-2 pl-4">
        <Suspense>
          <Back />
        </Suspense>

        <Suspense>
          <BlogNavigation previous={previous} next={next} />
        </Suspense>
      </div>

      <Suspense>
        <BlogPostContent post={post} toc={toc} locale={locale} related={related} />
      </Suspense>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}
