"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import type { Post } from "@/types/blog";

export function BlogNavigation({
  previous,
  next,
}: {
  previous: Post | null;
  next: Post | null;
}) {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  return (
    <div className="flex items-center gap-2">
      {previous && (
        <Button variant="secondary" size="icon" asChild>
          <Link href={`/blog/${previous.slug}`}>
            <ArrowLeftIcon />
            <span className="sr-only">{translations.common.previous}</span>
          </Link>
        </Button>
      )}

      {next && (
        <Button variant="secondary" size="icon" asChild>
          <Link href={`/blog/${next.slug}`}>
            <span className="sr-only">{translations.common.next}</span>
            <ArrowRightIcon />
          </Link>
        </Button>
      )}
    </div>
  );
}
