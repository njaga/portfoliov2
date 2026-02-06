"use client";

import { GithubIcon } from "lucide-react";

import { SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

import { NdiagaMark } from "./ndiaga-mark";

export function SiteFooter() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 pb-[env(safe-area-inset-bottom,0px)] md:max-w-3xl">
        <p className="mb-1 text-center font-mono text-sm text-balance text-muted-foreground">
          {translations.footer.craftedWithPassion}
        </p>

        <p className="mb-4 text-center font-mono text-sm text-balance text-muted-foreground">
          {translations.footer.builtBy}{" "}
          <a
            className="link"
            href="https://www.linkedin.com/in/ndiagandiaye"
            target="_blank"
            rel="noopener"
          >
            Ndiaga Ndiaye
          </a>
          . {translations.footer.sourceCodeAvailable}{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <div className="flex items-center justify-center gap-4 pb-5">
          <a
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <NdiagaMark className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground" />
        </div>
      </div>
    </footer>
  );
}
