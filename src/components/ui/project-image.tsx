"use client";

import Image from "next/image";
import { useState } from "react";

import { Icons } from "@/components/icons";

interface ProjectImageProps {
  src: string | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({
  src,
  alt,
  width = 600,
  height = 338,
  className = "object-cover",
  priority = false,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="relative flex aspect-video items-center justify-center rounded-xl bg-muted select-none">
        <Icons.project className="size-16 text-foreground/70" aria-hidden />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
      </div>
    );
  }

  return (
    <div className="relative select-none [&_img]:aspect-video [&_img]:rounded-xl">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        className={className}
        priority={priority}
        unoptimized
        onError={() => setHasError(true)}
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
    </div>
  );
}
