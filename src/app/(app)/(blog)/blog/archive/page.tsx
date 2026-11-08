import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import Link from "@/components/localized-link";
import { getAllPosts } from "@/data/blog";
import {
  BLOG_TEXT,
  formatBlogDate,
  getEditorialCategory,
} from "@/lib/blog-editorial";
import { addLocaleToPath, getLanguageAlternates, type Locale } from "@/lib/i18n";

async function getArchiveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getArchiveLocale();
  const title =
    locale === "fr" ? "Archives du journal de bord" : "Build journal archive";
  const description =
    locale === "fr"
      ? "Tous les billets de Ndiaga Ndiaye : développement web, projets SaaS, intelligence artificielle et entrepreneuriat numérique au Sénégal."
      : "Browse all stories by Ndiaga Ndiaye about web development, SaaS products, AI and building a digital business in Senegal.";

  return {
    title,
    description,
    alternates: {
      canonical: addLocaleToPath("/blog/archive", locale),
      languages: getLanguageAlternates("/blog/archive"),
    },
    openGraph: {
      url: addLocaleToPath("/blog/archive", locale),
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_SN" : "en_US",
    },
  };
}

export default async function BlogArchivePage() {
  const locale = await getArchiveLocale();
  const copy = BLOG_TEXT[locale];
  const posts = getAllPosts(locale);
  const title =
    locale === "fr" ? "Toutes mes histoires." : "Every story so far.";
  const introduction =
    locale === "fr"
      ? "Tous les billets du journal, du plus récent au plus ancien. Développement, coulisses de mes projets et réflexions sur le numérique au Sénégal."
      : "The complete collection, newest first. Development, the behind-the-scenes of my projects and thoughts on building technology in Senegal.";

  return (
    <div className="px-5 pb-14 pt-10 sm:px-10 sm:pt-14">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        {copy.back}
      </Link>
      <header className="mt-9 border-b border-edge pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-[58ch] text-sm leading-7 text-muted-foreground">
          {introduction}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {posts.length} {copy.articles}
        </p>
      </header>
      <nav aria-label={title}>
        <ol className="divide-y divide-edge">
          {posts.map((post) => {
            const category = getEditorialCategory(post);
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-5 py-5 hover:text-foreground"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {copy.categories[category]}
                      <span className="px-2" aria-hidden="true">·</span>
                      <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
                        {formatBlogDate(post.metadata.createdAt, locale)}
                      </time>
                    </p>
                    <h2 className="mt-1.5 font-heading text-lg font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
                      {post.metadata.title}
                    </h2>
                    {post.metadata.subtitle && (
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {post.metadata.subtitle}
                      </p>
                    )}
                  </div>
                  <ArrowUpRightIcon
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
