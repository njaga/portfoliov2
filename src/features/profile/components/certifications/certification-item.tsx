"use client";

import dayjs from "dayjs";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getIcon, Icons } from "@/components/icons";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedCertification } from "@/lib/translations";
import { cn } from "@/lib/utils";

import type { Certification } from "../../types/certifications";

export function CertificationItem({
  className,
  certification,
}: {
  readonly className?: string;
  readonly certification: Certification;
}) {
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;

  // Utiliser credentialID comme identifiant, ou créer un slug basé sur le titre et la date si credentialID est "#"
  const certId =
    certification.credentialID === "#"
      ? `${certification.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}-${certification.issueDate}`
      : certification.credentialID;

  const certTranslation = getTranslatedCertification(certId, currentLocale);
  const title = certTranslation?.title || certification.title;

  return (
    <a
      className={cn("group/cert flex items-center pr-2", className)}
      href={certification.credentialURL}
      target="_blank"
      rel="noopener"
    >
      {certification.issuerLogoURL ? (
        <Image
          src={certification.issuerLogoURL}
          alt={certification.issuer}
          width={32}
          height={32}
          quality={100}
          className="mx-4 flex size-6 shrink-0"
          unoptimized
        />
      ) : (
        <div
          className="mx-4 flex size-6 shrink-0 items-center justify-center [&_svg]:size-5 [&_svg]:text-muted-foreground"
          aria-hidden="true"
        >
          {getIcon(certification.issuerIconName) ?? <Icons.certificate />}
        </div>
      )}

      <div className="flex-1 space-y-1 border-l border-dashed border-edge p-4 pr-2">
        <h3 className="font-heading leading-snug font-medium text-balance decoration-ring underline-offset-4 group-hover/cert:underline">
          {title}
        </h3>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>
            @<span className="ml-0.5">{certification.issuer}</span>
          </span>

          <span className="flex h-4 w-px shrink-0 bg-border" />
          <span>{dayjs(certification.issueDate).format("MM.YYYY")}</span>
        </p>
      </div>

      {certification.credentialURL && (
        <ArrowUpRightIcon className="size-4 text-muted-foreground" />
      )}
    </a>
  );
}
