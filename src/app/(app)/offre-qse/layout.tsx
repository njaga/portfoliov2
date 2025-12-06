import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Offre Site Web QSE & Prévention des Risques",
  description:
    "Solution complète pour votre site web professionnel avec boutique e-commerce intégrée. Développement sur-mesure en 4 semaines avec Laravel 11, Livewire et Tailwind CSS.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Offre Site Web QSE & Prévention des Risques",
    description:
      "Solution complète pour votre site web professionnel avec boutique e-commerce intégrée.",
    url: `${SITE_INFO.url}/offre-qse`,
    type: "website",
  },
};

export default function OffreQSELayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
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
