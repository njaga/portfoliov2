"use client";

import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CodeIcon,
  CoinsIcon,
  DatabaseIcon,
  DollarSignIcon,
  FileTextIcon,
  GiftIcon,
  GlobeIcon,
  ImageIcon,
  InfoIcon,
  MailIcon,
  PackageIcon,
  PhoneIcon,
  RocketIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PROJECTS } from "@/features/profile/data/projects";
import { useTranslation } from "@/hooks/use-translation";
import { defaultLocale } from "@/lib/i18n";
import { getTranslatedProject } from "@/lib/translations";

// Mapping des technologies avec leurs logos
const technologies = [
  {
    name: "Laravel 11",
    description: "Framework backend robuste, sécurisé et extensible",
    logo: "laravel",
  },
  {
    name: "Blade",
    description: "Moteur de templates pour un rendu rapide et optimisé",
    logo: "blade",
  },
  {
    name: "Livewire",
    description: "Fonctionnalités dynamiques sans JavaScript complexe",
    logo: "livewire",
  },
  {
    name: "Tailwind CSS",
    description: "Design moderne, responsive et épuré",
    logo: "tailwindcss",
  },
  {
    name: "MySQL",
    description:
      "Base de données fiable pour stocker contenus, produits et clients",
    logo: "mysql",
  },
  {
    name: "Alpine.js",
    description: "Micro-interactions légères (si nécessaire)",
    logo: "alpine",
  },
  {
    name: "Axios",
    description: "Client HTTP pour les requêtes API",
    logo: "axios",
  },
  {
    name: "Font Awesome",
    description: "Bibliothèque d'icônes vectorielles",
    logo: "font-awesome",
  },
  {
    name: "OpenGraph",
    description: "Optimisation des métadonnées pour les réseaux sociaux",
    logo: "opengraph",
  },
  {
    name: "Google Analytics",
    description: "Suivi et analyse du trafic et des performances",
    logo: "google-analytics",
  },
  {
    name: "PayPal",
    description: "Intégration de paiement en ligne sécurisé",
    logo: "paypal",
  },
  {
    name: "PayTech",
    description: "Solution de paiement mobile money (Orange Money, Wave)",
    logo: null,
    icon: "paytech",
  },
];

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

// Composant Carousel des projets
function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { locale, mounted } = useTranslation();
  const currentLocale = mounted ? locale : defaultLocale;

  // Récupérer les 6 derniers projets
  const recentProjects = PROJECTS.slice(0, 6);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollPosition =
      container.scrollLeft + (cardRect.left - containerRect.left);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? recentProjects.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === recentProjects.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Trouver quelle carte est la plus visible
    let maxVisible = 0;
    let maxIndex = 0;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const visibleWidth =
        Math.min(rect.right, containerRect.right) -
        Math.max(rect.left, containerRect.left);

      if (visibleWidth > maxVisible) {
        maxVisible = visibleWidth;
        maxIndex = index;
      }
    });

    setCurrentIndex(maxIndex);
  };

  return (
    <div className="screen-line-after bg-muted/30 p-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-heading text-2xl font-semibold">
            Mes Dernières Réalisations
          </h2>
          <p className="text-muted-foreground">
            Découvrez quelques-uns de mes projets récents
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full border border-edge bg-background p-2 shadow-lg transition-all hover:bg-muted hover:shadow-xl md:-translate-x-12"
            aria-label="Projet précédent"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full border border-edge bg-background p-2 shadow-lg transition-all hover:bg-muted hover:shadow-xl md:translate-x-12"
            aria-label="Projet suivant"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Container scrollable */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {recentProjects.map((project, projectIndex) => {
              const projectTranslation = getTranslatedProject(
                project.id,
                currentLocale
              );
              const projectTitle = projectTranslation?.title || project.title;
              const projectDescription =
                projectTranslation?.description || project.description;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[projectIndex] = el;
                  }}
                  className="relative min-w-full snap-center sm:min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-0.67rem)]"
                >
                  <div className="group relative overflow-hidden rounded-xl border border-edge bg-background/50 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                    {/* Image du projet */}
                    {project.logo && (
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                          src={project.logo}
                          alt={projectTitle}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-heading text-lg font-semibold">
                          {projectTitle}
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {project.time}
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-edge bg-muted/50 px-2 py-1 text-xs text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 4 && (
                          <span className="rounded-full border border-edge bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                            +{project.skills.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {projectDescription && (
                        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                          {projectDescription.split("\n")[0]}
                        </p>
                      )}

                      {/* Lien vers le projet */}
                      <div className="flex items-center justify-between gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GlobeIcon className="mr-2 h-4 w-4" />
                            Voir le projet
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicateurs de pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {recentProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bouton vers la page contrat */}
        <div className="mt-8 text-center">
          <Button size="lg" asChild>
            <Link href="/contrat">
              <FileTextIcon className="mr-2 h-5 w-5" />
              Voir le Contrat Type
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OffreQSEPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    acceptanceDate: "",
    signature: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoi des données à l'API
      const response = await fetch("/api/offre/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email");
      }

      const result = await response.json();
      console.log("Email envoyé avec succès:", result);

      setIsSubmitted(true);
      setIsModalOpen(false);

      // Réinitialiser après 5 secondes pour permettre un nouveau remplissage si nécessaire
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          acceptanceDate: "",
          signature: null,
        });
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-svh">
      {/* Hero Section */}
      <div className="screen-line-after px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-edge bg-muted/50 px-4 py-2">
            <SparklesIcon className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              Réponse à Votre Demande de Devis
            </span>
          </div>
          <h1 className="mb-4 font-heading text-4xl leading-tight font-bold sm:text-5xl">
            Offre Technique & Financière
            <br />
            <span className="text-primary">
              Site Web QSE & Prévention des Risques
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground">
            Suite à votre demande, voici notre proposition complète pour votre
            site web professionnel. Une solution sur-mesure développée avec les
            dernières technologies, incluant boutique e-commerce et
            administration complète, livrée en 4 semaines.
          </p>
          <div className="border-warning/30 bg-warning/10 mx-auto mb-8 max-w-2xl space-y-2 rounded-lg border px-4 py-3 text-sm">
            <p className="text-warning-foreground flex items-center gap-2 font-semibold">
              <AlertTriangleIcon className="h-4 w-4 shrink-0" />
              Offre valide pour 3 mois (Date d&apos;émission : 06/12/2025)
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <InfoIcon className="h-4 w-4 shrink-0" />
              Cette offre est disponible uniquement en français. No English
              version available.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#offre-financiere">
                <MailIcon className="h-5 w-5" />
                Voir l&apos;Offre Financière
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+221781633419">
                <PhoneIcon className="h-5 w-5" />
                Discuter du Projet
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* OFFRE TECHNIQUE */}
      {/* ============================================ */}
      <div
        id="offre-technique"
        className="screen-line-after bg-muted/30 p-4 py-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2">
              <FileTextIcon className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold text-primary">
                Offre Technique
              </span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Une solution complète et moderne pour votre présence digitale
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              1. Technologies Utilisées
            </h2>
            <p className="mb-6 text-muted-foreground">
              Notre solution s&apos;appuie sur des technologies modernes,
              robustes et éprouvées :
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {technologies.map((tech, index) => {
                let IconComponent = CodeIcon;
                if (tech.icon === "paytech") IconComponent = CoinsIcon;

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-edge bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      {tech.logo ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                          <Image
                            src={`/stacks/${tech.logo}.svg`}
                            alt={`${tech.name} logo`}
                            width={32}
                            height={32}
                            className="h-8 w-8"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                      )}
                      <h3 className="font-heading font-semibold">
                        {tech.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tech.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture & Fonctionnalités */}
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              2. Architecture & Fonctionnalités du Site
            </h2>

            <div className="space-y-8">
              {/* Page d'Accueil */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GlobeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Page d&apos;Accueil
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Présentation globale de la structure (QSE, prévention des risques, industrie)",
                    "Mise en avant des services clés et des outils QSE",
                    "CTA (Call-to-Action) vers la boutique et le blog",
                    "Sections modulables et administrables",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* À Propos */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    À Propos
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Historique, vision, mission, valeurs",
                    "Présentation des domaines d'expertise (QSE, prévention, accompagnement)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nos Services */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <SettingsIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Nos Services
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Liste détaillée des services et solutions d'accompagnement QSE",
                    "Possibilité d'ajouter des fiches services depuis l'administration",
                    "Formulaire de demande de devis ou de contact depuis un service précis",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boutique E-commerce */}
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Boutique Intégrée (E-commerce Léger)
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Mise en avant des outils QSE : documents, modèles, formations, outils PDF, etc.",
                    "Catalogue administrable : ajouter / modifier / supprimer",
                    "Panier + commande simple",
                    "Paiement par transfert mobile / virement au début (Orange Money / Wave) + facture automatique",
                    "Système extensible si plus tard vous souhaitez intégrer un vrai paiement en ligne",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileTextIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">Blog</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Publication d'articles (actualité QSE, prévention des risques)",
                    "Catégories et tags",
                    "Système d'édition simple via un éditeur riche (WYSIWYG)",
                    "SEO optimisé pour Google",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MailIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Contact
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Formulaire de contact dynamique (Livewire)",
                    "Réception des messages par e-mail professionnel",
                    "Carte Google Maps (option)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Administration - Modules du Back-Office */}
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              3. Modules du Back-Office
            </h2>
            <p className="mb-6 text-muted-foreground">
              Un tableau de bord complet et intuitif pour gérer tous les aspects
              de votre site :
            </p>

            <div className="space-y-6">
              {/* Tableau de Bord */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BarChartIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Tableau de Bord
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Statistiques : visiteurs, articles, produits, commandes",
                    "Notifications (nouveau message, nouvelle commande)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gestion de la boutique */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Gestion de la Boutique
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Ajouter / Modifier / Supprimer un produit",
                    "Gestion des catégories",
                    "Gestion des commandes",
                    "Activation/désactivation des produits",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gestion du blog */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileTextIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Gestion du Blog
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Création, modification et suppression d'articles",
                    "Catégories",
                    "Brouillons & publications programmées",
                    "Téléchargements d'images optimisées",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gestion des services */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <SettingsIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Gestion des Services
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Ajout / modification / suppression",
                    "Ordre d'affichage",
                    "Upload de fichiers (PDF, images)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gestion du site */}
              <div className="rounded-xl border border-edge bg-background/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GlobeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Gestion du Site
                  </h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Paramètres généraux : logo, couleurs, coordonnées",
                    'Sections personnalisables : "À propos", "Accueil", etc.',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gestion utilisateurs */}
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">
                    Gestion Utilisateurs
                  </h3>
                </div>
                <div className="mb-4">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Différents rôles possibles :
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Administrateur",
                      "Éditeur (blog)",
                      "Gestionnaire boutique",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-success/20 bg-success/5 p-3">
                  <p className="text-sm text-muted-foreground">
                    <ShieldCheckIcon className="mr-2 inline h-4 w-4 text-success" />
                    Sécurisation par mot de passe haché (bcrypt)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optimisations */}
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              4. Optimisations & Standards
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Design responsive (mobile, tablette, desktop)",
                "Optimisation SEO de base (titres, métadonnées, vitesse)",
                "Cache Laravel pour rapidité",
                "Système de sauvegarde automatique de la base de données",
                "Mise en production + configuration des e-mails",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-success/20 bg-success/5 p-4"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Livrables */}
          <div className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold">
              5. Livrables
            </h2>
            <p className="mb-6 text-muted-foreground">
              À la livraison, vous recevrez l&apos;ensemble des éléments
              suivants :
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  icon: PackageIcon,
                  title: "Site web complet",
                  description:
                    "Site entièrement fonctionnel et déployé en production",
                },
                {
                  icon: DatabaseIcon,
                  title: "Base de données",
                  description:
                    "Structure de base de données optimisée et sauvegardée",
                },
                {
                  icon: SettingsIcon,
                  title: "Back-office",
                  description:
                    "Interface d'administration complète et opérationnelle",
                },
                {
                  icon: FileTextIcon,
                  title: "Documentation technique",
                  description:
                    "Documentation complète du code et des fonctionnalités",
                },
                {
                  icon: UsersIcon,
                  title: "Comptes administrateurs",
                  description: "Création et configuration des comptes d'accès",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Certificat SSL",
                  description: "Site sécurisé avec certificat HTTPS activé",
                },
                {
                  icon: GlobeIcon,
                  title: "Nom de domaine",
                  description: "Configuration et liaison du nom de domaine",
                },
                {
                  icon: RocketIcon,
                  title: "Formation",
                  description:
                    "Session de formation à l'utilisation du back-office",
                },
              ].map((livrable, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-edge bg-background/50 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <livrable.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-heading font-semibold">
                      {livrable.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {livrable.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Durée */}
          <div className="rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-background p-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-4 py-2">
              <ClockIcon className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-semibold text-primary">
                Durée de Développement
              </span>
            </div>
            <h3 className="mb-2 font-heading text-3xl font-bold">4 semaines</h3>
            <p className="text-sm text-muted-foreground">
              (incluant développement, design, tests et mise en ligne)
            </p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* OFFRE FINANCIÈRE */}
      {/* ============================================ */}
      <div
        id="offre-financiere"
        className="screen-line-after bg-gradient-to-br from-muted/50 to-background/50 p-4 py-16"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2">
              <DollarSignIcon className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold text-primary">
                Offre Financière
              </span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Investissement transparent et détaillé
            </p>
          </div>

          {/* Détail des coûts */}
          <div className="mb-8 space-y-6">
            {/* Nom de domaine */}
            <div className="rounded-xl border border-edge bg-background/50 p-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GlobeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">
                      1. Nom de Domaine
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Extension .COM
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-xl font-bold">
                    10 000 FCFA
                  </div>
                  <div className="text-sm text-muted-foreground">/ an</div>
                </div>
              </div>
            </div>

            {/* Hébergement */}
            <div className="rounded-xl border border-edge bg-background/50 p-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DatabaseIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">
                      2. Hébergement Web
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Serveur performant + e-mails professionnels illimités
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-xl font-bold">
                    60 000 FCFA
                  </div>
                  <div className="text-sm text-muted-foreground">/ an</div>
                </div>
              </div>
            </div>

            {/* Développement */}
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <CodeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">
                      3. Développement du Site Sur-Mesure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Design, développement, tests et mise en ligne
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-primary">
                    300 000 FCFA
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Une seule fois
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mb-8 rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-background p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-primary/20 pb-4">
              <span className="font-heading text-2xl font-bold">TOTAL</span>
              <div className="text-right">
                <span className="font-heading text-4xl font-bold text-primary">
                  370 000 FCFA
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              * Hors renouvellements annuels (domaine + hébergement)
            </p>
          </div>

          {/* Bonus - Mise en valeur */}
          <div className="mb-8 rounded-2xl border-2 border-success/50 bg-gradient-to-br from-success/20 via-success/10 to-background p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-success/50 bg-success/20">
                <GiftIcon className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-success">
                  Bonus Inclus Gratuitement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Valeur ajoutée offerte sans supplément
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Assistance technique",
                  description: "1 mois après livraison",
                  icon: RocketIcon,
                },
                {
                  title: "Optimisation SEO",
                  description: "Configuration de départ pour le référencement",
                  icon: ZapIcon,
                },
                {
                  title: "Google Analytics",
                  description: "Mise en place et configuration complète",
                  icon: BarChartIcon,
                },
                {
                  title: "Google Search Console",
                  description: "Configuration pour le suivi des performances",
                  icon: GlobeIcon,
                },
                {
                  title: "Création de visuel",
                  description: "Cartes de visite et plaquette de présentation",
                  icon: ImageIcon,
                },
                {
                  title: "Outil QSE gratuit",
                  description: "Création d'un (1 seul) outil QSE gratuitement",
                  icon: PackageIcon,
                },
              ].map((bonus, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-success/30 bg-background/50 p-4 transition-all duration-300 hover:border-success/50 hover:bg-success/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/20 text-success">
                    <bonus.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-heading font-semibold text-foreground">
                      {bonus.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {bonus.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:flex-1"
              onClick={() => setIsModalOpen(true)}
              disabled={isSubmitted}
            >
              <MailIcon className="h-5 w-5" />
              {isSubmitted ? "Offre Validée" : "Valider Cette Offre"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:flex-1"
              asChild
            >
              <a href="tel:+221781633419">
                <PhoneIcon className="h-5 w-5" />
                Discuter du Projet
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="screen-line-after bg-muted/30 p-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-semibold">
            Planning de Développement
          </h2>
          <div className="relative space-y-8">
            {/* Ligne verticale */}
            <div className="absolute top-0 left-6 hidden h-full w-0.5 bg-edge md:left-1/2 md:block md:-translate-x-0.5"></div>
            {[
              {
                week: "Semaine 1",
                title: "Conception & Design",
                description:
                  "Maquettes, validation du design, préparation de l'architecture",
              },
              {
                week: "Semaine 2-3",
                title: "Développement",
                description:
                  "Création des fonctionnalités, intégration, développement du back-office",
              },
              {
                week: "Semaine 4",
                title: "Tests & Mise en Ligne",
                description:
                  "Tests finaux, corrections, formation, mise en production",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative flex items-start gap-4 md:gap-8"
              >
                {/* Point sur la timeline */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary text-sm font-semibold text-primary-foreground shadow-md md:absolute md:left-1/2 md:-translate-x-1/2">
                  {index + 1}
                </div>
                {/* Contenu */}
                <div className="relative z-10 flex-1 rounded-xl border border-edge bg-background/50 p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                    <ClockIcon className="h-3 w-3 text-primary" />
                    <span className="font-mono text-xs font-semibold text-primary">
                      {step.week}
                    </span>
                  </div>
                  <h3 className="mt-3 mb-2 font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="screen-line-after bg-muted/30 p-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-semibold">
            Garanties & Engagement
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheckIcon,
                title: "Code Qualité",
                description:
                  "Standards professionnels, code maintenable et documenté",
              },
              {
                icon: RocketIcon,
                title: "Support Inclus",
                description: "1 mois d'assistance gratuite après la livraison",
              },
              {
                icon: UsersIcon,
                title: "Formation Complète",
                description:
                  "Formation personnalisée pour maîtriser votre back-office",
              },
            ].map((guarantee, index) => (
              <div
                key={index}
                className="rounded-xl border border-edge bg-background/50 p-6 text-center"
              >
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <guarantee.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-heading font-semibold">
                  {guarantee.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mes dernières réalisations */}
      <ProjectsCarousel />

      {/* CTA Section - Style adapté au thème */}
      <div id="contact" className="screen-line-before p-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-edge bg-zinc-950 p-8 text-center dark:bg-zinc-50">
            <h2 className="mb-4 font-heading text-2xl font-bold text-zinc-50 dark:text-zinc-950">
              Cette Offre Vous Convient ?
            </h2>
            <p className="mb-4 text-zinc-300 dark:text-zinc-700">
              Nous sommes prêts à démarrer votre projet. Contactez-nous pour
              valider cette offre ou pour discuter d&apos;éventuelles
              modifications. Réponse garantie sous 24h.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setIsModalOpen(true)}
                disabled={isSubmitted}
              >
                <MailIcon className="h-5 w-5" />
                {isSubmitted ? "Offre Validée" : "Valider l'Offre"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-white/40 bg-white/20 font-semibold text-white backdrop-blur-md hover:border-white/60 hover:bg-white/30 sm:w-auto dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-50 dark:hover:bg-zinc-700"
                asChild
              >
                <a href="tel:+221781633419">
                  <PhoneIcon className="h-5 w-5" />
                  +221 78 163 34 19
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-600">
              Ou envoyez un email à{" "}
              <a
                href="mailto:contact@ndiagandiaye.com"
                className="text-zinc-200 underline-offset-4 hover:underline dark:text-zinc-800"
              >
                contact@ndiagandiaye.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Modal de validation */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Validation de l&apos;Offre</DialogTitle>
            <DialogDescription>
              Veuillez remplir le formulaire ci-dessous pour valider cette
              offre.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="acceptanceDate">Date d&apos;acceptation *</Label>
              <input
                id="acceptanceDate"
                type="date"
                required
                value={formData.acceptanceDate}
                onChange={(e) =>
                  setFormData({ ...formData, acceptanceDate: e.target.value })
                }
                className="w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
            <SignatureCanvas
              onSignatureChange={(signature) =>
                setFormData({ ...formData, signature })
              }
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={
                  !formData.signature ||
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.acceptanceDate
                }
              >
                <CheckIcon className="h-4 w-4" />
                Valider l&apos;Offre
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="h-8" />
    </div>
  );
}
