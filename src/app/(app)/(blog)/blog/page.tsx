"use client";

import dayjs from "dayjs";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  PenToolIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import type { Post } from "@/types/blog";

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const posts = await response.json();
        const sortedPosts = posts
          .slice()
          .sort((a: Post, b: Post) =>
            dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
          );
        setAllPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-2 pl-4">
        <Link
          href="/#blog"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {translations.common.backToPortfolio}
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MailIcon className="h-4 w-4" />
          {translations.contact.getInTouch}
        </Link>
      </div>

      <div className="screen-line-after -mt-px px-4">
        <h1 className="font-heading text-3xl font-semibold">
          {translations.blog.title}
        </h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          {translations.blog.description} {translations.blog.page} {currentPage}{" "}
          {translations.blog.of} {totalPages} ({allPosts.length}{" "}
          {translations.blog.articlesTotal})
        </p>
      </div>

      {/* Posts Grid */}
      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="mb-4 h-48 rounded-lg bg-muted"></div>
                <div className="mb-2 h-4 w-3/4 rounded bg-muted"></div>
                <div className="h-3 w-1/2 rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentPosts.map((post, index) => (
              <PostItem
                key={post.slug}
                post={post}
                shouldPreloadImage={index <= 4}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="screen-line-before p-4">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="icon"
                    onClick={() => goToPage(page)}
                    className="h-8 w-8"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="screen-line-before p-4">
        <div className="rounded-xl border border-edge bg-muted/50 p-6 text-center">
          <h2 className="mb-2 font-heading text-xl font-semibold">
            {translations.blog.wantToShare}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {translations.blog.connectDescription}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-4 w-4" />
              {translations.blog.letsConnect}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <PenToolIcon className="h-4 w-4" />
              {translations.contact.workTogether}
            </Link>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
