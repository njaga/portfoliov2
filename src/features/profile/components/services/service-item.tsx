"use client";

import { CheckIcon, ClockIcon } from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedService } from "@/lib/translations";

import type { Service } from "../../data/services";

interface ServiceItemProps {
  service: Service;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;
  const serviceTranslation = getTranslatedService(service.id, currentLocale);

  const title = serviceTranslation?.title || service.title;
  const description = serviceTranslation?.description || service.description;
  const features = serviceTranslation?.features || service.features;
  const duration = serviceTranslation?.duration || service.duration;
  const whatsIncluded = serviceTranslation?.whatsIncluded || "What's included:";
  const durationLabel = serviceTranslation?.durationLabel || "Duration:";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-edge bg-background p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
            <service.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-medium text-foreground">
          {whatsIncluded}
        </h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckIcon className="h-3 w-3 shrink-0 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Duration */}
      {duration && (
        <div className="border-t border-edge pt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ClockIcon className="h-4 w-4" />
            <span>
              {durationLabel} {duration}
            </span>
          </div>
        </div>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 -z-1 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
