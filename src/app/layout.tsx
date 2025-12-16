import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import type { WebSite, WithContext } from "schema-dts";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { USER } from "@/data/user";
import { fontGlitch, fontMono, fontSans } from "@/lib/fonts";
import { defaultLocale, type Locale } from "@/lib/i18n";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [USER.username],
  };
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export async function generateMetadata(): Promise<Metadata> {
  // Utiliser la bio de l'utilisateur comme description (elle est déjà traduite dans les données)
  const description = SITE_INFO.description;

  return {
    metadataBase: new URL(SITE_INFO.url),
    alternates: {
      canonical: "/",
      languages: {
        fr: "/",
        en: "/",
      },
    },
    title: {
      template: `%s | ${SITE_INFO.name}`,
      default: `${USER.displayName} - ${USER.jobTitle}`,
    },
    description,
    keywords: SITE_INFO.keywords,
    authors: [
      {
        name: "Ndiaga Ndiaye",
        url: SITE_INFO.url,
      },
    ],
    creator: "Ndiaga Ndiaye",
    openGraph: {
      siteName: SITE_INFO.name,
      url: "/",
      type: "profile",
      firstName: USER.firstName,
      lastName: USER.lastName,
      username: USER.username,
      gender: USER.gender,
      description,
      images: [
        {
          url: SITE_INFO.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_INFO.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@ndiaga_dev",
      description,
      images: [SITE_INFO.ogImage],
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "any",
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} ${fontMono.variable} ${fontGlitch.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NN9X7YM348"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NN9X7YM348');
          `}
        </Script>

        {/* Microsoft Clarity (optional) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
