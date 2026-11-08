"use client";

import NextLink from "next/link";

import { useTranslation } from "@/components/i18n-provider";
import { addLocaleToPath } from "@/lib/i18n";

type Props = React.ComponentProps<typeof NextLink>;

/** A drop-in Next.js Link that preserves /en on all internal navigation. */
export default function Link({ href, ...props }: Props) {
  const { locale } = useTranslation();
  const localizedHref =
    typeof href === "string"
      ? addLocaleToPath(href, locale)
      : href.pathname
        ? { ...href, pathname: addLocaleToPath(href.pathname, locale) }
        : href;

  return <NextLink {...props} href={localizedHref} />;
}
