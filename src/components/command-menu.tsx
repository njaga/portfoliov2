"use client";

import {
  BriefcaseBusinessIcon,
  CircleUserIcon,
  DownloadIcon,
  FileTextIcon,
  LetterTextIcon,
  MailIcon,
  MonitorIcon,
  MoonStarIcon,
  RssIcon,
  SettingsIcon,
  SunIcon,
  TypeIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SOCIAL_LINKS as SOCIAL_LINKS_DATA } from "@/features/profile/data/social-links";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { getTranslatedBlogPost } from "@/lib/translations";
import { copyText } from "@/utils/copy";

import { Icons } from "./icons";
import { getMarkSVG, getWordmarkSVG, NdiagaMark } from "./ndiaga-mark";
import { Button } from "./ui/button";

type CommandItemType = {
  title: string;
  value: string;
  icon?: React.ComponentType;
  iconImage?: string;
};

const SOCIAL_LINKS: CommandItemType[] = SOCIAL_LINKS_DATA.map((item) => ({
  title: item.title,
  value: item.href,
  iconImage: item.icon,
}));

export function CommandMenu() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { t, locale, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);
  const currentLocale = mounted ? locale : defaultLocale;

  const [open, setOpen] = useState(false);

  // Générer les listes traduites
  const PAGES: CommandItemType[] = [
    {
      title: translations.nav.home,
      value: "/",
      icon: NdiagaMark,
    },
    {
      title: translations.nav.projects,
      value: "/projects",
      icon: Icons.project,
    },
    {
      title: translations.nav.blog,
      value: "/blog",
      icon: RssIcon,
    },
    {
      title: translations.nav.contact,
      value: "/contact",
      icon: CircleUserIcon,
    },
  ];

  const PORTFOLIO: CommandItemType[] = [
    {
      title: translations.about.title,
      value: "/#about",
      icon: LetterTextIcon,
    },
    {
      title: translations.experience.title,
      value: "/#experience",
      icon: BriefcaseBusinessIcon,
    },
    {
      title: translations.services.title,
      value: "/#services",
      icon: SettingsIcon,
    },
    {
      title: translations.projects.title,
      value: "/#projects",
      icon: Icons.project,
    },
    {
      title: translations.certifications.title,
      value: "/#certs",
      icon: Icons.certificate,
    },
    {
      title: translations.profile.saveVCard,
      value: "/vcard",
      icon: CircleUserIcon,
    },
  ];

  const BLOG: CommandItemType[] = [
    {
      title:
        getTranslatedBlogPost("importance-site-web-2025", currentLocale)
          ?.title || "The Importance of Having a Website in 2025",
      value: "/blog/importance-site-web-2025",
    },
    {
      title:
        getTranslatedBlogPost("entrepreneur-tools", currentLocale)?.title ||
        "Essential Tools for Modern Entrepreneurs",
      value: "/blog/entrepreneur-tools",
    },
    {
      title:
        getTranslatedBlogPost("technological-new-deal", currentLocale)?.title ||
        "Senegal's Technological New Deal",
      value: "/blog/technological-new-deal",
    },
    {
      title:
        getTranslatedBlogPost("vibe-coding", currentLocale)?.title ||
        "Vibe Coding: The Future of Development",
      value: "/blog/vibe-coding",
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => !open);
        }
      },
      { signal }
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, external = false) => {
      setOpen(false);

      if (external) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router]
  );

  const handleThemeChange = useCallback(
    (theme: "light" | "dark" | "system") => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme]
  );

  const handleCopyText = useCallback((text: string, msg: string) => {
    setOpen(false);
    copyText(text);
    toast.success(msg);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        className="h-8 gap-1.5 rounded-full border bg-zinc-50 px-2.5 text-muted-foreground select-none hover:bg-zinc-50 dark:border-zinc-700/80 dark:bg-zinc-900 dark:hover:bg-zinc-900"
        onClick={() => setOpen(true)}
      >
        <svg
          className="size-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path
            d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>

        <span className="font-sans text-sm/4 font-medium sm:hidden">
          {translations.search.button}
        </span>

        <span className="max-sm:hidden">
          <kbd className="hidden h-4 items-center rounded-sm bg-black/5 px-1 font-sans text-[13px]/4 font-normal tracking-wider in-[.os-macos]:flex dark:bg-white/10">
            ⌘K
          </kbd>

          <kbd className="hidden h-4 items-center rounded-sm bg-black/5 px-1 font-sans text-[13px]/4 not-[.os-macos_&]:flex dark:bg-white/10">
            Ctrl K
          </kbd>
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={translations.search.placeholder} />

        <CommandList>
          <CommandEmpty>{translations.search.noResults}</CommandEmpty>

          <CommandGroupItems
            heading={translations.search.pages}
            items={PAGES}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading={translations.search.portfolio}
            items={PORTFOLIO}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading={translations.search.blog}
            items={BLOG}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading={translations.search.socialLinks}
            items={SOCIAL_LINKS}
            onSelect={(value) => handleOpenLink(value, true)}
          />

          <CommandSeparator />

          <CommandGroup heading={translations.search.theme}>
            <CommandItem onSelect={() => handleThemeChange("light")}>
              <SunIcon />
              {translations.search.light}
            </CommandItem>
            <CommandItem onSelect={() => handleThemeChange("dark")}>
              <MoonStarIcon />
              {translations.search.dark}
            </CommandItem>
            <CommandItem onSelect={() => handleThemeChange("system")}>
              <MonitorIcon />
              {translations.search.system}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={translations.search.ndiagaBrand}>
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  translations.search.copiedMark
                );
              }}
            >
              <NdiagaMark />
              {translations.search.copyMark}
            </CommandItem>

            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getWordmarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  translations.search.copiedLogotype
                );
              }}
            >
              <TypeIcon />
              {translations.search.copyLogotype}
            </CommandItem>

            <CommandItem asChild>
              <a
                href="mailto:contact@ndiagandiaye.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailIcon />
                {translations.search.contactMe}
              </a>
            </CommandItem>

            <CommandItem asChild>
              <a
                href="https://github.com/njaga"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadIcon />
                {translations.search.githubProfile}
              </a>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function CommandGroupItems({
  heading,
  items,
  fallbackIcon: FallbackIcon = FileTextIcon,
  onSelect,
}: {
  heading: string;
  items: CommandItemType[];
  fallbackIcon?: React.ComponentType;
  onSelect: (value: string) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {items.map((item) => {
        const Icon = item?.icon ?? FallbackIcon;

        return (
          <CommandItem
            key={item.value}
            value={item.title}
            onSelect={() => onSelect(item.value)}
          >
            {item?.iconImage ? (
              <Image
                className="rounded-sm"
                src={item.iconImage}
                alt={item.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {item.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}
