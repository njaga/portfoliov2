"use client";

import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";
import React from "react";

import { Icons } from "@/components/icons";
import { MarkdownClient } from "@/components/markdown";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedProject } from "@/lib/translations";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
  showLogo = false,
}: {
  className?: string;
  project: Project;
  showLogo?: boolean;
}) {
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;
  const projectTranslation = getTranslatedProject(project.id, currentLocale);

  const projectTitle = projectTranslation?.title || project.title;
  const projectDescription =
    projectTranslation?.description || project.description;

  return (
    <AccordionPrimitive.Item value={project.id} asChild>
      <div className={className}>
        <div className="flex items-center">
          {showLogo && project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0"
              priority
              unoptimized
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center text-muted-foreground"
              aria-hidden="true"
            >
              <Icons.project className="size-5" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <AccordionPrimitive.Trigger className="group/project flex w-full items-center justify-between gap-4 p-4 pr-2 text-left select-none [&[data-state=open]_.lucide-chevron-down]:rotate-180">
              <div>
                <h3 className="mb-1 flex items-center gap-1 font-heading leading-snug font-medium text-balance underline-offset-4 group-hover/project:underline group-hover/project:project-title-hover">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-1"
                  >
                    {projectTitle}
                    <ArrowUpRightIcon className="size-4 text-muted-foreground" />
                    <span className="sr-only">Voir le détail</span>
                  </Link>
                </h3>

                <p className="text-sm text-muted-foreground">{project.time}</p>
              </div>

              <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300" />
            </AccordionPrimitive.Trigger>
          </div>
        </div>

        <AccordionPrimitive.Content className="overflow-hidden duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="space-y-4 border-t border-dashed border-edge p-4">
            {projectDescription && (
              <Prose>
                <MarkdownClient>{projectDescription}</MarkdownClient>
              </Prose>
            )}

            {project.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </div>
            )}
          </div>
        </AccordionPrimitive.Content>
      </div>
    </AccordionPrimitive.Item>
  );
}
