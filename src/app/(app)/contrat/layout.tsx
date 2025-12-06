import "./print.css";

import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contrat Type - Développement Web",
  description:
    "Contrat de prestation de services de développement web - Document contractuel de référence",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Contrat Type - Développement Web",
    description: "Contrat de prestation de services de développement web",
    url: `${SITE_INFO.url}/contrat`,
    type: "website",
  },
};

export default function ContratLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="-mx-2 mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />
      {children}
    </div>
  );
}
