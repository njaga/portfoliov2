import dayjs from "dayjs";
import { cookies } from "next/headers";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { USER } from "@/data/user";
import { About } from "@/features/profile/components/about";
import { Blog } from "@/features/profile/components/blog";
import { Certifications } from "@/features/profile/components/certifications";
import { Experiences } from "@/features/profile/components/experiences";
import { Overview } from "@/features/profile/components/overview";
import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Projects } from "@/features/profile/components/projects";
import { Services } from "@/features/profile/components/services";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TeckStack } from "@/features/profile/components/teck-stack";
import { addLocaleToPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function Page() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "en" ? "en" : "fr";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(locale)).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <About />
        <Separator />

        <TeckStack />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Services />
        <Separator />

        <Blog />
        <Separator />

        <Certifications />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(locale: Locale): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${USER.website}${addLocaleToPath("/", locale)}#profile`,
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    mainEntity: {
      "@type": "Person",
      "@id": `${USER.website}/#person`,
      name: USER.displayName,
      identifier: USER.username,
      url: USER.website,
      image: `${USER.website}${USER.avatar}`,
      jobTitle: USER.jobTitle,
      sameAs: USER.otherWebsites,
      knowsAbout: [
        "Full-stack web development",
        "Laravel",
        "Next.js",
        "SaaS",
        "Digital transformation",
      ],
      worksFor: {
        "@type": "Organization",
        name: "KAMIT Digital Solutions",
        url: "https://kamit.tech",
      },
      homeLocation: {
        "@type": "Place",
        name: USER.address,
      },
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
