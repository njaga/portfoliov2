import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, captcha } = await request.json();

    // Validation des données
    if (!name || !email || !subject || !message || !captcha) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Vérification de la configuration SMTP
    await transporter.verify();

    // Configuration de l'email principal (bilingue)
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "contact@ndiagandiaye.com",
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🇫🇷 Nouveau message de contact / 🇬🇧 New Contact Message
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name / Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject / Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>🇫🇷 Message envoyé depuis ndiagandiaye.com</p>
            <p>🇬🇧 Message sent from ndiagandiaye.com</p>
            <p>Date: ${new Date().toLocaleString("fr-FR")} (GMT+1) / ${new Date().toLocaleString("en-US")}</p>
          </div>
        </div>
      `,
      text: `
🇫🇷 NOUVEAU MESSAGE DE CONTACT / 🇬🇧 NEW CONTACT MESSAGE

Nom / Name: ${name}
Email: ${email}
Sujet / Subject: ${subject}

Message:
${message}

---
🇫🇷 Message envoyé depuis ndiagandiaye.com
🇬🇧 Message sent from ndiagandiaye.com
Date: ${new Date().toLocaleString("fr-FR")} / ${new Date().toLocaleString("en-US")}
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    // Email de confirmation bilingue pour l'utilisateur
    const confirmationOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject:
        "🇫🇷 Confirmation de réception / 🇬🇧 Message Received - Ndiaga Ndiaye",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🇫🇷 Merci pour votre message ! / 🇬🇧 Thank you for your message!</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">🇫🇷 Français</h3>
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>J'ai bien reçu votre message concernant "<strong>${subject}</strong>" et je vous répondrai dans les plus brefs délais, généralement sous 24 heures.</p>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">🇬🇧 English</h3>
            <p>Hello <strong>${name}</strong>,</p>
            <p>I have received your message regarding "<strong>${subject}</strong>" and I will respond as soon as possible, usually within 24 hours.</p>
          </div>
          
          <div style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>🇫🇷 Récapitulatif de votre message / 🇬🇧 Your message summary:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0; font-style: italic;">${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>🇫🇷 En attendant, n'hésitez pas à consulter mes autres projets sur mon portfolio.</p>
            <p>🇬🇧 In the meantime, feel free to check out my other projects on my portfolio.</p>
            <a href="https://ndiagandiaye.com" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0;">
              Visit Portfolio / Voir Portfolio
            </a>
          </div>
          
          <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0;">
              🇫🇷 Cordialement,<br>
              🇬🇧 Best regards,<br>
              <strong>Ndiaga Ndiaye</strong><br>
              <em>🇫🇷 Développeur Web / 🇬🇧 Web Developer</em>
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px; text-align: center;">
            <p>🇫🇷 Ceci est un message automatique de confirmation.</p>
            <p>🇬🇧 This is an automatic confirmation message.</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(confirmationOptions);
    } catch (confirmationError) {
      console.warn("Failed to send confirmation email:", confirmationError);
      // On continue même si l'email de confirmation échoue
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { error: "Server error while sending email" },
      { status: 500 }
    );
  }
}
