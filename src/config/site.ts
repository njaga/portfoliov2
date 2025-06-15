import { USER } from "@/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://ndiagandiaye.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const SOURCE_CODE_GITHUB_URL = "https://github.com/njaga/portfoliov2";

export const SENEGAL_HOLIDAYS = [
  "2025-04-04", // Fête de l'Indépendance
  "2025-05-01", // Fête du Travail
  "2025-04-19", // Fête de la Liberté
  "2025-12-25", // Noël
];

export const UTM_PARAMS = {
  utm_source: "ndiagandiaye.com",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
