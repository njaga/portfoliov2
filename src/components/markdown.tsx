import Link from "next/link";
import { MarkdownAsync } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";

import { UTM_PARAMS } from "@/config/site";
import { rehypeAddQueryParams } from "@/lib/rehype-add-query-params";

// Cast to match react-markdown's Pluggable array type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rehypePlugins: any[] = [
  [
    rehypeExternalLinks,
    { target: "_blank", rel: "nofollow noopener noreferrer" },
  ],
  [rehypeAddQueryParams, UTM_PARAMS],
];

// Composant personnalisé pour les liens internes
function CustomLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    children?: React.ReactNode;
  }
) {
  const { href, children, ...restProps } = props;

  if (!href) {
    return <a {...restProps}>{children}</a>;
  }

  // Vérifier si c'est un lien interne (commence par / ou #)
  const isInternalLink =
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (
    isInternalLink &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  ) {
    // Retirer href des props pour éviter la duplication
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href: _unused, ...linkProps } = restProps as { href?: string };
    return (
      <Link
        href={href}
        {...(linkProps as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  // Pour les liens externes, utiliser une balise <a> normale
  return (
    <a href={href} {...restProps}>
      {children}
    </a>
  );
}

// Version async pour les Server Components
export function Markdown(props: React.ComponentProps<typeof MarkdownAsync>) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins}
      components={{
        a: CustomLink,
      }}
      {...props}
    />
  );
}

// Version synchrone pour les Client Components
export function MarkdownClient(
  props: React.ComponentProps<typeof ReactMarkdown>
) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins}
      components={{
        a: CustomLink,
      }}
      {...props}
    />
  );
}
