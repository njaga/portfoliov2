"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import type { Post } from "@/types/blog";

import { Panel, PanelHeader, PanelTitle } from "./panel";

export function Blog() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const posts = await response.json();
        setAllPosts(posts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>{translations.blog.title}</PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button variant="secondary" asChild>
          <Link href="/blog">
            <span>{translations.blog.allPosts}</span>
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
