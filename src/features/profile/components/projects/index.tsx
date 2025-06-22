import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project) => (
            <Link
              key={project.id}
              href={addQueryParams(project.link, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
              className="group/project flex flex-col gap-2 p-2"
            >
              {project.logo ? (
                <div className="relative select-none [&_img]:aspect-video [&_img]:rounded-xl">
                  <Image
                    src={project.logo}
                    alt={project.title}
                    width={600}
                    height={338}
                    quality={100}
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
                </div>
              ) : (
                <div className="relative flex aspect-video items-center justify-center rounded-xl bg-muted select-none">
                  <Icons.project
                    className="size-16 text-blue-500"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
                </div>
              )}

              <div className="flex flex-col gap-1 p-2">
                <div className="flex items-center gap-1">
                  <h3 className="font-heading text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/project:underline group-hover/project:project-title-hover">
                    {project.title}
                  </h3>
                  <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/project:text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">{project.time}</p>
                {project.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {project.description.split("\n")[0]}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.skills.slice(0, 3).map((skill, index) => (
                    <Tag key={index} className="text-xs">
                      {skill}
                    </Tag>
                  ))}
                  {project.skills.length > 3 && (
                    <Tag className="text-xs text-muted-foreground">
                      +{project.skills.length - 3}
                    </Tag>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button variant="secondary" asChild>
          <Link href="/projects">
            <span>All Projects</span>
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
