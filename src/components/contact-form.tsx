"use client";

import { CheckCircleIcon, LoaderIcon, MailIcon, SendIcon, UserIcon } from "lucide-react";
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
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: "" });
  
  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let question;
    
    if (operation === '+') {
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
      setFormData(prev => ({ ...prev, captcha: "" }));
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Vérification des variables d'environnement
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Import EmailJS dynamiquement côté client
      const emailjs = await import('@emailjs/browser');
      
      // Configuration des paramètres du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'contact@ndiagandiaye.com',
      };

      console.log('Sending email with EmailJS...', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });

      // Envoi de l'email principal
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      // Envoi de l'email de confirmation (optionnel)
      if (process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID) {
        const confirmationParams = {
          to_name: formData.name,
          to_email: formData.email,
          subject: formData.subject,
          original_message: formData.message,
        };

        try {
          const confirmationResult = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID,
            confirmationParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          );
          console.log('Confirmation email sent successfully:', confirmationResult);
        } catch (confirmationError) {
          console.warn('Failed to send confirmation email:', confirmationError);
        }
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captcha: "",
      });
      toast.success("Message sent successfully! You'll receive a confirmation email shortly.");

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-medium text-green-600 dark:text-green-400 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thank you for your message. I&apos;ll get back to you within 24 hours.
            </p>
            <p className="text-xs text-muted-foreground">
              You should receive a confirmation email shortly.
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
    <div className="p-4 space-y-4">
      <h2 className="font-heading text-lg font-medium mb-4 flex items-center gap-2">
        <MailIcon className="w-5 h-5 text-muted-foreground" />
        Send a Message
      </h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
            Full Name
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-edge rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="Your full name"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
            Email Address
          </label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-edge rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-sm bg-background border border-edge rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            placeholder="Project inquiry, consultation, etc."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-sm bg-background border border-edge rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            placeholder="Tell me about your project, timeline, and requirements..."
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Captcha */}
        <div className="space-y-2">
          <label htmlFor="captcha" className="text-xs font-medium text-muted-foreground">
            Security Check: What is {captchaQuestion.question}?
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={formData.captcha}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-sm bg-background border border-edge rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            placeholder="Enter the answer"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>

      <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-edge">
        <p className="text-xs text-muted-foreground text-center">
          I typically respond within 24 hours. For urgent matters, please call directly.
        </p>
      </div>
    </div>
  );
} 