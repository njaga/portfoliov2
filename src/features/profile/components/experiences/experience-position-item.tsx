"use client";

import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { MarkdownClient } from "@/components/markdown";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedExperience } from "@/lib/translations";

import type { ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  readonly position: ExperiencePosition;
}) {
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;
  const experienceTranslation = getTranslatedExperience(
    position.id,
    currentLocale
  );

  const positionTitle = experienceTranslation?.title || position.title;
  const positionDescription =
    experienceTranslation?.description || position.description;

  return (
    <AccordionPrimitive.Item value={position.id} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <AccordionPrimitive.Trigger className="group/experience block w-full text-left select-none [&[data-state=open]_.lucide-chevron-down]:rotate-180">
          <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <ExperienceIcon className="size-4" icon={position.icon} />
            </div>

            <h4 className="flex-1 font-heading font-medium text-balance decoration-ring underline-offset-4 group-hover/experience:underline">
              {positionTitle}
            </h4>

            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300" />
          </div>

          <p className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
            {position.employmentType && (
              <>
                <span>{position.employmentType}</span>
                <span className="flex h-4 w-px shrink-0 bg-border" />
              </>
            )}

            <span>{position.year}</span>
          </p>
        </AccordionPrimitive.Trigger>

        <AccordionPrimitive.Content className="overflow-hidden duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {positionDescription && (
            <Prose className="pt-2 pl-9">
              <MarkdownClient>{positionDescription}</MarkdownClient>
            </Prose>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 pl-9">
              {position.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          )}
        </AccordionPrimitive.Content>
      </div>
    </AccordionPrimitive.Item>
  );
}
