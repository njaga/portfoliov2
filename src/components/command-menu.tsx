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
import { copyText } from "@/utils/copy";

import { Icons } from "./icons";
import { getMarkSVG, getWordmarkSVG,NdiagaMark } from "./ndiaga-mark";
import { Button } from "./ui/button";

type CommandItemType = {
  title: string;
  value: string;
  icon?: React.ComponentType;
  iconImage?: string;
};

const PAGES: CommandItemType[] = [
  {
    title: "Home",
    value: "/",
    icon: NdiagaMark,
  },
  {
    title: "Projects",
    value: "/projects",
    icon: Icons.project,
  },
  {
    title: "Blog",
    value: "/blog",
    icon: RssIcon,
  },
  {
    title: "Contact",
    value: "/contact",
    icon: CircleUserIcon,
  },
];

const PORTFOLIO: CommandItemType[] = [
  {
    title: "About",
    value: "/#about",
    icon: LetterTextIcon,
  },
  {
    title: "Experience",
    value: "/#experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Services",
    value: "/#services",
    icon: SettingsIcon,
  },
  {
    title: "Projects",
    value: "/#projects",
    icon: Icons.project,
  },
  {
    title: "Certifications",
    value: "/#certs",
    icon: Icons.certificate,
  },
  {
    title: "Download vCard",
    value: "/vcard",
    icon: CircleUserIcon,
  },
];

const BLOG: CommandItemType[] = [
  {
    title: "The Importance of Having a Website in 2025",
    value: "/blog/importance-site-web-2025",
  },
  {
    title: "Essential Tools for Modern Entrepreneurs",
    value: "/blog/entrepreneur-tools",
  },
  {
    title: "Senegal's Technological New Deal",
    value: "/blog/technological-new-deal",
  },
  {
    title: "Vibe Coding: The Future of Development",
    value: "/blog/vibe-coding",
  },
];

const SOCIAL_LINKS: CommandItemType[] = SOCIAL_LINKS_DATA.map((item) => ({
  title: item.title,
  value: item.href,
  iconImage: item.icon,
}));

export function CommandMenu() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const [open, setOpen] = useState(false);

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
          Search
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
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroupItems
            heading="Pages"
            items={PAGES}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading="Portfolio"
            items={PORTFOLIO}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading="Blog"
            items={BLOG}
            onSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroupItems
            heading="Social Links"
            items={SOCIAL_LINKS}
            onSelect={(value) => handleOpenLink(value, true)}
          />

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => handleThemeChange("light")}>
              <SunIcon />
              Light
            </CommandItem>
            <CommandItem onSelect={() => handleThemeChange("dark")}>
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => handleThemeChange("system")}>
              <MonitorIcon />
              System
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Ndiaga Brand">
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Mark as SVG"
                );
              }}
            >
              <NdiagaMark />
              Copy Mark as SVG
            </CommandItem>

            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getWordmarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Logotype as SVG"
                );
              }}
            >
              <TypeIcon />
              Copy Logotype as SVG
            </CommandItem>

            <CommandItem asChild>
              <a href="mailto:contact@ndiagandiaye.com" target="_blank" rel="noopener noreferrer">
                <MailIcon />
                Contact Me
              </a>
            </CommandItem>

            <CommandItem asChild>
              <a href="https://github.com/njaga" target="_blank" rel="noopener noreferrer">
                <DownloadIcon />
                GitHub Profile
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
