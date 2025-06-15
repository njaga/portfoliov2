import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
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
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden lg:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="p-4 space-y-4">
            <h2 className="font-heading text-lg font-medium mb-4">
              Get in Touch
            </h2>
            
            <div className="space-y-4">
              <a 
                href="mailto:contact@ndiagandiaye.com"
                className="group flex items-center gap-3 p-3 rounded-xl border border-edge bg-background/50 hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-6 h-6 text-muted-foreground">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Email</h3>
                  <p className="text-xs text-muted-foreground">contact@ndiagandiaye.com</p>
                </div>
              </a>

              <a 
                href="tel:+221781633419"
                className="group flex items-center gap-3 p-3 rounded-xl border border-edge bg-background/50 hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-6 h-6 text-muted-foreground">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Phone</h3>
                  <p className="text-xs text-muted-foreground">+221 78 163 34 19</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-edge bg-background/50">
                <div className="flex items-center justify-center w-6 h-6 text-muted-foreground">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Location</h3>
                  <p className="text-xs text-muted-foreground">Dakar, Senegal</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-edge bg-background/50">
                <div className="flex items-center justify-center w-6 h-6 text-muted-foreground">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Availability</h3>
                  <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM GMT</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-edge">
              <h3 className="font-heading font-medium mb-2 flex items-center gap-2">
                <SendIcon className="w-4 h-4 text-muted-foreground" />
                Quick Quote
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Get a personalized quote within 24 hours.
              </p>
              <a 
                href="mailto:contact@ndiagandiaye.com?subject=Project Quote Request&body=Hello Ndiaga,%0D%0A%0D%0AI would like to request a quote for my project:%0D%0A%0D%0A- Project type:%0D%0A- Estimated budget:%0D%0A- Timeline:%0D%0A- Detailed description:%0D%0A%0D%0AThank you for your response.%0D%0A%0D%0ABest regards"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                <MailIcon className="w-3 h-3" />
                Request Quote
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
} 