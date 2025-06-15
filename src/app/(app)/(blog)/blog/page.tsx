"use client";

import dayjs from "dayjs";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, MailIcon, PenToolIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types/blog";

const POSTS_PER_PAGE = 6;

export default function Page() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const posts = await response.json();
        const sortedPosts = posts
          .slice()
          .sort((a: Post, b: Post) =>
            dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
          );
        setAllPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-2 pl-4">
        <Link 
          href="/#blog"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Portfolio
        </Link>
        
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MailIcon className="h-4 w-4" />
          Get in Touch
        </Link>
      </div>

      <div className="screen-line-after -mt-px px-4">
        <h1 className="font-heading text-3xl font-semibold">Blog</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          Thoughts, insights, and tutorials. Page {currentPage} of {totalPages} ({allPosts.length} articles total)
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
                <div className="h-48 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="icon"
                  onClick={() => goToPage(page)}
                  className="h-8 w-8"
                >
                  {page}
                </Button>
              ))}
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
          <h2 className="font-heading text-xl font-semibold mb-2">
            Want to Share Your Story?
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            I love connecting with fellow developers and entrepreneurs. Let&apos;s discuss ideas, collaborate, or just have a great conversation!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-4 w-4" />
              Let&apos;s Connect
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <PenToolIcon className="h-4 w-4" />
              Work Together
            </Link>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
