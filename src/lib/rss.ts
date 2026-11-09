import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/data/blog";
import { addLocaleToPath, type Locale } from "@/lib/i18n";

/** Escape all user/editor supplied text before embedding it in XML. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderRss(locale: Locale): string {
  const title = locale === "fr" ? "Journal de bord" : "Build journal";
  const blogUrl = SITE_INFO.url + addLocaleToPath("/blog", locale);
  const rssUrl = SITE_INFO.url + addLocaleToPath("/rss", locale);

  const items = getAllPosts(locale)
    .map((post) => {
      const url = SITE_INFO.url + addLocaleToPath(`/blog/${post.slug}`, locale);
      return `<item>
        <title>${escapeXml(post.metadata.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(post.metadata.description || "")}</description>
        <pubDate>${new Date(post.metadata.createdAt).toUTCString()}</pubDate>
      </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xml:lang="${locale}" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title + " | " + SITE_INFO.name)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(locale === "fr" ? "Articles de Ndiaga Ndiaye" : "Articles by Ndiaga Ndiaye")}</description>
    <language>${locale === "fr" ? "fr-SN" : "en-US"}</language>
    <atom:link href="${escapeXml(rssUrl)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
