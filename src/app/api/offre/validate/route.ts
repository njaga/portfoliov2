import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, acceptanceDate, signature } =
      await request.json();

    // Validation des données
    if (!firstName || !lastName || !acceptanceDate || !signature) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
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

    // Formatage de la date
    const dateFormatted = new Date(acceptanceDate).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Configuration de l'email pour nnjaga01@gmail.com
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "nnjaga01@gmail.com",
      subject: `✅ Validation de l'Offre QSE - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
            ✅ Validation de l'Offre QSE & Prévention des Risques
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="color: #166534; margin-top: 0;">Informations du Client</h3>
            <p><strong>Prénom:</strong> ${firstName}</p>
            <p><strong>Nom:</strong> ${lastName}</p>
            <p><strong>Date d'acceptation:</strong> ${dateFormatted}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Détails de l'Offre Validée</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Type de projet:</strong> Site Web QSE & Prévention des Risques</li>
              <li><strong>Durée de développement:</strong> 4 semaines</li>
              <li><strong>Montant total:</strong> 385 000 FCFA</li>
              <li><strong>Détail:</strong>
                <ul style="margin-top: 10px;">
                  <li>Nom de domaine .COM: 10 000 FCFA/an</li>
                  <li>Hébergement web: 60 000 FCFA/an</li>
                  <li>Développement sur-mesure: 315 000 FCFA</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Signature du Client</h3>
            <p style="margin-bottom: 10px;">La signature du client est jointe ci-dessous :</p>
            <div style="background-color: white; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; text-align: center;">
              <img src="${signature}" alt="Signature du client" style="max-width: 100%; height: auto;" />
            </div>
          </div>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">Prochaines Étapes</h3>
            <ol style="line-height: 1.8;">
              <li>Contacter le client pour confirmer la validation</li>
              <li>Préparer le contrat de prestation</li>
              <li>Planifier la réunion de démarrage du projet</li>
              <li>Démarrer le développement selon le planning (4 semaines)</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p><strong>Date de réception:</strong> ${new Date().toLocaleString(
              "fr-FR",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</p>
            <p>Email envoyé automatiquement depuis le formulaire de validation d'offre</p>
          </div>
        </div>
      `,
      text: `
VALIDATION DE L'OFFRE QSE & PRÉVENTION DES RISQUES

Informations du Client:
- Prénom: ${firstName}
- Nom: ${lastName}
- Date d'acceptation: ${dateFormatted}

Détails de l'Offre Validée:
- Type de projet: Site Web QSE & Prévention des Risques
- Durée de développement: 4 semaines
- Montant total: 385 000 FCFA
  * Nom de domaine .COM: 10 000 FCFA/an
  * Hébergement web: 60 000 FCFA/an
  * Développement sur-mesure: 315 000 FCFA

Signature du client: Voir l'image jointe dans la version HTML

Prochaines Étapes:
1. Contacter le client pour confirmer la validation
2. Préparer le contrat de prestation
3. Planifier la réunion de démarrage du projet
4. Démarrer le développement selon le planning (4 semaines)

Date de réception: ${new Date().toLocaleString("fr-FR")}
Email envoyé automatiquement depuis le formulaire de validation d'offre
      `,
      attachments: signature
        ? [
            {
              filename: "signature.png",
              content: signature.includes(",")
                ? signature.split(",")[1]
                : signature, // Enlever le préfixe data:image/png;base64, si présent
              encoding: "base64",
            },
          ]
        : [],
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);

    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
