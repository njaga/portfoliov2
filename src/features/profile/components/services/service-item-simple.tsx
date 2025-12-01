"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedService } from "@/lib/translations";

import type { Service } from "../../data/services";

interface ServiceItemSimpleProps {
  readonly service: Service;
}

export function ServiceItemSimple({ service }: ServiceItemSimpleProps) {
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;
  const serviceTranslation = getTranslatedService(service.id, currentLocale);

  const Icon = service.icon;
  const title = serviceTranslation?.title || service.title;
  const shortDescription =
    serviceTranslation?.shortDescription || service.shortDescription;

  return (
    <Link
      href="/services"
      className="group block rounded-xl border border-edge bg-background p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {shortDescription}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}
