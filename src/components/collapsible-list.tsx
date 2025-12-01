"use client";

import { ChevronDownIcon } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const Slot = SlotPrimitive.Slot;

export function CollapsibleList<T>({
  items,
  max = 3,

  keyExtractor,
  renderItem,
}: {
  readonly items: T[];
  readonly max?: number;

  readonly keyExtractor?: (item: T) => string;
  readonly renderItem: (item: T) => React.ReactNode;
}) {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  return (
    <Collapsible>
      {items.slice(0, max).map((award, index) => (
        <Slot
          key={typeof keyExtractor === "function" ? keyExtractor(award) : index}
          className="border-b border-edge"
        >
          {renderItem(award)}
        </Slot>
      ))}

      <CollapsibleContent>
        {items.slice(max).map((award, index) => (
          <Slot
            key={
              typeof keyExtractor === "function"
                ? keyExtractor(award)
                : max + index
            }
            className="border-b border-edge"
          >
            {renderItem(award)}
          </Slot>
        ))}
      </CollapsibleContent>

      {items.length > max && (
        <div className="flex h-12 items-center justify-center pb-px">
          <CollapsibleTrigger asChild>
            <Button
              className="group/collapsible-trigger flex"
              variant="secondary"
            >
              <span className="hidden group-data-[state=closed]/collapsible-trigger:block">
                {translations.common.showMore}
              </span>

              <span className="hidden group-data-[state=open]/collapsible-trigger:block">
                {translations.common.showLess}
              </span>

              <ChevronDownIcon className="group-data-[state=open]/collapsible-trigger:rotate-180" />
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  );
}
