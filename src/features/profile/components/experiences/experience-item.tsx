import { BriefcaseIcon } from "lucide-react";
import React from "react";

import type { Experience } from "../../types/experiences";
import { ExperiencePositionItem } from "./experience-position-item";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <BriefcaseIcon className="size-4" />
        </span>

        <h3 className="font-heading text-lg leading-snug font-medium">
          {experience.company}
        </h3>

        {experience.current && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50"></span>
            <span className="relative inline-flex size-2 rounded-full bg-info"></span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position, index) => {
          return <ExperiencePositionItem key={index} position={position} />;
        })}
      </div>
    </div>
  );
}
