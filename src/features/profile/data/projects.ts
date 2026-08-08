import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  // =========================================================================
  // ============== SOLUTIONS KAMIT (https://kamit.tech/solutions) ===========
  // =========================================================================
  {
    id: "kumba-media",
    title: "Kumba Media",
    time: "2026",
    link: "https://kumba.media",
    skills: [
      "Company Project",
      "SaaS",
      "Media",
      "Laravel",
      "Livewire",
      "Gemini AI",
      "Mistral AI",
      "RSS",
      "MySQL",
    ],
    status: "available",
    description: `Produit éditorial de Kamit Digital Solutions. Plateforme éditoriale et d'information panafricaine consacrée à l’actualité, l’économie, la technologie, la culture et le sport. Agrégation automatique de flux RSS et reformulation intelligente via l'IA.

**Automatisation Éditoriale**
- Agrégation automatique d'articles depuis des flux RSS africains et internationaux
- Reformulation du contenu via les API Gemini (Google) et Mistral AI
- Interface de lecture moderne avec scroll infini
- Système de catégories et de types d'articles

**Administration**
- Interface d'administration complète avec actions groupées
- Modération et publication des articles
- Planification automatique des tâches`,
  },
  {
    id: "teranga-deals",
    title: "Teranga Deals",
    time: "2026",
    link: "https://terangadeals.com",
    skills: [
      "Company Project",
      "E-Commerce",
      "Laravel 11",
      "Livewire 3",
      "Tailwind CSS",
      "Wave",
      "Orange Money",
      "MySQL",
    ],
    status: "available",
    description: `Produit e-commerce de Kamit Digital Solutions. Plateforme e-commerce sénégalaise permettant de découvrir, commander et se faire livrer des produits utiles au quotidien (électroménager, électronique, informatique).

**Catalogue & Commandes**
- Catalogue produits avec filtres (catégorie, marque, prix)
- Scroll infini sur la boutique
- Fiches produits avec variantes et galerie d'images
- Panier d'achat persistant et checkout multi-étapes

**Espace Client & Paiements**
- Espace client avec suivi des commandes, profil, réclamations et coupons
- Paiement Wave, Orange Money et à la livraison
- Panel admin avec statistiques des ventes et gestion de stock`,
  },
  {
    id: "qr-delices",
    title: "QR Délices",
    time: "2025",
    link: "https://kamit.tech/solutions/qr-delices",
    skills: [
      "Company Project",
      "SaaS",
      "Restoration",
      "QR Code",
      "POS",
      "Laravel",
      "Livewire",
      "Tailwind CSS",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Plateforme de restauration complète qui relie menu digital QR code, prises de commandes, réservations de tables, gestion en cuisine/salle et livraison.

**Fonctionnalités**
- Menus digitaux accessibles par QR Code
- Prise de commande directe à table et en livraison
- Module POS pour la caisse et la salle
- Gestion des réservations et du stock cuisine`,
  },
  {
    id: "yoonu",
    title: "Yoonu",
    time: "2025",
    link: "https://kamit.tech/solutions/yoonu",
    skills: [
      "Company Project",
      "SaaS",
      "Mobility",
      "VTC",
      "Carpooling",
      "Delivery",
      "React Native",
      "Laravel",
    ],
    status: "coming-soon",
    description: `Produit Kamit Digital Solutions. Application autonome de mobilité urbaine pour réserver un trajet VTC, proposer des courses en covoiturage ou organiser la livraison express de colis.

**Services**
- Réservation de véhicules VTC avec suivi GPS
- Module de covoiturage urbain et interurbain
- Envoi et livraison rapide de colis`,
  },
  {
    id: "liggeey",
    title: "Liggéey",
    time: "2025",
    link: "https://kamit.tech/solutions/liggeey",
    skills: [
      "Company Project",
      "SaaS",
      "Job Portal",
      "Recruitment",
      "HR",
      "Next.js",
      "Laravel",
      "PostgreSQL",
    ],
    status: "coming-soon",
    description: `Produit Kamit Digital Solutions. Application autonome d'emploi et de recrutement pour publier des offres, postuler en un clic, valoriser son profil professionnel et suivre ses candidatures.

**Fonctionnalités**
- Publication et gestion des offres d'emploi
- Candidature simplifiée et gestion des CVs
- Tableau de bord recruteurs et candidats`,
  },
  {
    id: "kamit-core",
    title: "Kamit Core (Kamit Ops)",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-ops",
    skills: [
      "Company Project",
      "SaaS",
      "ERP",
      "HRIS",
      "Accounting",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Socle de gestion d’entreprise complet (ERP/Comptabilité/RH) pour organiser équipes, projets, gestion documentaire, dépenses et décisions d'affaires.

**Modules**
- Fiches employés et gestion du personnel (SIRH)
- Calcul de la paie et suivi des congés
- Gestion des projets, tâches et ressources
- Comptabilité analytique et budgets`,
  },
  {
    id: "kamit-sales",
    title: "Kamit Sales",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-sales",
    skills: [
      "Company Project",
      "SaaS",
      "CRM",
      "Sales Pipeline",
      "Invoicing",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. CRM et outil de gestion commerciale adapté aux PME africaines pour suivre prospects, pipelines de vente, devis, facturation, paiements et relation client.

**Fonctionnalités**
- Vue Kanban du pipeline de vente
- Génération automatisée de devis et factures
- Suivi des règlements et rappels d'impayés
- Statistiques de ventes et objectifs commerciaux`,
  },
  {
    id: "kamit-immo",
    title: "Kamit Immo",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-immo",
    skills: [
      "Company Project",
      "SaaS",
      "Real Estate",
      "Lease Management",
      "Rent Collection",
      "Laravel 11",
      "PostgreSQL",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Solution de gestion immobilière permettant aux propriétaires, bailleurs et agences de piloter portefeuilles de biens, baux, encaissement des loyers, quittances et maintenance.

**Fonctionnalités**
- Portefeuille de biens et fiches locataires
- Édition de contrats de bail et quittances de loyer
- Suivi des paiements et dépenses de maintenance
- Tableaux de bord financiers et rentabilité`,
  },
  {
    id: "kamit-field",
    title: "Kamit Field",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-field",
    skills: [
      "Company Project",
      "SaaS",
      "Field Ops",
      "Geolocation",
      "React Native",
      "Laravel 11",
      "PostgreSQL",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Plateforme web et mobile de gestion des équipes terrain pour planifier les interventions, suivre le pointage GPS, documenter les rondes et valider les tâches.

**Fonctionnalités**
- Planning d'interventions et attribution des missions
- Pointage GPS entrée/sortie de site
- Rapports photos, signatures tactiles et formulaires
- Application mobile avec mode hors-ligne`,
  },
  {
    id: "kamit-fleet",
    title: "Kamit Fleet",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-fleet",
    skills: [
      "Company Project",
      "SaaS",
      "Fleet Management",
      "GPS Tracking",
      "React Native",
      "Laravel 11",
      "PostgreSQL",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Plateforme SaaS de gestion de flotte et de géolocalisation GPS en temps réel pour entreprises de transport et de services.

**Fonctionnalités**
- Géolocalisation des véhicules en temps réel
- Suivi de la consommation de carburant et trajets
- Gestion des conducteurs et plannings
- Suivi de la maintenance préventive et alertes`,
  },
  {
    id: "kamit-prevention",
    title: "Kamit Prévention",
    time: "2025",
    link: "https://kamit.tech/solutions/kamit-prevention",
    skills: [
      "Company Project",
      "SaaS",
      "QHSE",
      "Risk Prevention",
      "Safety Audits",
      "DUERP",
      "Laravel 11",
    ],
    status: "in-development",
    description: `Produit Kamit Digital Solutions. Plateforme QHSE modulaire dédiée aux visites de sécurité (VCS), au suivi de l'accidentologie, à la gestion des risques professionnels (DUERP) et aux plans de prévention.

**Fonctionnalités**
- Audits terrain et visites de sécurité
- Registre d'accidentologie et analyse des causes
- Évaluation des risques professionnels (DUERP)
- Plans d'actions QSE et suivi des correctifs`,
  },
  {
    id: "kumba-intelligence",
    title: "Kumba Intelligence",
    time: "2026",
    link: "https://kamit.tech/solutions/kumba-intelligence",
    skills: [
      "Company Project",
      "AI Engine",
      "Data Scraper",
      "RSS Aggregator",
      "NLP",
      "Mistral AI",
      "Gemini AI",
    ],
    status: "available",
    description: `Produit Kamit Digital Solutions. Moteur technologique interne de collecte, d'enrichissement et de classification automatique par IA pour soutenir la veille stratégique et la production éditoriale.

**Fonctionnalités**
- Ingestion automatisée de flux d'informations et données
- Traitement NLP et classification automatique d'entités
- Génération d'insights et synthèses de données`,
  },

  // =========================================================================
  // ============== RÉALISATIONS CLIENTS KAMIT (https://kamit.tech/realisations)
  // =========================================================================
  {
    id: "ohkas-onesafe",
    title: "OHKAS - Cabinet QSE & OneSafe",
    time: "2025",
    link: "https://kamit.tech/realisations/ohkas-cabinet-qse-and-plateforme-onesafe",
    skills: [
      "Client Project",
      "SaaS",
      "QSE",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Accompagnement digital complet pour le cabinet OHKAS : site vitrine institutionnel et développement de la plateforme SaaS OneSafe dédiée à la prévention des risques QSE.`,
  },
  {
    id: "onesafe-ohkas",
    title: "OneSafe - SaaS QSE par OHKAS",
    time: "2025",
    link: "https://kamit.tech/realisations/onesafe-ohkas",
    skills: [
      "Client Project",
      "SaaS",
      "QSE",
      "PDF Export",
      "Touch Signature",
      "Laravel",
      "Livewire",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme SaaS métier de prévention des risques professionnels développée pour OHKAS. Inclut audits QHSE, génération de rapports PDF, signatures tactiles et suivi des plans d'actions.`,
  },
  {
    id: "site-vigilus-sierra-leone",
    title: "VIGILUS Facilities Sierra Leone",
    time: "2026",
    link: "https://vigilus-facilities.sl",
    skills: [
      "Client Project",
      "Multilingual",
      "WordPress",
      "PHP",
      "MySQL",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme web officielle pour l'implantation de VIGILUS Facilities à Freetown (Sierra Leone), présentant les services de sécurité physique, électronique, incendie et Facility Management.`,
  },
  {
    id: "site-vigilus-dubai",
    title: "VIGILUS International Dubai",
    time: "2026",
    link: "https://vigilus-intl.com",
    skills: [
      "Client Project",
      "International",
      "WordPress",
      "PHP",
      "MySQL",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Site web institutionnel international pour VIGILUS International LLC-FZ à Dubaï, accompagnant le positionnement global du Groupe et ses services de conseil.`,
  },
  {
    id: "site-vigilus-cote-divoire",
    title: "VIGILUS Côte d'Ivoire",
    time: "2026",
    link: "https://groupevigilus.ci",
    skills: [
      "Client Project",
      "Corporate",
      "WordPress",
      "PHP",
      "MySQL",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme digitale de VIGILUS Côte d'Ivoire à Abidjan, mettant en avant les solutions de sécurité électronique, monétique, informatique et gardiennage.`,
  },
  {
    id: "site-web-mtech-plus",
    title: "MTech Plus - Site Web",
    time: "2025",
    link: "https://kamit.tech/realisations/site-web-mtech-plus",
    skills: ["Client Project", "WordPress", "PHP", "MySQL", "Tailwind CSS"],
    status: "available",
    description: `Projet client réalisé par Kamit. Site vitrine institutionnel moderne pour MTech Plus, partenaire technologique de référence à Dakar spécialisé en monétique, IT, télécoms et sécurité.`,
  },
  {
    id: "logiciel-facturation-mtech-plus",
    title: "MTech Plus - Facturation ERP",
    time: "2025",
    link: "https://kamit.tech/realisations/logiciel-de-facturation-mtech-plus",
    skills: [
      "Client Project",
      "ERP",
      "Laravel 12",
      "Livewire 3",
      "Tailwind CSS",
      "MySQL",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Application web métier de gestion commerciale, création de devis, facturation automatisée et suivi des paiements développée sur mesure pour MTech Plus.`,
  },
  {
    id: "mbt-services-super-app",
    title: "MBT Services - Super App",
    time: "2026",
    link: "https://app.mbtservices.net",
    skills: [
      "Client Project",
      "Super App",
      "Java",
      "Laravel",
      "GraphQL",
      "REST API",
      "Vue.js",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Super application multi-services intégrant VTC, taxi-moto, livraison express, opportunités d'emploi, restauration en ligne et boutiques e-commerce.`,
  },
  {
    id: "site-vitrine-vigilus-mobility",
    title: "VIGILUS Mobility",
    time: "2026",
    link: "https://locationvoituredakar.com",
    skills: [
      "Client Project",
      "Mobility",
      "Laravel",
      "Vue.js",
      "Tailwind CSS",
      "SEO",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme web d'acquisition et vitrine de VIGILUS Mobility à Dakar : location de véhicules de prestige, flotte d'entreprise et chauffeurs VIP.`,
  },
  {
    id: "vigilus-group-site",
    title: "VIGILUS Group - Corporate",
    time: "2026",
    link: "https://groupevigilus.com",
    skills: [
      "Client Project",
      "Corporate",
      "Django",
      "React.js",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Refonte complète du portail corporate de VIGILUS Group, leader africain dans la sécurité privée, le Facility Management et l'ingénierie numérique.`,
  },
  {
    id: "cooperative-police-platform",
    title: "Coopérative Police - Plateforme",
    time: "2025",
    link: "https://kamit.tech/realisations/cooperative-police-platform",
    skills: [
      "Client Project",
      "Management App",
      "Laravel",
      "Vue.js",
      "MySQL",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme applicative de gestion des membres, demandes de prêts, cotisations et services pour les adhérents de la Coopérative d'Habitat de la Police.`,
  },
  {
    id: "securis-site",
    title: "Securis Services",
    time: "2025",
    link: "https://kamit.tech/realisations/securis-site",
    skills: ["Client Project", "Next.js", "React.js", "Tailwind CSS"],
    status: "available",
    description: `Projet client réalisé par Kamit. Site vitrine moderne pour Securis Services, entreprise spécialisée dans le gardiennage, la surveillance et la sécurité privée d'entreprise à Dakar.`,
  },
  {
    id: "site-web-cooperative-police",
    title: "Coopérative Police - Site Web",
    time: "2025",
    link: "https://kamit.tech/realisations/site-web-cooperative-de-la-police",
    skills: ["Client Project", "Laravel", "Vue.js", "Tailwind CSS"],
    status: "available",
    description: `Projet client réalisé par Kamit. Site web institutionnel d'information et de communication pour les membres et partenaires de la Coopérative d'Habitat de la Police.`,
  },
  {
    id: "site-vitrine-vigilus-properties",
    title: "VIGILUS Properties",
    time: "2026",
    link: "https://vigilus-properties.com",
    skills: ["Client Project", "Real Estate", "Laravel", "Tailwind CSS", "SEO"],
    status: "available",
    description: `Projet client réalisé par Kamit. Plateforme digitale de VIGILUS Properties dédiée à la promotion immobilière, la commercialisation de programmes et la gestion locative à Dakar.`,
  },
  {
    id: "site-vitrine-vigilus-facilities",
    title: "VIGILUS Facilities",
    time: "2026",
    link: "https://vigilus-facilities.com",
    skills: [
      "Client Project",
      "Facility Management",
      "Laravel",
      "Vue.js",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Projet client réalisé par Kamit. Site vitrine de VIGILUS Facilities Sénégal : services d'entretien, sécurité électronique, sécurité incendie, gardiennage et Facility Management.`,
  },
  {
    id: "site-vitrine-vigilus-securite",
    title: "VIGILUS Sécurité",
    time: "2026",
    link: "https://vigilus-facilities.com/securite",
    skills: ["Client Project", "Security", "Laravel", "Vue.js", "Tailwind CSS"],
    status: "available",
    description: `Projet client réalisé par Kamit. Vitrine digitale de VIGILUS Sécurité au Sénégal, présentant les prestations de gardiennage, surveillance et sécurité événementielle.`,
  },

  // =========================================================================
  // ============== AUTRES PROJETS ET OPEN SOURCE ===========================
  // =========================================================================
  {
    id: "payor",
    title: "Payor",
    time: "2025",
    link: "https://github.com",
    skills: [
      "Open Source",
      "Laravel 12",
      "Livewire 3",
      "Tailwind CSS",
      "MySQL",
      "Free",
    ],
    status: "in-development",
    description: `Application de facturation complète et gratuite, spécialement conçue pour le contexte sénégalais. Développée avec Laravel 12 et Livewire 3 pour la gestion de la facturation des PME africaines.`,
  },
  {
    id: "paxton-securite-website",
    title: "Paxton Sécurité",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 11",
      "Livewire 3",
      "Alpine.js",
      "Tailwind CSS",
    ],
    status: "in-development",
    description: `Site web corporate moderne pour Paxton Sécurité, entreprise spécialisée dans les solutions de sécurité physique et incendie au Sénégal.`,
  },
  {
    id: "portfolio-ndiaga",
    title: "ndiagandiaye.com",
    time: "2026",
    link: "https://ndiagandiaye.com",
    skills: [
      "Portfolio",
      "Next.js 15",
      "Tailwind CSS v4",
      "TypeScript",
      "shadcn/ui",
      "Motion",
      "MDX",
      "Open Source",
    ],
    status: "available",
    description: `Portfolio personnel moderne et minimaliste présentant mon parcours et mes réalisations en tant que développeur FullStack & Product Manager.`,
  },
  {
    id: "colorfusion",
    title: "ColorFusion",
    time: "2024",
    link: "#",
    skills: ["Open Source", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "available",
    description: `Suite d'outils gratuits et open source pour développeurs et designers : convertisseur de couleurs, générateurs Tailwind, motifs et grilles.`,
  },
];
