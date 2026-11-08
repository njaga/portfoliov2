"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import {
  defaultLocale,
  getLocaleFromPath,
  getTranslations,
  type Locale,
} from "@/lib/i18n";

type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
  mounted: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep client-side navigation in sync with the URL. Do not restore an old
  // preference that would override the language of a shared link.
  useEffect(() => {
    setLocaleState(getLocaleFromPath(window.location.pathname));
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Persist only an explicit visitor choice, not an automatically detected locale.
    document.cookie = `locale_preference=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("locale", newLocale);
  };

  return (
    <TranslationContext.Provider
      value={{
        locale,
        setLocale,
        t: getTranslations(locale),
        mounted: true,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}
