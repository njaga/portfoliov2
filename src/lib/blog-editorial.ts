import type { Locale } from "@/lib/i18n";
import type { Post, PostMetadata } from "@/types/blog";

export type EditorialCategory =
  | "journal"
  | "development"
  | "entrepreneurship"
  | "ai"
  | "security"
  | "society";

export type BlogPreview = {
  slug: string;
  metadata: PostMetadata;
  category: EditorialCategory;
  readingMinutes: number;
};

export const EDITORIAL_CATEGORIES: EditorialCategory[] = [
  "journal",
  "development",
  "entrepreneurship",
  "ai",
  "security",
  "society",
];

export const BLOG_TEXT = {
  fr: {
    eyebrow: "Carnet personnel · Dakar, Sénégal",
    title: "J'apprends en construisant.",
    introduction:
      "Je suis développeur, je lance des projets et j'essaie de faire grandir ma petite entreprise. Ici, je raconte ce que j'expérimente, ce que j'apprends et ce qui ne se passe pas toujours comme prévu.",
    signature: "Pas de recette miracle. Juste du code, des idées et la vraie vie.",
    featured: "Dans mon carnet",
    featuredLabel: "À découvrir",
    latest: "Les billets",
    latestDescription: "Du terrain, de la technique et quelques réflexions en chemin.",
    all: "Tout",
    empty: "Pas encore de billets sur ce thème.",
    previous: "Précédent",
    next: "Suivant",
    readArticle: "Lire le billet",
    readTime: "min de lecture",
    articles: "billets",
    aboutTitle: "Encore au début de l'aventure.",
    about:
      "J'écris pendant que je construis, pas après avoir tout réussi. Si tu aimes les projets imparfaits, les questions sans réponse et les petites victoires, bienvenue.",
    rss: "Suivre via RSS",
    contact: "Échanger avec moi",
    back: "Tous les billets",
    toc: "Dans ce billet",
    authorTitle: "Écrit par Ndiaga Ndiaye",
    authorBio:
      "Développeur et créateur de projets numériques à Dakar. J'expérimente, j'apprends et je partage le chemin.",
    share: "Partager sur LinkedIn",
    more: "À lire aussi",
    categories: {
      journal: "Journal de bord",
      development: "Développement",
      entrepreneurship: "Entrepreneuriat",
      ai: "IA & automatisation",
      security: "Cybersécurité",
      society: "Tech & société",
    },
  },
  en: {
    eyebrow: "Personal notes · Dakar, Senegal",
    title: "Learning by building.",
    introduction:
      "I'm a developer building projects and trying to grow my small business. This is where I share what I experiment with, what I'm learning, and what doesn't always go to plan.",
    signature: "No magic formula. Just code, ideas, and real life.",
    featured: "From the notebook",
    featuredLabel: "Featured story",
    latest: "All stories",
    latestDescription: "Hands-on experiments, technology and thoughts along the way.",
    all: "All",
    empty: "No stories in this category yet.",
    previous: "Previous",
    next: "Next",
    readArticle: "Read the story",
    readTime: "min read",
    articles: "stories",
    aboutTitle: "Still at the beginning.",
    about:
      "I write while I'm building, not after I've made it. If you like imperfect projects, open questions and little wins, welcome.",
    rss: "Follow via RSS",
    contact: "Get in touch",
    back: "All stories",
    toc: "In this story",
    authorTitle: "Written by Ndiaga Ndiaye",
    authorBio:
      "Developer and digital maker based in Dakar. Experimenting, learning and sharing the journey.",
    share: "Share on LinkedIn",
    more: "Keep reading",
    categories: {
      journal: "Build journal",
      development: "Development",
      entrepreneurship: "Entrepreneurship",
      ai: "AI & automation",
      security: "Cybersecurity",
      society: "Tech & society",
    },
  },
} as const;

export function getEditorialCategory(
  post: Pick<Post, "slug" | "metadata">
): EditorialCategory {
  if (
    post.slug === "pourquoi-je-construis-kumba" ||
    post.slug === "mon-experience-chez-vigilus"
  ) {
    return "journal";
  }

  const category = (post.metadata.category ?? "").toLowerCase().trim();
  if (category.includes("intelligence artificielle") || category === "ai") {
    return "ai";
  }
  if (category.includes("security") || category.includes("sécurité")) {
    return "security";
  }
  if (category === "development" || category === "développement") {
    return "development";
  }
  if (category === "business" || category === "entrepreneurship") {
    return "entrepreneurship";
  }
  if (category === "product" || category === "journal") {
    return "journal";
  }

  return "society";
}

export function getReadingMinutes(content: string) {
  const text = content
    .replace(/`{3}[\s\S]*?`{3}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_~>[]()]/g, " ")
    .trim();
  const count = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(count / 220));
}

export function toBlogPreview(post: Post): BlogPreview {
  return {
    slug: post.slug,
    metadata: post.metadata,
    category: getEditorialCategory(post),
    readingMinutes: getReadingMinutes(post.content),
  };
}

export function formatBlogDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
