import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

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

      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={["kamit-website", "portfolio-ndiaga", "ecommerce-platform"]}
      >
        <div className="pr-2 pl-4">
          {PROJECTS.slice(0, 4).map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </AccordionPrimitive.Root>

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
