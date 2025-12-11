"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DownloadIcon, FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Composant de signature
function SignatureCanvas({
  onSignatureChange,
}: {
  readonly onSignatureChange: (signature: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialiser le contexte du canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Détecter le thème
    const isDark = document.documentElement.classList.contains("dark");
    ctx.strokeStyle = isDark ? "#fff" : "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    onSignatureChange(canvas.toDataURL());
  };

  const stopDrawing = (
    e?:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-2">
      <Label>Signature *</Label>
      <div className="relative rounded-lg border border-edge bg-background">
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          className="w-full cursor-crosshair touch-none rounded-lg"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <button
          type="button"
          onClick={clearSignature}
          className="absolute right-2 bottom-2 rounded-lg border border-edge bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Effacer
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Utilisez votre souris ou votre doigt pour signer dans la zone ci-dessus
      </p>
    </div>
  );
}

export default function ContratPage() {
  const [formData, setFormData] = useState({
    raisonSociale: "",
    representant: "",
    email: "",
    telephone: "",
    dateSignature: new Date().toISOString().split("T")[0],
    signature: null as string | null,
    prestataireSignature: null as string | null,
    prestataireDateSignature: new Date().toISOString().split("T")[0],
  });
  const contratRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (
      !formData.signature ||
      !formData.raisonSociale ||
      !formData.representant
    ) {
      alert(
        "Veuillez remplir tous les champs obligatoires et signer le contrat"
      );
      return;
    }

    setIsGenerating(true);

    try {
      const element = contratRef.current;
      if (!element) return;

      // Créer un clone de l'élément pour l'impression
      const clone = element.cloneNode(true) as HTMLElement;

      // Remplacer les placeholders dans le clone
      const signatureImg = clone.querySelector("#client-signature-img");
      if (signatureImg && formData.signature) {
        const img = document.createElement("img");
        img.src = formData.signature;
        img.style.maxWidth = "200px";
        img.style.height = "auto";
        signatureImg.replaceWith(img);
      }

      // Remplacer la signature du prestataire
      const prestataireSignatureImg = clone.querySelector(
        "#prestataire-signature-img"
      );
      if (prestataireSignatureImg && formData.prestataireSignature) {
        const img = document.createElement("img");
        img.src = formData.prestataireSignature;
        img.style.maxWidth = "200px";
        img.style.height = "auto";
        prestataireSignatureImg.replaceWith(img);
      }

      // Masquer les éléments non nécessaires dans le clone
      const inputs = clone.querySelectorAll("input, textarea, canvas, button");
      inputs.forEach((el) => {
        if (
          el.id !== "client-signature-img" &&
          el.id !== "prestataire-signature-img"
        ) {
          el.remove();
        }
      });

      // Injecter un style global pour forcer toutes les couleurs en RGB
      const globalStyle = document.createElement("style");
      globalStyle.id = "pdf-color-fix";
      globalStyle.textContent = `
        * {
          color: rgb(0, 0, 0) !important;
          background-color: rgb(255, 255, 255) !important;
          border-color: rgb(0, 0, 0) !important;
        }
        .bg-background, .bg-background\\/50 {
          background-color: rgb(255, 255, 255) !important;
        }
        .bg-muted, .bg-muted\\/30 {
          background-color: rgb(245, 245, 245) !important;
        }
        .bg-primary\\/5 {
          background-color: rgb(250, 250, 250) !important;
        }
        .bg-primary\\/10 {
          background-color: rgb(240, 240, 240) !important;
        }
        .bg-primary\\/20 {
          background-color: rgb(230, 230, 230) !important;
        }
        .bg-primary {
          background-color: rgb(255, 255, 255) !important;
        }
        .text-muted-foreground {
          color: rgb(100, 100, 100) !important;
        }
        .text-primary {
          color: rgb(0, 0, 0) !important;
        }
        .border-edge, .border, .border-primary\\/20, .border-primary\\/30, .border-primary\\/50 {
          border-color: rgb(0, 0, 0) !important;
        }
        h1, h2, h3, h4, h5, h6 {
          color: rgb(0, 0, 0) !important;
        }
        p, li, span {
          color: rgb(0, 0, 0) !important;
        }
        .signature-section {
          background-color: rgb(240, 240, 240) !important;
          border-color: rgb(0, 0, 0) !important;
          border-width: 2px !important;
        }
        section {
          background-color: rgb(255, 255, 255) !important;
        }
      `;
      clone.insertBefore(globalStyle, clone.firstChild);

      // Forcer toutes les couleurs en RGB en appliquant des styles inline
      const allElements = clone.querySelectorAll("*");
      allElements.forEach((el) => {
        const element = el as HTMLElement;

        // Appliquer des styles inline pour forcer les couleurs en RGB
        if (
          element.classList.contains("bg-background") ||
          element.classList.contains("bg-background/50")
        ) {
          element.style.setProperty("background-color", "#ffffff", "important");
        } else if (
          element.classList.contains("bg-muted") ||
          element.classList.contains("bg-muted/30")
        ) {
          element.style.setProperty("background-color", "#f0f0f0", "important");
        } else if (element.classList.contains("bg-primary/5")) {
          element.style.setProperty("background-color", "#fafafa", "important");
        } else if (element.classList.contains("bg-primary/10")) {
          element.style.setProperty("background-color", "#f0f0f0", "important");
        } else if (element.classList.contains("bg-primary/20")) {
          element.style.setProperty("background-color", "#e6e6e6", "important");
        } else if (element.classList.contains("bg-primary")) {
          element.style.setProperty("background-color", "#ffffff", "important");
        }

        if (element.classList.contains("text-muted-foreground")) {
          element.style.setProperty("color", "#666666", "important");
        } else if (element.classList.contains("text-primary")) {
          element.style.setProperty("color", "#000000", "important");
        }

        if (
          element.classList.contains("border-edge") ||
          element.classList.contains("border") ||
          element.classList.contains("border-primary/20") ||
          element.classList.contains("border-primary/30") ||
          element.classList.contains("border-primary/50")
        ) {
          element.style.setProperty("border-color", "#000000", "important");
        }

        // Pour tous les autres éléments, forcer les couleurs de base (fond blanc)
        if (
          !element.style.backgroundColor ||
          element.style.backgroundColor === "" ||
          element.style.backgroundColor.includes("oklch")
        ) {
          element.style.setProperty("background-color", "#ffffff", "important");
        }
        if (
          !element.style.color ||
          element.style.color === "" ||
          element.style.color.includes("oklch")
        ) {
          element.style.setProperty("color", "#000000", "important");
        }
        if (
          !element.style.borderColor ||
          element.style.borderColor === "" ||
          element.style.borderColor.includes("oklch")
        ) {
          element.style.setProperty("border-color", "#000000", "important");
        }
      });

      // Créer un conteneur temporaire
      const pdfContainer = document.createElement("div");
      pdfContainer.style.position = "absolute";
      pdfContainer.style.left = "-9999px";
      pdfContainer.style.width = "210mm"; // A4 width
      pdfContainer.style.backgroundColor = "#ffffff";
      pdfContainer.appendChild(clone);
      document.body.appendChild(pdfContainer);

      // Attendre un peu pour que les styles soient appliqués
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Générer le PDF avec conversion des couleurs
      const canvas = await html2canvas(clone, {
        scale: 1.5, // Réduit de 2 à 1.5 pour réduire la taille
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          // S'assurer que toutes les couleurs sont en RGB dans le clone
          const clonedElements = clonedDoc.querySelectorAll("*");
          clonedElements.forEach((el) => {
            const element = el as HTMLElement;
            const style = element.style;
            const computedStyle = globalThis.getComputedStyle(element);

            // Forcer backgroundColor en RGB
            const bgColor = computedStyle.backgroundColor;
            if (bgColor && !bgColor.includes("rgb") && !bgColor.includes("#")) {
              style.setProperty("background-color", "#ffffff", "important");
            }

            // Forcer color en RGB
            const color = computedStyle.color;
            if (color && !color.includes("rgb") && !color.includes("#")) {
              style.setProperty("color", "#000000", "important");
            }

            // Forcer borderColor en RGB
            const borderColor = computedStyle.borderColor;
            if (
              borderColor &&
              !borderColor.includes("rgb") &&
              !borderColor.includes("#")
            ) {
              style.setProperty("border-color", "#000000", "important");
            }
          });
        },
      });

      document.body.removeChild(pdfContainer);

      // Utiliser JPEG avec compression pour réduire la taille
      const imgData = canvas.toDataURL("image/jpeg", 0.85); // Qualité JPEG 85%
      const pdf = new jsPDF("p", "mm", "a4");

      // Marges : 10mm de chaque côté (gauche, droite, haut, bas)
      const margin = 10;
      const imgWidth = 210 - margin * 2; // Largeur A4 moins les marges (190mm)
      const pageHeight = 297; // Hauteur A4
      const availableHeight = pageHeight - margin * 2; // Hauteur disponible par page (277mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculer le ratio pixels/mm
      const pixelsPerMM = canvas.height / imgHeight;
      const pixelsPerPage = availableHeight * pixelsPerMM;

      let sourceY = 0; // Position source dans l'image (en pixels)
      const yPosition = margin; // Position Y fixe avec marge du haut

      // Première page
      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        yPosition,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      sourceY = pixelsPerPage;

      // Pages suivantes - découper l'image en sections
      while (sourceY < canvas.height) {
        pdf.addPage();

        // Calculer la hauteur restante à afficher
        const remainingPixels = canvas.height - sourceY;
        const pixelsToShow = Math.min(remainingPixels, pixelsPerPage);
        const heightToShowMM = pixelsToShow / pixelsPerMM;

        // Créer un canvas temporaire avec seulement la section à afficher
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = pixelsToShow;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          // Copier la section de l'image originale
          tempCtx.drawImage(
            canvas,
            0,
            sourceY, // Source X, Y (commence à sourceY)
            canvas.width,
            pixelsToShow, // Source width, height
            0,
            0, // Destination X, Y
            tempCanvas.width,
            tempCanvas.height // Destination width, height
          );

          const pageImgData = tempCanvas.toDataURL("image/jpeg", 0.85);
          pdf.addImage(
            pageImgData,
            "JPEG",
            margin,
            yPosition,
            imgWidth,
            heightToShowMM,
            undefined,
            "FAST"
          );
        }

        sourceY += pixelsPerPage;
      }

      pdf.save(
        `contrat-${formData.raisonSociale.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
      );
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="print-content min-h-svh" id="contrat-content">
      <div className="screen-line-after px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="badge no-print mb-4 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2">
              <FileTextIcon className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold text-primary">
                Contrat Type
              </span>
            </div>
            <h1 className="mb-4 font-heading text-4xl font-bold">
              Contrat de Prestation de Services
              <br />
              <span className="text-primary">Développement Web</span>
            </h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous pour compléter et signer le
              contrat
            </p>
          </div>

          {/* Formulaire */}
          <div className="no-print mb-8 rounded-xl border border-edge bg-background/50 p-6">
            <h2 className="mb-4 font-heading text-xl font-semibold">
              Informations du Client
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="raisonSociale">Raison sociale *</Label>
                <input
                  id="raisonSociale"
                  type="text"
                  required
                  value={formData.raisonSociale}
                  onChange={(e) =>
                    setFormData({ ...formData, raisonSociale: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="representant">Représentant *</Label>
                <input
                  id="representant"
                  type="text"
                  required
                  value={formData.representant}
                  onChange={(e) =>
                    setFormData({ ...formData, representant: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Nom et prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateSignature">Date de signature *</Label>
                <input
                  id="dateSignature"
                  type="date"
                  required
                  value={formData.dateSignature}
                  onChange={(e) =>
                    setFormData({ ...formData, dateSignature: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <SignatureCanvas
                onSignatureChange={(signature) =>
                  setFormData({ ...formData, signature })
                }
              />
            </div>
          </div>

          {/* Formulaire Prestataire */}
          <div className="no-print mb-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="mb-4 font-heading text-xl font-semibold">
              Signature du Prestataire
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prestataireDateSignature">
                  Date de signature *
                </Label>
                <input
                  id="prestataireDateSignature"
                  type="date"
                  required
                  value={formData.prestataireDateSignature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prestataireDateSignature: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <SignatureCanvas
                onSignatureChange={(signature) =>
                  setFormData({ ...formData, prestataireSignature: signature })
                }
              />
            </div>
          </div>

          {/* Contrat Content */}
          <div
            ref={contratRef}
            className="space-y-8 rounded-xl border border-edge bg-background/50 p-8"
          >
            {/* Préambule */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Préambule
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le présent contrat définit les conditions générales de
                prestation de services de développement web entre le Prestataire
                et le Client. Il s&apos;applique à toutes les prestations de
                développement de sites web, applications web et solutions
                digitales.
              </p>
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Référence du devis :</strong> Offre Technique &
                  Financière - Site Web QSE & Prévention des Risques
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Date d&apos;émission du devis :</strong> 06/12/2025
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Validité du devis :</strong> 3 mois à compter de la
                  date d&apos;émission
                </p>
              </div>
            </section>

            {/* Article 1 - Objet */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 1 - Objet
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le présent contrat a pour objet de définir les conditions dans
                lesquelles le Prestataire s&apos;engage à réaliser pour le
                compte du Client les prestations de développement web décrites
                dans le devis ou la proposition commerciale acceptée par le
                Client.
              </p>
              <p className="mb-4 text-muted-foreground">
                <strong>Prestation concernée :</strong> Site Web QSE &
                Prévention des Risques
              </p>
              <p className="text-muted-foreground">
                Les prestations incluent :
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="ml-6 list-disc">
                  Site web professionnel avec boutique e-commerce intégrée
                </li>
                <li className="ml-6 list-disc">
                  Back-office complet avec gestion de la boutique, du blog, des
                  services et du site
                </li>
                <li className="ml-6 list-disc">
                  Système de paiement mobile money (Orange Money / Wave)
                </li>
                <li className="ml-6 list-disc">
                  Optimisation SEO et performance
                </li>
                <li className="ml-6 list-disc">
                  Formation et documentation technique
                </li>
                <li className="ml-6 list-disc">
                  Mise en production avec nom de domaine et hébergement
                </li>
              </ul>
            </section>

            {/* Article 2 - Obligations du Prestataire */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 2 - Obligations du Prestataire
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le Prestataire s&apos;engage à :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="ml-6 list-disc">
                  Réaliser les prestations conformément aux spécifications
                  définies dans le devis accepté
                </li>
                <li className="ml-6 list-disc">
                  Respecter les délais convenus et informer le Client de tout
                  retard éventuel
                </li>
                <li className="ml-6 list-disc">
                  Utiliser des technologies modernes, sécurisées et maintenables
                </li>
                <li className="ml-6 list-disc">
                  Fournir un code source propre, documenté et conforme aux
                  standards de l&apos;industrie
                </li>
                <li className="ml-6 list-disc">
                  Assurer la formation du Client à l&apos;utilisation de la
                  solution développée
                </li>
                <li className="ml-6 list-disc">
                  Fournir une documentation technique et utilisateur complète
                </li>
                <li className="ml-6 list-disc">
                  Respecter la confidentialité des informations communiquées par
                  le Client
                </li>
              </ul>
            </section>

            {/* Article 3 - Obligations du Client */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 3 - Obligations du Client
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le Client s&apos;engage à :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="ml-6 list-disc">
                  Fournir au Prestataire toutes les informations, documents et
                  contenus nécessaires à la réalisation des prestations
                </li>
                <li className="ml-6 list-disc">
                  Valider les différentes étapes du projet dans les délais
                  convenus
                </li>
                <li className="ml-6 list-disc">
                  Effectuer les paiements selon les modalités convenues
                </li>
                <li className="ml-6 list-disc">
                  Respecter les droits de propriété intellectuelle du
                  Prestataire
                </li>
                <li className="ml-6 list-disc">
                  Assurer la maintenance et la sauvegarde de la solution après
                  la livraison
                </li>
              </ul>
            </section>

            {/* Article 4 - Délais et Livraison */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 4 - Délais et Livraison
              </h2>
              <p className="mb-4 text-muted-foreground">
                <strong>Durée de développement : 4 semaines</strong> (incluant
                développement, design, tests et mise en ligne).
              </p>
              <p className="mb-4 text-muted-foreground">
                Les délais sont calculés à compter de la date de signature du
                contrat et de la réception de l&apos;acompte.
              </p>
              <p className="mb-4 text-muted-foreground">
                En cas de retard imputable au Client (retard dans la fourniture
                d&apos;informations, validation tardive, etc.), les délais
                seront prolongés d&apos;autant.
              </p>
              <p className="text-muted-foreground">
                La livraison est considérée comme effectuée lorsque la solution
                est mise en ligne et fonctionnelle selon les spécifications
                convenues.
              </p>
            </section>

            {/* Article 5 - Prix et Modalités de Paiement */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 5 - Prix et Modalités de Paiement
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le prix total des prestations est de{" "}
                <strong>370 000 FCFA</strong> (trois cent soixante-dix mille
                francs CFA), toutes taxes comprises, réparti comme suit :
              </p>
              <ul className="mb-4 space-y-2 text-muted-foreground">
                <li className="ml-6 list-disc">
                  <strong>Nom de domaine (.COM) :</strong> 10 000 FCFA / an
                </li>
                <li className="ml-6 list-disc">
                  <strong>Hébergement web :</strong> 60 000 FCFA / an
                </li>
                <li className="ml-6 list-disc">
                  <strong>Développement du site sur-mesure :</strong> 300 000
                  FCFA (une seule fois)
                </li>
              </ul>
              <p className="mb-4 text-muted-foreground">
                Les modalités de paiement sont les suivantes :
              </p>
              <ul className="mb-4 space-y-2 text-muted-foreground">
                <li className="ml-6 list-disc">
                  <strong>150 000 FCFA à la commande</strong> (acompte) - Ce
                  montant servira à l&apos;achat du nom de domaine (10 000 FCFA)
                  et de l&apos;hébergement (60 000 FCFA) pour la première année,
                  le solde (80 000 FCFA) étant imputé sur le développement
                </li>
                <li className="ml-6 list-disc">
                  <strong>148 000 FCFA à mi-parcours</strong> - validation des
                  maquettes ou première version
                </li>
                <li className="ml-6 list-disc">
                  <strong>72 000 FCFA à la livraison</strong> - mise en ligne et
                  réception définitive
                </li>
              </ul>
              <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>
                    Répartition de l&apos;acompte de 150 000 FCFA :
                  </strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="ml-6 list-disc">
                    Nom de domaine : 10 000 FCFA
                  </li>
                  <li className="ml-6 list-disc">
                    Hébergement (1ère année) : 60 000 FCFA
                  </li>
                  <li className="ml-6 list-disc">
                    Acompte développement : 80 000 FCFA
                  </li>
                </ul>
              </div>
              <p className="mb-4 text-muted-foreground">
                <strong>Note :</strong> Les montants de renouvellement annuel
                (domaine + hébergement = 70 000 FCFA/an) sont exclus du présent
                contrat et feront l&apos;objet d&apos;un devis séparé chaque
                année.
              </p>
              <p className="text-muted-foreground">
                Tout retard de paiement entraîne de plein droit
                l&apos;application d&apos;intérêts de retard au taux légal en
                vigueur au Sénégal (taux d&apos;escompte de la BCEAO), ainsi
                qu&apos;une indemnité forfaitaire pour frais de recouvrement de
                10 000 FCFA.
              </p>
            </section>

            {/* Article 6 - Propriété Intellectuelle */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 6 - Propriété Intellectuelle
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le code source et les éléments techniques développés par le
                Prestataire restent sa propriété intellectuelle jusqu&apos;au
                paiement intégral de la prestation.
              </p>
              <p className="mb-4 text-muted-foreground">
                Après paiement intégral, le Client acquiert un droit
                d&apos;usage exclusif de la solution développée pour ses besoins
                propres. Le Prestataire conserve le droit d&apos;utiliser le
                code source comme base de référence pour d&apos;autres projets,
                sous réserve de ne pas reproduire les éléments spécifiques au
                Client (contenus, design personnalisé, etc.).
              </p>
              <p className="text-muted-foreground">
                Les contenus (textes, images, vidéos) fournis par le Client
                restent sa propriété exclusive.
              </p>
            </section>

            {/* Article 7 - Garantie et Support */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 7 - Garantie et Support
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le Prestataire garantit que la solution développée est conforme
                aux spécifications convenues et fonctionne correctement au
                moment de la livraison.
              </p>
              <p className="mb-4 text-muted-foreground">
                Une période de garantie de <strong>1 mois</strong> est incluse
                après la livraison pour la correction des bugs et
                dysfonctionnements non imputables au Client.
              </p>
              <p className="text-muted-foreground">
                Au-delà de cette période, toute intervention fera l&apos;objet
                d&apos;un devis séparé. Les modifications de fonctionnalités ou
                ajouts de nouvelles fonctionnalités sont exclus de la garantie
                et font l&apos;objet d&apos;un devis complémentaire.
              </p>
            </section>

            {/* Article 8 - Responsabilité */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 8 - Responsabilité
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le Prestataire ne saurait être tenu responsable des dommages
                indirects résultant de l&apos;utilisation de la solution
                développée.
              </p>
              <p className="mb-4 text-muted-foreground">
                Le Client est seul responsable de la sauvegarde de ses données
                et de la maintenance de la solution après la période de
                garantie.
              </p>
              <p className="text-muted-foreground">
                Le Prestataire recommande fortement la souscription d&apos;une
                assurance et la mise en place de sauvegardes régulières.
              </p>
            </section>

            {/* Article 9 - Résiliation */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 9 - Résiliation
              </h2>
              <p className="mb-4 text-muted-foreground">
                En cas de résiliation du contrat à l&apos;initiative du Client
                avant la fin des prestations, le Prestataire sera rémunéré au
                prorata des prestations effectivement réalisées.
              </p>
              <p className="text-muted-foreground">
                En cas de manquement grave du Prestataire, le Client pourra
                résilier le contrat après mise en demeure restée sans effet
                pendant 15 jours.
              </p>
            </section>

            {/* Article 10 - Droit Applicable et Litiges */}
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Article 10 - Droit Applicable et Litiges
              </h2>
              <p className="mb-4 text-muted-foreground">
                Le présent contrat est régi par le droit sénégalais. Tout litige
                relatif à son interprétation ou à son exécution sera de la
                compétence exclusive des tribunaux de Dakar.
              </p>
              <p className="text-muted-foreground">
                Les parties s&apos;engagent à rechercher une solution amiable
                avant tout recours judiciaire.
              </p>
            </section>

            {/* Signature Section */}
            <section className="signature-section mt-12 space-y-6 rounded-lg border border-edge bg-muted/30 p-6">
              <h2 className="font-heading text-xl font-semibold">
                Acceptation du Contrat
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-4 font-semibold">Le Prestataire :</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Nom :</strong> Ndiaga Ndiaye
                    </p>
                    <p>
                      <strong>Email :</strong> contact@ndiagandiaye.com
                    </p>
                    <p>
                      <strong>Téléphone :</strong> +221 78 163 34 19
                    </p>
                    <p className="mt-4">
                      Signature :{" "}
                      {formData.prestataireSignature ? (
                        <span id="prestataire-signature-img">
                          <Image
                            src={formData.prestataireSignature}
                            alt="Signature Prestataire"
                            width={200}
                            height={80}
                            className="h-auto max-w-[200px]"
                            unoptimized
                          />
                        </span>
                      ) : (
                        "_________________"
                      )}
                    </p>
                    <p>
                      Date :{" "}
                      {formData.prestataireDateSignature || "_________________"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-4 font-semibold">Le Client :</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Raison sociale :</strong>{" "}
                      {formData.raisonSociale || "_________________"}
                    </p>
                    <p>
                      <strong>Représentant :</strong>{" "}
                      {formData.representant || "_________________"}
                    </p>
                    <p>
                      <strong>Email :</strong>{" "}
                      {formData.email || "_________________"}
                    </p>
                    <p>
                      <strong>Téléphone :</strong>{" "}
                      {formData.telephone || "_________________"}
                    </p>
                    <p className="mt-4">
                      Signature :{" "}
                      {formData.signature ? (
                        <span id="client-signature-img">
                          <Image
                            src={formData.signature}
                            alt="Signature"
                            width={200}
                            height={80}
                            className="h-auto max-w-[200px]"
                            unoptimized
                          />
                        </span>
                      ) : (
                        "_________________"
                      )}
                    </p>
                    <p>
                      Date : {formData.dateSignature || "_________________"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Actions */}
          <div className="no-print mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/offre-qse">Retour à l&apos;Offre</Link>
            </Button>
            <Button
              size="lg"
              onClick={handleDownloadPDF}
              disabled={
                isGenerating ||
                !formData.signature ||
                !formData.raisonSociale ||
                !formData.representant ||
                !formData.prestataireSignature
              }
            >
              {isGenerating ? (
                "Génération en cours..."
              ) : (
                <>
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Télécharger le PDF
                </>
              )}
            </Button>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
