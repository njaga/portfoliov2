import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";

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
  // Layout sans les contraintes du layout blog pour permettre un design plus large
  // Le layout principal (app) ajoute px-2, on l'annule pour cette page
  return <div className="-mx-2">{children}</div>;
}
