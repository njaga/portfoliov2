"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { defaultLocale, getTranslations, type Locale } from "@/lib/i18n";

type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
  mounted: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

function getCookieLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="))
    ?.split("=")[1] as Locale | undefined;

  if (cookieLocale && (cookieLocale === "fr" || cookieLocale === "en")) {
    return cookieLocale;
  }

  return null;
}

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLocale = localStorage.getItem("locale") as Locale | null;
  if (storedLocale && (storedLocale === "fr" || storedLocale === "en")) {
    return storedLocale;
  }

  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Au montage, lire la locale depuis le cookie ou localStorage
    const cookieLocale = getCookieLocale();
    if (cookieLocale) {
      setLocaleState(cookieLocale);
    } else {
      const storedLocale = getStoredLocale();
      if (storedLocale) {
        setLocaleState(storedLocale);
        document.cookie = `locale=${storedLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = getTranslations(locale);

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, mounted }}>
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
