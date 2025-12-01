import blogEn from "@/locales/data/blog.en.json";
import blogFr from "@/locales/data/blog.fr.json";
import certificationsEn from "@/locales/data/certifications.en.json";
import certificationsFr from "@/locales/data/certifications.fr.json";
import experiencesEn from "@/locales/data/experiences.en.json";
import experiencesFr from "@/locales/data/experiences.fr.json";
import projectsEn from "@/locales/data/projects.en.json";
import projectsFr from "@/locales/data/projects.fr.json";
import servicesEn from "@/locales/data/services.en.json";
import servicesFr from "@/locales/data/services.fr.json";

import type { Locale } from "./i18n";

export const projectTranslations = {
  en: projectsEn,
  fr: projectsFr,
} as const;

export const experienceTranslations = {
  en: experiencesEn,
  fr: experiencesFr,
} as const;

export const serviceTranslations = {
  en: servicesEn,
  fr: servicesFr,
} as const;

export const blogTranslations = {
  en: blogEn,
  fr: blogFr,
} as const;

export const certificationTranslations = {
  en: certificationsEn,
  fr: certificationsFr,
} as const;

export function getTranslatedProject(projectId: string, locale: Locale) {
  const translations = projectTranslations[locale];
  return translations[projectId as keyof typeof translations] || null;
}

export function getTranslatedExperience(experienceId: string, locale: Locale) {
  const translations = experienceTranslations[locale];
  return translations[experienceId as keyof typeof translations] || null;
}

export function getTranslatedService(serviceId: string, locale: Locale) {
  const translations = serviceTranslations[locale];
  return translations[serviceId as keyof typeof translations] || null;
}

export function getTranslatedBlogPost(slug: string, locale: Locale) {
  const translations = blogTranslations[locale];
  return translations[slug as keyof typeof translations] || null;
}

export function getTranslatedCertification(
  credentialID: string,
  locale: Locale
) {
  const translations = certificationTranslations[locale];
  return translations[credentialID as keyof typeof translations] || null;
}
