"use client";

import { CalendarIcon, ChevronUpIcon, MailIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

export default function Page() {
  const { t, mounted } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(true);

  // Google Calendar Appointment Scheduling URL
  const googleCalendarUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL ||
    "https://calendar.app.google/1FsNnrSu3r9d5i6n6";

  const handleShowCalendar = () => {
    setShowCalendar(true);
    setCalendarLoading(true);
  };

  const handleCalendarLoad = () => {
    setCalendarLoading(false);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
    setCalendarLoading(true); // Reset loading state when hiding
  };

  return (
    <div className="min-h-svh">
      {/* Header Section */}
      <div className="screen-line-after px-4">
        <h1 className="font-heading text-3xl font-semibold">
          {translations.contact.title}
        </h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-muted-foreground">
          {translations.contact.description}
        </p>
      </div>

      <div className="relative">
        {/* Contact Information Cards */}
        <div className="screen-line-after p-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-heading text-lg font-medium">
              {translations.contact.getInTouch}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="mailto:contact@ndiagandiaye.com"
                className="group relative flex items-center gap-4 rounded-xl border border-edge bg-background/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-muted/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <MailIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-sm font-semibold">
                    {translations.contact.email}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    contact@ndiagandiaye.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+221781633419"
                className="group relative flex items-center gap-4 rounded-xl border border-edge bg-background/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-muted/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-sm font-semibold">
                    {translations.contact.phone}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    +221 78 163 34 19
                  </p>
                </div>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <div className="group relative overflow-hidden rounded-xl border border-edge bg-gradient-to-br from-muted/50 to-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-semibold">
                      {translations.contact.bookMeeting}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {translations.contact.bookMeetingDescription}
                  </p>
                  <button
                    onClick={
                      showCalendar ? handleHideCalendar : handleShowCalendar
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                  >
                    {showCalendar ? (
                      <>
                        <ChevronUpIcon className="h-4 w-4" />
                        {translations.contact.hideCalendar}
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="h-4 w-4" />
                        {translations.contact.viewAvailability}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Calendar Section */}
        {showCalendar && (
          <div className="screen-line-after p-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-heading text-lg font-medium">
                    {translations.contact.bookMeeting}
                  </h2>
                </div>
                <button
                  onClick={handleHideCalendar}
                  className="flex items-center gap-2 rounded-lg border border-edge bg-background px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted/50"
                  aria-label="Fermer le calendrier"
                >
                  <ChevronUpIcon className="h-4 w-4" />
                  {translations.contact.hideCalendar}
                </button>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-edge bg-background/50 shadow-sm">
                {calendarLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                      <p className="text-sm text-muted-foreground">
                        {translations.contact.loadingCalendar}
                      </p>
                    </div>
                  </div>
                )}
                <iframe
                  src={googleCalendarUrl}
                  className="w-full border-0 transition-opacity"
                  style={{ height: "min(700px, calc(100vh - 200px))" }}
                  title={translations.contact.bookMeeting}
                  allow="calendar"
                  onLoad={handleCalendarLoad}
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div className="p-4">
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
