import { ArrowLeftIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ServiceItem } from "@/features/profile/components/services/service-item";
import { SERVICES } from "@/features/profile/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive digital services including web development, mobile apps, UI/UX design, and more.",
};

export default function Page() {
  return (
    <div className="min-h-svh [--color-services:#3B82F6] dark:[--color-services:#60A5FA]">
      {/* Header */}
      <div className="flex items-center justify-between p-2 pl-4">
        <Link 
          href="/#services"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Portfolio
        </Link>
        
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MailIcon className="h-4 w-4" />
          Get Quote
        </Link>
      </div>

      {/* Title */}
      <div className="screen-line-after px-4">
        <h1 className="font-heading text-3xl font-semibold">Services</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          Comprehensive digital services to help your business grow and succeed in the digital world.
        </p>
      </div>

      {/* Services Grid */}
      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden lg:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.id} className="p-4">
              <ServiceItem service={service} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="screen-line-before p-4">
        <div className="rounded-xl border border-edge bg-muted/50 p-6 text-center">
          <h2 className="font-heading text-xl font-semibold mb-2">
            Ready to Start Your Project?
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Let&apos;s discuss your needs and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-4 w-4" />
              Get Free Quote
            </Link>
            <Link
              href="mailto:contact@ndiagandiaye.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Email Directly
            </Link>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
} 