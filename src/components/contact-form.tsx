"use client";

import {
  CheckCircleIcon,
  LoaderIcon,
  MailIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  captcha: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple captcha system
  const [captchaQuestion, setCaptchaQuestion] = useState({
    question: "",
    answer: "",
  });

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ["+", "-"];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    let question;

    if (operation === "+") {
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
    } else {
      // Ensure positive result for subtraction
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      answer = larger - smaller;
      question = `${larger} - ${smaller}`;
    }

    setCaptchaQuestion({ question, answer: answer.toString() });
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

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

    // Validate captcha
    if (formData.captcha !== captchaQuestion.answer) {
      toast.error("Incorrect captcha answer. Please try again.");
      generateCaptcha(); // Generate new captcha
      setFormData((prev) => ({ ...prev, captcha: "" }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Vérification des variables d'environnement
      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Import EmailJS dynamiquement côté client
      const emailjs = await import("@emailjs/browser");

      // Configuration des paramètres du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "contact@ndiagandiaye.com",
      };

      console.log("Sending email with EmailJS...", {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      });

      // Envoi de l'email principal
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);

      // Envoi de l'email de confirmation (temporairement désactivé pour debug)
      // if (process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID) {
      //   const confirmationParams = {
      //     to_name: formData.name,
      //     to_email: formData.email,
      //     subject: formData.subject,
      //     original_message: formData.message,
      //   };

      //   try {
      //     const confirmationResult = await emailjs.send(
      //       process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      //       process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID,
      //       confirmationParams,
      //       process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      //     );
      //     console.log('Confirmation email sent successfully:', confirmationResult);
      //   } catch (confirmationError) {
      //     console.warn('Failed to send confirmation email:', confirmationError);
      //   }
      // }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captcha: "",
      });
      toast.success(
        "Message sent successfully! I'll get back to you within 24 hours."
      );
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4 p-4">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <div>
            <h3 className="mb-2 font-heading text-lg font-medium text-green-600 dark:text-green-400">
              Message Sent Successfully!
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Thank you for your message. I&apos;ll get back to you within 24
              hours.
            </p>
            <p className="text-xs text-muted-foreground">
              I&apos;ll respond to your inquiry within 24 hours.
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              generateCaptcha(); // Generate new captcha for next form
            }}
            className="text-sm text-primary hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-medium">
        <MailIcon className="h-5 w-5 text-muted-foreground" />
        Send a Message
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-medium text-muted-foreground"
          >
            Full Name
          </label>
          <div className="relative">
            <UserIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-edge bg-background py-3 pr-4 pl-10 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Your full name"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-medium text-muted-foreground"
          >
            Email Address
          </label>
          <div className="relative">
            <MailIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-edge bg-background py-3 pr-4 pl-10 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-xs font-medium text-muted-foreground"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-edge bg-background px-4 py-3 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="Project inquiry, consultation, etc."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-medium text-muted-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full resize-none rounded-xl border border-edge bg-background px-4 py-3 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="Tell me about your project, timeline, and requirements..."
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Captcha */}
        <div className="space-y-2">
          <label
            htmlFor="captcha"
            className="text-xs font-medium text-muted-foreground"
          >
            Security Check: What is {captchaQuestion.question}?
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={formData.captcha}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-edge bg-background px-4 py-3 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="Enter the answer"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>

      <div className="mt-4 rounded-xl border border-edge bg-muted/50 p-3">
        <p className="text-center text-xs text-muted-foreground">
          I typically respond within 24 hours. For urgent matters, please call
          directly.
        </p>
      </div>
    </div>
  );
}
