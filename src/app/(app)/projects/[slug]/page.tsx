"use client";

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { PROJECTS } from "@/features/profile/data/projects";
import type { Project } from "@/features/profile/types/projects";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { getTranslatedProject } from "@/lib/translations";

function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.id === slug);
}

function findNeighbourProjects(slug: string) {
  const idx = PROJECTS.findIndex((p) => p.id === slug);
  return {
    previous: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { t, locale, mounted } = useTranslation();
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  const { previous, next } = findNeighbourProjects(slug);

  // Éviter l'erreur d'hydratation en utilisant la locale par défaut jusqu'au montage
  const translations = mounted ? t : getTranslations(defaultLocale);
  const currentLocale = mounted ? locale : defaultLocale;
  const projectTranslation = mounted
    ? getTranslatedProject(slug, currentLocale)
    : null;

  // Utiliser les traductions si disponibles, sinon les valeurs par défaut
  const projectTitle = projectTranslation?.title || project.title;
  const projectDescription =
    projectTranslation?.description || project.description;

  // Prepare gallery images (logo + images, no duplicates)
  let galleryImages: string[] = [];
  if (project.logo && project.images) {
    galleryImages = [
      project.logo,
      ...project.images.filter((img) => img !== project.logo),
    ];
  } else if (project.images) {
    galleryImages = project.images;
  } else if (project.logo) {
    galleryImages = [project.logo];
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-muted bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:bg-muted/50 hover:text-foreground"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {translations.common.back}
      </button>
      {/* Header */}
      <header className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {projectTitle}
          </h1>
          {project.skills.includes("Company Project") && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {translations.common.companyProject}
            </span>
          )}
          {project.skills.includes("Client Project") && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
              {translations.common.clientProject}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{project.time}</p>
      </header>
      {/* Description */}
      {projectDescription && (
        <div className="mb-8">
          <Prose className="prose-sm sm:prose-base">
            {projectDescription.includes("- ") ? (
              <>
                {(() => {
                  const lines = projectDescription.split(/\r?\n/);
                  const firstLine = lines[0];
                  const bulletLines = lines.filter((line) =>
                    line.trim().startsWith("-")
                  );

                  return (
                    <>
                      {firstLine && (
                        <p className="mb-4 font-medium text-foreground">
                          {firstLine}
                        </p>
                      )}
                      <ul className="space-y-2">
                        {bulletLines.map((line) => (
                          <li key={line} className="text-muted-foreground">
                            {line.replace(/^\s*-\s*/, "")}
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                })()}
              </>
            ) : (
              <p className="text-muted-foreground">{projectDescription}</p>
            )}
          </Prose>
        </div>
      )}
      {/* Skills */}
      {project.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {translations.common.technologies}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills
              .filter(
                (skill) =>
                  skill !== "Company Project" && skill !== "Client Project"
              )
              .map((skill) => (
                <Tag key={skill} className="transition-all hover:scale-105">
                  {skill}
                </Tag>
              ))}
          </div>
        </div>
      )}
      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            {translations.common.screenshots}
          </h2>

          {/* Main image with navigation */}
          <div className="group relative mb-4 overflow-hidden rounded-xl border border-muted bg-muted/30 shadow-lg transition-shadow hover:shadow-xl">
            <button
              type="button"
              className="relative aspect-video w-full cursor-pointer overflow-hidden"
              onClick={() => setZoomImg(galleryImages[currentImageIndex])}
              aria-label="Open image in lightbox"
            >
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`Screenshot ${currentImageIndex + 1} of project ${project.title}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
            </button>

            {/* Navigation arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute right-3 bottom-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {galleryImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`group/thumb relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                    idx === currentImageIndex
                      ? "scale-105 border-primary shadow-md"
                      : "border-muted hover:scale-105 hover:border-muted-foreground/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 25vw, 16vw"
                    className={`transition-all duration-300 ${
                      idx === currentImageIndex
                        ? "opacity-100"
                        : "opacity-70 group-hover/thumb:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Lightbox zoom */}
          {zoomImg && (
            <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/90 backdrop-blur-sm duration-200 fade-in">
              <button
                type="button"
                className="absolute inset-0 h-full w-full"
                onClick={() => setZoomImg(null)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setZoomImg(null);
                  }
                }}
                aria-label={t.common.close}
              />
              <div className="relative w-full max-w-5xl p-4">
                <Image
                  src={zoomImg}
                  alt="Zoomed screenshot"
                  width={1200}
                  height={700}
                  className="mx-auto max-h-[85vh] w-auto animate-in rounded-lg object-contain shadow-2xl duration-300 zoom-in-95"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomImg(null);
                  }}
                  className="absolute top-6 right-6 rounded-full bg-white/90 p-2.5 text-black shadow-lg transition-all hover:scale-110 hover:bg-white focus:ring-2 focus:ring-white/50 focus:outline-none"
                  aria-label={translations.common.close}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>
      )}
      {/* Navigation between projects */}
      <div className="mb-8 flex items-center justify-between gap-4 border-t border-muted pt-8">
        {previous ? (
          <Link
            href={`/projects/${previous.id}`}
            className="group flex items-center gap-2 rounded-lg border border-muted bg-muted/30 px-4 py-2 text-sm font-medium transition-all hover:border-foreground/20 hover:bg-muted/50"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">
              {translations.common.previous}
            </span>
            <span className="max-w-[120px] truncate sm:max-w-none">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.id}`}
            className="group flex items-center gap-2 rounded-lg border border-muted bg-muted/30 px-4 py-2 text-sm font-medium transition-all hover:border-foreground/20 hover:bg-muted/50"
          >
            <span className="max-w-[120px] truncate sm:max-w-none">
              {next.title}
            </span>
            <span className="hidden sm:inline">{translations.common.next}</span>
            <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
        >
          {translations.common.viewOnline}
          <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
