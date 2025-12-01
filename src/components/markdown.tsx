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

// Version async pour les Server Components
export function Markdown(props: React.ComponentProps<typeof MarkdownAsync>) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins}
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
      {...props}
    />
  );
}
