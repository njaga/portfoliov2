import { Accordion as AccordionPrimitive } from "radix-ui";
import React from "react";

import { CollapsibleList } from "@/components/collapsible-list";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  const defaultValue = EXPERIENCES.flatMap((exp) =>
    exp.positions.filter((pos) => pos.expanded).map((pos) => pos.id)
  );

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>
          Experience
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({EXPERIENCES.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={defaultValue}
        asChild
      >
        <div className="pr-2 pl-4">
          <CollapsibleList
            items={EXPERIENCES}
            max={3}
            keyExtractor={(experience) => experience.company}
            renderItem={(experience) => <ExperienceItem experience={experience} />}
          />
        </div>
      </AccordionPrimitive.Root>
    </Panel>
  );
}
