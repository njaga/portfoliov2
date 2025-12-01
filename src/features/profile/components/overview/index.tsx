"use client";

import { GlobeIcon, MapPinIcon } from "lucide-react";

import { USER } from "@/data/user";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { EmailItem } from "./email-item";
import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export function Overview() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  return (
    <Panel>
      <h2 className="sr-only">{translations.profile.overview}</h2>

      <PanelContent className="space-y-2">
        {USER.jobs.map((job, index) => {
          // Traduire le titre du job
          const jobTranslation = translations.profile.jobs?.[index];
          const jobTitle = jobTranslation?.title || job.title;

          return (
            <JobItem
              key={index}
              title={jobTitle}
              company={job.company}
              website={job.website}
            />
          );
        })}

        <IntroItem icon={MapPinIcon} content={USER.address} />

        <PhoneItem phoneNumber={USER.phoneNumber} />

        <EmailItem email={USER.email} />

        <IntroItem
          icon={GlobeIcon}
          content={urlToName(USER.website)}
          href={USER.website}
        />
      </PanelContent>
    </Panel>
  );
}
