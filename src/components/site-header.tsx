"use client";

import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { NavItemGitHub } from "@/components/nav-item-github";
import { ToggleTheme } from "@/components/toggle-theme";
import { MAIN_NAV } from "@/config/site";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

import { BrandContextMenu } from "./brand-context-menu";
import { LanguageSwitcher } from "./language-switcher";
import { SiteHeaderMark } from "./site-header-mark";
import { SiteHeaderWrapper } from "./site-header-wrapper";

export const SiteHeader = () => {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  // Créer les items de navigation traduits
  const translatedNav: NavItem[] = MAIN_NAV.map((item) => {
    const translationKey =
      item.title.toLowerCase() as keyof typeof translations.nav;
    return {
      ...item,
      title: translations.nav[translationKey] || item.title,
    };
  });

  return (
    <>
      <div className="flex h-14" />
      <SiteHeaderWrapper
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-background px-2 pt-2",
          "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]/80",
          "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
          "transition-shadow duration-300"
        )}
      >
        <div
          className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
          data-header-container
        >
          <BrandContextMenu>
            <Link href="/" aria-label="Home" className="[&_svg]:h-8">
              <SiteHeaderMark />
            </Link>
          </BrandContextMenu>

          <div className="flex-1" />

          <DesktopNav items={translatedNav} />

          <div className="flex items-center gap-2">
            <CommandMenu />
            <LanguageSwitcher />
            <NavItemGitHub />
            <ToggleTheme />
            <MobileNav className="sm:hidden" items={translatedNav} />
          </div>
        </div>
      </SiteHeaderWrapper>
    </>
  );
};
