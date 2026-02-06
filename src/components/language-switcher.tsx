"use client";

import { useTranslation } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/lib/i18n";

// Composants SVG pour les drapeaux
function FlagGB({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="gb-clip">
        <rect width="36" height="36" rx="4" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect fill="#00247D" width="36" height="36" />
        <path
          fill="#CF142B"
          d="M0,0 L36,36 M36,0 L0,36"
          stroke="#CF142B"
          strokeWidth="4"
        />
        <path
          fill="#FFFFFF"
          d="M0,0 L36,36 M36,0 L0,36"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
        <path
          fill="#CF142B"
          d="M0,0 L36,36 M36,0 L0,36"
          stroke="#CF142B"
          strokeWidth="2"
        />
        <rect fill="#FFFFFF" x="15" width="6" height="36" />
        <rect fill="#FFFFFF" y="15" width="36" height="6" />
        <rect fill="#CF142B" x="16.5" width="3" height="36" />
        <rect fill="#CF142B" y="16.5" width="36" height="3" />
      </g>
    </svg>
  );
}

function FlagFR({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="fr-clip">
        <rect width="36" height="36" rx="4" />
      </clipPath>
      <g clipPath="url(#fr-clip)">
        <rect fill="#ED2939" x="24" width="12" height="36" />
        <rect fill="#FFFFFF" x="12" width="12" height="36" />
        <rect fill="#002395" width="12" height="36" />
      </g>
    </svg>
  );
}

const languages: {
  code: Locale;
  name: string;
  Flag: React.ComponentType<{ className?: string }>;
}[] = [
  { code: "en", name: "English", Flag: FlagGB },
  { code: "fr", name: "Français", Flag: FlagFR },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const currentLang = languages.find((l) => l.code === locale) || languages[0];
  const CurrentFlag = currentLang.Flag;

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Change language"
        >
          <CurrentFlag className="h-5 w-5 rounded-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={locale === lang.code ? "bg-muted" : ""}
          >
            <lang.Flag className="mr-2 h-4 w-4 rounded-sm" />
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
