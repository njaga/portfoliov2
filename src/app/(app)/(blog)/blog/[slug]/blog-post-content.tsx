import type { TOCItemType } from "fumadocs-core/server";
import { cookies } from "next/headers";

import { InlineTOC } from "@/components/inline-toc";
import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedBlogPost } from "@/lib/translations";
import type { Post } from "@/types/blog";

export async function BlogPostContent({
  post,
  toc,
}: {
  readonly post: Post;
  readonly toc: TOCItemType[];
}) {
  // Récupérer la locale depuis les cookies côté serveur
  const cookieStore = await cookies();
  const locale =
    (cookieStore.get("locale")?.value as "fr" | "en") || defaultLocale;
  const postTranslation = getTranslatedBlogPost(post.slug, locale);

  const title = postTranslation?.title || post.metadata.title;
  const description = postTranslation?.description || post.metadata.description;

  return (
    <Prose className="px-4">
      <h1 className="screen-line-before screen-line-after mb-6 font-heading font-semibold">
        {title}
      </h1>

      <p className="lead mt-6 mb-6">{description}</p>

      <InlineTOC items={toc} />

      <div>
        <MDX code={post.content} />
      </div>
    </Prose>
  );
}
