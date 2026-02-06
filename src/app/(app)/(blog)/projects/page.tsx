"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProjectImage } from "@/components/ui/project-image";
import { PROJECTS } from "@/features/profile/data/projects";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { getTranslatedProject } from "@/lib/translations";

const PROJECTS_PER_PAGE = 12;

export default function Page() {
  const { t, locale, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);
  const currentLocale = mounted ? locale : defaultLocale;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = PROJECTS.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-svh [--color-project:#3B82F6] dark:[--color-project:#60A5FA]">
      {/* Header */}
      <div className="flex items-center justify-between p-2 pl-4">
        <Link
          href="/#projects"
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
          {translations.contact.workTogether}
        </Link>
      </div>

      <div className="screen-line-after px-4">
        <h1 className="font-heading text-3xl font-semibold">
          {translations.projects.title}
        </h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          {translations.projects.collection} {translations.projects.page}{" "}
          {currentPage} {translations.projects.of} {totalPages} (
          {PROJECTS.length} {translations.projects.projectsTotal})
        </p>
      </div>

      {/* Projects Grid */}
      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentProjects.map((Project) => {
            // Obtenir les traductions du projet
            const projectTranslation = getTranslatedProject(
              Project.id,
              currentLocale
            );
            const projectTitle = projectTranslation?.title || Project.title;
            const projectDescription =
              projectTranslation?.description || Project.description;

            // Préparer description (paragraphe + puces)
            let descContent = null;
            if (projectDescription) {
              if (projectDescription.includes("- ")) {
                const lines = projectDescription.split(/\r?\n/);
                const firstLine = lines[0];
                const bulletLines = lines.filter((line) =>
                  line.trim().startsWith("-")
                );
                descContent = (
                  <>
                    <p className="mb-1 line-clamp-1 font-medium">{firstLine}</p>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground">
                      {bulletLines.slice(0, 2).map((line) => (
                        <li key={line}>{line.replace(/^\s*-\s*/, "")}</li>
                      ))}
                    </ul>
                  </>
                );
              } else {
                descContent = (
                  <p className="line-clamp-2">{projectDescription}</p>
                );
              }
            }
            return (
              <Link
                key={Project.id}
                href={`/projects/${Project.id}`}
                className="group/project flex flex-col gap-2 p-2"
              >
                <ProjectImage src={Project.logo} alt={projectTitle} />

                <div className="flex flex-col gap-1 p-2">
                  <h2 className="flex items-center gap-2 font-heading text-lg leading-snug font-medium text-balance decoration-(--color-project) underline-offset-4 group-hover/project:underline">
                    {projectTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {Project.time}
                  </p>
                  {descContent}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Project.skills
                      .filter(
                        (skill) =>
                          skill !== "Company Project" &&
                          skill !== "Client Project"
                      )
                      .slice(0, 4)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    {Project.skills.length > 4 && (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                        +{Project.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
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
            {translations.projects.haveProject}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {translations.projects.excited}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-4 w-4" />
              {translations.projects.startProject}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {translations.projects.viewServices}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
