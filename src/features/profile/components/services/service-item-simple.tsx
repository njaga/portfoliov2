import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import type { Service } from "../../data/services";

interface ServiceItemSimpleProps {
  service: Service;
}

export function ServiceItemSimple({ service }: ServiceItemSimpleProps) {
  const Icon = service.icon;

  return (
    <Link 
      href="/services"
      className="group block rounded-xl border border-edge bg-background p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {service.shortDescription}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}