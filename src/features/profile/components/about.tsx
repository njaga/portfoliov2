"use client";

import { MarkdownClient } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>{translations.about.title}</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <MarkdownClient>{translations.about.text}</MarkdownClient>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
