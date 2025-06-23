import { MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss your web projects and request a quote.",
};

export default function Page() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="font-heading text-3xl font-semibold">Contact</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          Get in touch to discuss your web projects and request a quote.
        </p>
      </div>

      <div className="relative pt-4">
        {/* Contact Information Section */}
        <div className="screen-line-after p-4">
          <h2 className="mb-4 font-heading text-lg font-medium">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="mailto:contact@ndiagandiaye.com"
              className="group flex items-center gap-3 rounded-xl border border-edge bg-background/50 p-3 transition-all duration-200 hover:bg-muted/50"
            >
              <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
                <MailIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-xs text-muted-foreground">
                  contact@ndiagandiaye.com
                </p>
              </div>
            </a>

            <a
              href="tel:+221781633419"
              className="group flex items-center gap-3 rounded-xl border border-edge bg-background/50 p-3 transition-all duration-200 hover:bg-muted/50"
            >
              <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Phone</h3>
                <p className="text-xs text-muted-foreground">
                  +221 78 163 34 19
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-xl border border-edge bg-background/50 p-3">
              <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Location</h3>
                <p className="text-xs text-muted-foreground">Dakar, Senegal</p>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-md rounded-xl border border-edge bg-muted/50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-heading font-medium">
              <SendIcon className="h-4 w-4 text-muted-foreground" />
              Quick Quote
            </h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Get a personalized quote within 24 hours.
            </p>
            <a
              href="mailto:contact@ndiagandiaye.com?subject=Project Quote Request&body=Hello Ndiaga,%0D%0A%0D%0AI would like to request a quote for my project:%0D%0A%0D%0A- Project type:%0D%0A- Estimated budget:%0D%0A- Timeline:%0D%0A- Detailed description:%0D%0A%0D%0AThank you for your response.%0D%0A%0D%0ABest regards"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <MailIcon className="h-3 w-3" />
              Request Quote
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
