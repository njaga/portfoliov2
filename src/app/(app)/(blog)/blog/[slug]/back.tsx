"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

export function Back() {
  const searchParams = useSearchParams();
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  const source = searchParams.get("utm_source");
  const isComponents = source === "components";

  return (
    <Button className="px-0 text-muted-foreground" variant="link" asChild>
      <Link href={isComponents ? "/components" : "/blog"}>
        <ArrowLeftIcon />
        {isComponents
          ? translations.common.components
          : translations.blog.title}
      </Link>
    </Button>
  );
}
