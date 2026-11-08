"use client";

import {
  CheckCircleIcon,
  LoaderIcon,
  MailIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      language: string;
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { t, mounted, locale } = useTranslation();
  const translations = mounted ? t : getTranslations(defaultLocale);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Configure a Turnstile widget in Cloudflare before activating email delivery.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [captchaToken, setCaptchaToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const widgetContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !scriptReady || !widgetContainer.current || widgetId.current) return;
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!api) return;

    const id = api.render(widgetContainer.current, {
      sitekey: siteKey,
      callback: (token: string) => setCaptchaToken(token),
      "expired-callback": () => setCaptchaToken(""),
      "error-callback": () => setCaptchaToken(""),
      language: "auto",
    });
    widgetId.current = id;

    return () => {
      api.remove(id);
      widgetId.current = null;
    };
  }, [siteKey, scriptReady]);

  const resetCaptcha = () => {
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (widgetId.current) api?.reset(widgetId.current);
    setCaptchaToken("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!siteKey || !captchaToken) {
      toast.error(translations.contact.incorrectCaptcha);
      return;
    }

    const honeypot = new FormData(e.currentTarget).get("website")?.toString() || "";
    setIsSubmitting(true);

    try {
      // Envoi via l'API Next.js
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaToken,
          website: honeypot,
          locale: window.location.pathname.startsWith("/en") ? "en" : "fr",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error sending message");
      }

      console.log("Message sent successfully:", result);

      setIsSubmitted(true);
      resetCaptcha();
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      toast.success(translations.contact.messageSentToast);
    } catch (error) {
      console.error("Error sending message:", error);

      let errorMessage = translations.contact.messageError;

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-edge bg-background/50 p-8 sm:p-12">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircleIcon className="h-12 w-12 text-success" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              {translations.contact.messageSentSuccess}
            </h3>
            <p className="text-base text-muted-foreground">
              {translations.contact.messageSentDescription}
            </p>
            <p className="text-sm text-muted-foreground">
              {translations.contact.messageSentResponse}
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              resetCaptcha();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted/50 hover:shadow-sm"
          >
            <SendIcon className="h-4 w-4" />
            {translations.contact.sendAnotherMessage}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-edge bg-background/50 p-4">
      <div className="mb-4">
        <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-medium">
          <MailIcon className="h-5 w-5 text-muted-foreground" />
          {translations.contact.sendMessage}
        </h2>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground"
          >
            {translations.contact.fullName}
          </label>
          <div className="relative">
            <UserIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-edge bg-background py-3 pr-4 pl-11 text-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={translations.contact.fullNamePlaceholder}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            {translations.contact.emailAddress}
          </label>
          <div className="relative">
            <MailIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-edge bg-background py-3 pr-4 pl-11 text-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={translations.contact.emailPlaceholder}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-foreground"
          >
            {translations.contact.subject}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-edge bg-background px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={translations.contact.subjectPlaceholder}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground"
          >
            {translations.contact.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full resize-none rounded-lg border border-edge bg-background px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={translations.contact.messagePlaceholder}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* A honeypot catches unsophisticated scripted submissions. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {siteKey ? (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
              onReady={() => setScriptReady(true)}
            />
            <div className="space-y-2">
              <p className="text-sm font-medium">{translations.contact.securityCheck}</p>
              <div ref={widgetContainer} aria-label={translations.contact.securityCheck} />
            </div>
          </>
        ) : (
          <p role="alert" className="text-sm text-muted-foreground">
            {locale === "en"
              ? "The contact form is temporarily unavailable. Please contact me by email."
              : "Le formulaire est temporairement indisponible. Contactez-moi par email."}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !siteKey || !captchaToken}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              {translations.contact.sending}
            </>
          ) : (
            <>
              <SendIcon className="h-4 w-4" />
              {translations.contact.sendMessageButton}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
