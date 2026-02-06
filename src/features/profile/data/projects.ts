import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  // ============== PROJETS CLIENTS EN VEDETTE ==============
  {
    id: "payor",
    title: "Payor",
    time: "2025",
    link: "#",
    skills: [
      "Open Source",
      "Laravel 12",
      "Livewire 3",
      "Tailwind CSS",
      "MySQL",
      "Free",
    ],
    status: "in-development",
    description: `Application de facturation complète et gratuite, spécialement conçue pour le contexte sénégalais. Développée avec Laravel 12 et Livewire 3, Payor offre une solution moderne et intuitive pour la gestion de la facturation des PME africaines.

**Gestion des Clients**
- CRUD complet avec support du numéro NINEA sénégalais
- Validation des numéros de téléphone (+221)
- Gestion des 14 régions administratives du Sénégal
- Recherche avancée et export CSV

**Devis et Factures**
- Numérotation automatique (DEV-2025-001, FAC-2025-001)
- Conversion de devis en factures en un clic
- Gestion des statuts (brouillon, envoyé, payé, en retard)
- TVA 18% (standard Sénégal)
- Support Mobile Money (Wave, Orange Money)

**Rappels Automatiques**
- Rappels configurables avant, à et après échéance
- Templates d'emails personnalisables

Devise XOF (Franc CFA), fuseau horaire Africa/Dakar, interface 100% française.`,
    logo: undefined,
  },
  {
    id: "paxton-securite-website",
    title: "Paxton Sécurité - Site Web",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 11",
      "Livewire 3",
      "Alpine.js",
      "Tailwind CSS",
      "MySQL",
    ],
    status: "in-development",
    description: `Site web corporate moderne pour Paxton Sécurité, entreprise leader dans les solutions de sécurité au Sénégal. Une vitrine digitale élégante présentant l'expertise et les services de l'entreprise.

**Partie Publique**
- Vitrine corporate avec animations fluides (x-intersect)
- Présentation détaillée des services : Protection incendie, Vidéosurveillance, Contrôle d'accès & Biométrie, Alarme intrusion, Portes coupe-feu
- Catalogue produits avec système de filtrage avancé
- Système de demande de devis personnalisé (remplace le panier classique)
- Blog & Actualités sur la sécurité
- Contact avec carte interactive
- Générateur de signatures email pour les employés

**Back-office Administration**
- Gestion des produits et catégories
- Gestion des articles de blog
- Gestion des demandes de devis et contacts
- Interface personnalisée (sans Filament) pour flexibilité maximale`,
    logo: undefined,
  },
  {
    id: "paxton-securite-branding",
    title: "Paxton Sécurité - Identité Visuelle",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Branding",
      "Logo Design",
      "Graphic Design",
      "Print Design",
    ],
    status: "in-development",
    description: `Création complète de l'identité visuelle pour Paxton Sécurité. Une image de marque professionnelle et moderne reflétant l'expertise et la fiabilité de l'entreprise dans le domaine de la sécurité.

**Livrables**
- Logo principal et variations
- Charte graphique complète
- Cartes de visite professionnelles
- Plaquette commerciale
- Flyers promotionnels
- Signature électronique pour emails

L'identité visuelle utilise des couleurs évoquant la confiance et la sécurité, avec une typographie moderne et lisible.`,
    logo: undefined,
  },
  {
    id: "ohkas-website",
    title: "OHKAS - Site Web",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 11",
      "Filament",
      "Tailwind CSS",
      "MySQL",
      "Livewire",
    ],
    status: "in-development",
    description: `Site web professionnel pour OHKAS, cabinet de conseil spécialisé en Qualité, Sécurité et Environnement (QSE). Une plateforme complète offrant contenus spécialisés, outils opérationnels et accompagnement sur mesure aux entreprises.

**Fonctionnalités**
- Page d'accueil avec présentation des services QSE
- Catalogue de formations certifiantes
- Boutique en ligne pour outils et documents QSE
- Blog avec articles d'expertise
- Outil diagnostique QSE en ligne
- Système de demande de devis
- Espace client personnalisé

**Administration**
- Gestion via Filament Admin Panel
- Suivi des demandes et des clients
- Analytics et reporting`,
    logo: undefined,
  },
  {
    id: "ohkas-branding",
    title: "OHKAS - Identité Visuelle",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Branding",
      "Logo Design",
      "Graphic Design",
      "Print Design",
    ],
    status: "in-development",
    description: `Création de l'identité visuelle complète pour OHKAS, reflétant le professionnalisme et l'expertise du cabinet en QSE (Qualité, Sécurité, Environnement).

**Livrables**
- Logo principal et déclinaisons
- Charte graphique détaillée
- Cartes de visite
- Plaquette de présentation

L'identité utilise des couleurs évoquant la confiance, la sécurité et l'environnement, avec une approche moderne et professionnelle.`,
    logo: undefined,
  },
  {
    id: "mtech-website",
    title: "Mtech Plus - Site Web",
    time: "2025",
    link: "#",
    skills: ["Client Project", "Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    status: "in-development",
    description: `Refonte complète du site web de Mtech Plus, partenaire technologique de confiance offrant des solutions innovantes pour un futur connecté. Site vitrine moderne présentant les quatre domaines d'expertise de l'entreprise.

**Domaines d'Expertise**
- Monétique : Solutions de paiement électronique
- Communication Digitale : Stratégies et outils digitaux
- Informatique : Infrastructure et solutions IT
- Sécurité : Systèmes de protection et surveillance

**Fonctionnalités**
- Design moderne et responsive
- Présentation des services et réalisations
- Formulaire de contact et demande de devis
- Blog technique
- Espace partenaires`,
    logo: undefined,
  },
  {
    id: "mtech-erp",
    title: "Mtech Plus - ERP",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 12",
      "Livewire 3",
      "Tailwind CSS",
      "MySQL",
      "ERP",
    ],
    status: "in-development",
    description: `Logiciel de gestion interne développé sur mesure pour Mtech Plus. Solution ERP complète pour la gestion quotidienne de l'entreprise.

**Modules**
- Gestion des clients et prospects
- Création et suivi des factures
- Établissement des devis
- Gestion des contrats
- Suivi des projets et tâches
- Tableau de bord avec KPIs
- Rapports et exports`,
    logo: undefined,
  },

  // ============== SOLUTIONS KAMIT ==============
  {
    id: "kamit-fleet",
    title: "KamitFleet",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "SaaS",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
      "Tailwind CSS",
      "GPS Tracking",
    ],
    status: "in-development",
    description: `Plateforme SaaS de gestion de flotte et de tracking GPS en temps réel, conçue pour les entreprises de transport, logistique et services au Sénégal et en Afrique de l'Ouest.

**Fonctionnalités Principales**
- Suivi en temps réel des véhicules sur carte interactive
- Historique des trajets et rapports de conduite
- Gestion de la consommation de carburant
- Planification et suivi de la maintenance préventive
- Gestion des conducteurs et affectations
- Alertes personnalisables (vitesse, zones, horaires)
- Rapports détaillés et analytics
- Support multi-entreprises

**Intégrations**
- Traceurs GPS compatibles
- API pour intégrations tierces`,
    logo: undefined,
  },
  {
    id: "kamit-fleet-mobile",
    title: "KamitFleet Mobile",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "React Native",
      "Expo",
      "TypeScript",
      "Push Notifications",
      "Offline Mode",
    ],
    status: "in-development",
    description: `Application mobile native pour le suivi de flotte KamitFleet. Disponible sur iOS et Android, elle permet aux gestionnaires et conducteurs d'accéder aux informations de flotte en mobilité.

**Fonctionnalités**
- Visualisation en temps réel des véhicules
- Notifications push pour alertes critiques
- Mode hors-ligne avec synchronisation automatique
- Journal de bord des conducteurs
- Rapports de trajets
- Communication avec le central

**Technologie**
- React Native / Expo pour performances natives
- Mode hors-ligne intelligent
- Optimisation batterie`,
    logo: undefined,
  },
  {
    id: "kamit-field",
    title: "KamitField",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "SaaS",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
      "Tailwind CSS",
      "Geolocation",
    ],
    status: "in-development",
    description: `Plateforme SaaS de gestion des équipes terrain pour les entreprises avec des opérations sur le terrain : maintenance, livraison, services techniques, sécurité.

**Fonctionnalités**
- Attribution et suivi des tâches en temps réel
- Géolocalisation des agents terrain
- Pointage GPS entrée/sortie des sites
- Gestion des présences et absences
- Suivi des performances individuelles et équipe
- Planification intelligente des itinéraires
- Communication instantanée

**Reporting**
- Tableaux de bord analytiques
- Rapports d'activité détaillés
- Export des données`,
    logo: undefined,
  },
  {
    id: "kamit-field-mobile",
    title: "KamitField Mobile",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "React Native",
      "Expo",
      "TypeScript",
      "Push Notifications",
      "Offline Mode",
    ],
    status: "in-development",
    description: `Application mobile native pour les agents terrain utilisant KamitField. Conçue pour une utilisation intensive sur le terrain avec mode hors-ligne robuste.

**Fonctionnalités Agent**
- Réception et gestion des missions
- Pointage GPS entrée/sortie automatique
- Capture photos/documents pour rapports
- Signature électronique client
- Notifications push pour nouvelles missions
- Navigation vers les sites d'intervention

**Mode Hors-ligne**
- Travail sans connexion internet
- Synchronisation automatique dès reconnexion
- Disponible iOS et Android`,
    logo: undefined,
  },
  {
    id: "kamit-immo",
    title: "KamitImmo",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "SaaS",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    status: "in-development",
    description: `Plateforme SaaS de gestion immobilière complète pour propriétaires, agences et syndics au Sénégal et en Afrique de l'Ouest.

**Gestion Locative**
- Portefeuille de biens (appartements, maisons, commerces, terrains)
- Fiches locataires détaillées
- Contrats de bail numériques
- Quittances automatiques
- Suivi des paiements et relances

**Maintenance et Charges**
- Demandes d'intervention techniques
- Suivi des réparations
- Gestion des charges communes
- Facturation automatisée

**Reporting**
- Tableaux de bord financiers
- Rapports de rentabilité
- Export comptable`,
    logo: undefined,
  },
  {
    id: "kamit-sales",
    title: "KamitSales",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "SaaS",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
      "Tailwind CSS",
      "CRM",
    ],
    status: "in-development",
    description: `Plateforme SaaS de gestion commerciale et CRM adaptée aux entreprises africaines. Solution complète pour optimiser le cycle de vente.

**CRM & Prospection**
- Gestion des contacts et entreprises
- Pipeline de vente visuel (Kanban)
- Historique des interactions
- Scoring et qualification des leads

**Gestion Commerciale**
- Création de devis professionnels
- Conversion en factures
- Catalogue produits/services
- Grilles tarifaires personnalisées

**Performance**
- Objectifs de vente par commercial
- Tableaux de bord en temps réel
- Analyses et prévisions
- Rapports exportables`,
    logo: undefined,
  },
  {
    id: "kamit-core",
    title: "KamitCore",
    time: "2025",
    link: "#",
    skills: [
      "Company Project",
      "SaaS",
      "Laravel 11",
      "Livewire 3",
      "PostgreSQL",
      "Tailwind CSS",
      "SIRH",
    ],
    status: "in-development",
    description: `Plateforme SaaS SIRH (Système d'Information des Ressources Humaines) complète pour la gestion du personnel et des projets en entreprise.

**Gestion du Personnel**
- Fiches employés complètes
- Organigramme dynamique
- Gestion des contrats de travail
- Suivi des compétences et formations

**Paie**
- Calcul des bulletins de paie (conformité sénégalaise)
- Gestion des cotisations sociales
- Déclarations IPRES, CSS
- Virements bancaires

**Congés et Temps**
- Demandes de congés en ligne
- Validation hiérarchique
- Suivi du temps de travail
- Planning des équipes

**Projets**
- Gestion des projets et tâches
- Affectation des ressources
- Suivi des temps par projet`,
    logo: undefined,
  },

  // ============== PROJETS CLIENTS LIVRÉS ==============
  {
    id: "jotali-app",
    title: "JOTALI App",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "React Native",
      "Expo",
      "TypeScript",
      "Push Notifications",
    ],
    status: "available",
    description: `Application mobile de gestion des rondes et patrouilles pour les agents de sécurité de Prosen. Disponible sur Google Play Store, bientôt sur Apple App Store.

**Fonctionnalités Agent**
- Suivi des rondes en temps réel
- Scan de QR codes aux points de contrôle
- Signalement d'incidents avec photos
- Communication instantanée avec le central
- Géolocalisation continue

**Fonctionnalités Superviseur**
- Visualisation des rondes en cours
- Alertes en temps réel
- Rapports d'activité détaillés
- Historique complet des patrouilles

Disponible sur Play Store, Apple App Store bientôt disponible.`,
    logo: undefined,
  },
  {
    id: "sensouq",
    title: "Sensouq",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel",
      "React",
      "Inertia.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Wave",
      "Orange Money",
    ],
    status: "available",
    description: `Plateforme e-commerce complète pour la vente de matériels électroniques, électroménagers, produits informatiques et cosmétiques au Sénégal. Intégration native des paiements mobiles.

**Catalogue et Commandes**
- Catalogue produits avec catégories et filtres
- Recherche avancée
- Panier d'achat intelligent
- Processus de commande simplifié
- Suivi des commandes en temps réel

**Paiements Intégrés**
- Wave (paiement mobile)
- Orange Money
- Paiement à la livraison

**Espace Client**
- Historique des commandes
- Gestion du profil
- Liste de souhaits
- Notifications`,
    logo: undefined,
  },
  {
    id: "prosen-facturation",
    title: "ProSen Facturation",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 12",
      "Livewire 3",
      "Volt",
      "Flux UI",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Application web moderne de gestion de la facturation et CRM léger pour ProSen SARL. Interface élégante construite avec les dernières technologies Laravel.

**Facturation**
- Création de factures professionnelles
- Numérotation automatique
- Gestion des acomptes et soldes
- Suivi des paiements
- Rappels automatiques

**Gestion Client**
- Base de données clients
- Historique des interactions
- Statistiques par client

**Devis**
- Création de devis détaillés
- Conversion en facture
- Suivi des acceptations

**Reporting**
- Tableau de bord chiffre d'affaires
- Analyses par période
- Export PDF et CSV`,
    logo: undefined,
  },
  {
    id: "s2ec-website",
    title: "S2EC - Site Web",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel 12",
      "Livewire 3",
      "Volt",
      "Flux UI",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Site web professionnel pour S2EC (Société d'Entrepreneuriat d'Études et de Construction), entreprise de BTP reconnue à Dakar, Sénégal. Vitrine digitale mettant en valeur l'expertise et les réalisations.

**Site Public**
- Page d'accueil dynamique avec hero, services mis en avant
- Présentation détaillée de l'entreprise (À propos)
- 4 services détaillés avec illustrations
- Galerie de réalisations avec filtres par catégorie
- Blog avec articles sur le BTP
- Formulaire de contact avec validation et rate limiting

**Administration**
- Dashboard avec statistiques
- Gestion des réalisations (CRUD avec upload images)
- Gestion des articles (éditeur HTML)
- Liste des messages de contact`,
    logo: undefined,
  },
  {
    id: "infos-ai",
    title: "Infos AI",
    time: "2025",
    link: "#",
    skills: [
      "Personal Project",
      "Laravel 12",
      "Gemini AI",
      "RSS",
      "Tailwind CSS",
      "MySQL",
    ],
    status: "available",
    description: `Agrégateur d'actualités automatisé alimenté par l'intelligence artificielle. Application Laravel qui collecte, reformule et publie automatiquement des articles d'actualité.

**Sources**
- France 24
- RFI
- Zone Afrique
- Autres flux RSS configurables

**Intelligence Artificielle**
- Reformulation du contenu via Google Gemini API
- Génération de titres accrocheurs
- Catégorisation automatique
- Détection des doublons

**Administration**
- Interface de modération des articles
- Approbation/rejet avant publication
- Planification automatique toutes les heures
- Statistiques de lecture`,
    logo: undefined,
  },
  {
    id: "kamit-website",
    title: "Kamit Digital Solutions",
    time: "2021 — present",
    link: "#",
    skills: [
      "Company Project",
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Vercel",
    ],
    status: "available",
    description: `Site web officiel de Kamit Digital Solutions, entreprise d'accompagnement des startups africaines dans leur transformation numérique. Vitrine moderne reflétant notre expertise technique.

**Contenu**
- Présentation de l'entreprise et de l'équipe
- Portfolio de projets réalisés
- Services proposés : Développement Web, Mobile, UI/UX, Conseil
- Blog technique avec articles de fond
- Formulaire de contact

**Technique**
- Next.js pour performances optimales
- Design responsive et moderne
- SEO avancé (meta, sitemap, structured data)
- Multilingue Français/Anglais
- PWA installable
- Hébergé sur Vercel`,
    logo: undefined,
  },
  {
    id: "prosen",
    title: "ProSen - Site Web",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Nuxt.js",
      "Vue.js",
      "Contentful",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Site web vitrine pour ProSen SARL, entreprise sénégalaise spécialisée dans les services de gardiennage et sécurité. Plateforme moderne avec gestion de contenu headless.

**Pages**
- Accueil avec présentation des services
- À propos et valeurs de l'entreprise
- Services détaillés (gardiennage, surveillance, protection)
- Réalisations et clients de référence
- Blog actualités sécurité
- Contact et demande de devis

**Technique**
- Nuxt.js pour SEO optimal
- Contentful CMS pour gestion du contenu
- Animations fluides AnimXYZ`,
    logo: undefined,
  },
  {
    id: "portfolio-ndiaga",
    title: "ndiagandiaye.com",
    time: "2025",
    link: "#",
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
    description: `Portfolio personnel moderne et minimaliste présentant mon parcours et mes réalisations en tant que développeur FullStack. Design élégant inspiré des meilleures pratiques UI/UX.

**Fonctionnalités**
- Design minimaliste et élégant
- Mode sombre/clair
- Blog avec articles MDX
- Pages projets détaillées
- SEO optimisé (meta, OG, structured data)
- PWA installable
- Carte de visite digitale (vCard)
- Performances optimisées (Core Web Vitals)

**Tech Stack**
- Next.js 15 avec App Router
- Tailwind CSS v4
- shadcn/ui components
- Motion pour animations
- Open Source sur GitHub`,
    logo: undefined,
  },
  {
    id: "longrich-agence-senegal",
    title: "Longrich Agence Sénégal",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel",
      "Livewire",
      "Tailwind CSS",
      "Paydunya",
      "MySQL",
    ],
    status: "available",
    description: `Plateforme e-commerce pour Longrich Agence Sénégal, distributeur officiel des produits Longrich (cosmétiques, santé, bien-être). Boutique en ligne avec paiement sécurisé.

**E-commerce**
- Catalogue produits avec catégories
- Panier d'achat
- Paiement en ligne via Paydunya
- Suivi des commandes
- Espace client

**Contenu**
- Présentation de la marque Longrich
- Opportunité d'affaires MLM
- Témoignages clients
- Blog beauté et santé`,
    logo: undefined,
  },
  {
    id: "kinsiba",
    title: "Kinsiba - Site Web",
    time: "2025",
    link: "#",
    skills: ["Client Project", "Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    status: "available",
    description: `Site web pour l'association Kinsiba, organisation caritative d'aide aux personnes atteintes de cancer au Sénégal. Plateforme de sensibilisation et de collecte de dons.

**Fonctionnalités**
- Présentation de l'association et de sa mission
- Événements et actions de sensibilisation
- Système de dons en ligne sécurisé
- Blog avec articles sur la prévention
- Témoignages de bénéficiaires
- Formulaire de contact pour bénévoles`,
    logo: undefined,
  },
  {
    id: "kinsiba-app",
    title: "Kinsiba - Application de Gestion",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel",
      "Vue.js",
      "Paydunya",
      "PayPal",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Application web de gestion interne pour l'association Kinsiba. Outil complet pour administrer les activités de l'organisation.

**Gestion**
- Dashboard avec statistiques
- Gestion des dons (Paydunya, PayPal)
- Organisation des événements
- Gestion des articles de blog
- Administration des utilisateurs
- Système de rôles et permissions
- Suivi des bénéficiaires`,
    logo: undefined,
  },
  {
    id: "kns-services",
    title: "KNS Services",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Nuxt.js",
      "Vue.js",
      "Contentful",
      "Tailwind CSS",
    ],
    status: "available",
    description: `Site web vitrine pour KNS Services, entreprise sénégalaise de services de nettoyage professionnel pour entreprises et particuliers.

**Contenu**
- Présentation des services (bureaux, résidences, après chantier)
- Catalogue de produits d'entretien
- Demande de devis en ligne
- Blog conseils propreté
- Références clients

**Technique**
- Nuxt.js pour performances
- Contentful CMS
- Design professionnel et moderne`,
    logo: undefined,
  },
  {
    id: "sentol221",
    title: "Sentol221",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "PostgreSQL",
      "Docker",
    ],
    status: "available",
    description: `Plateforme e-commerce pour Sentol221, grossiste en fruits et légumes frais au Sénégal. Solution B2B pour la distribution alimentaire.

**Fonctionnalités**
- Catalogue produits avec disponibilités
- Commandes en gros
- Gestion des livraisons
- Espace client professionnel
- Tarification par volume

**Administration**
- Gestion des stocks
- Suivi des commandes
- Facturation automatisée`,
    logo: undefined,
  },
  {
    id: "gainde",
    title: "Gainde - Gestion Sécurité",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
    ],
    status: "available",
    description: `Application web de gestion pour entreprises de sécurité privée. Solution complète pour administrer clients, agents et contrats.

**Gestion**
- Base de données clients
- Fichiers agents avec documents
- Contrats et affectations
- Plannings et rotations
- Facturation mensuelle

**Reporting**
- Rapports d'activité
- Statistiques opérationnelles
- Alertes et notifications`,
    logo: undefined,
  },
  {
    id: "noflay",
    title: "Noflay - Gestion Locative",
    time: "2024",
    link: "#",
    skills: [
      "Client Project",
      "Angular",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Material UI",
    ],
    status: "available",
    description: `Plateforme de gestion locative pour propriétaires et agences immobilières. Solution complète pour administrer un parc immobilier.

**Fonctionnalités**
- Gestion du parc immobilier
- Fiches locataires
- Quittances de loyer automatiques
- Suivi des paiements et relances
- Gestion des travaux
- Rapports financiers
- Notifications automatiques`,
    logo: undefined,
  },
  {
    id: "sidibe-et-frere",
    title: "Sidibé et Frère",
    time: "2025",
    link: "#",
    skills: ["Client Project", "Next.js", "React", "Tailwind CSS", "MongoDB"],
    status: "available",
    description: `Site e-commerce pour Sidibé et Frère, boutique d'automobiles et accessoires au Sénégal. Catalogue en ligne avec système de réservation.

**Contenu**
- Catalogue véhicules avec fiches détaillées
- Accessoires et pièces détachées
- Système de réservation en ligne
- Blog automobile
- Contact et localisation`,
    logo: undefined,
  },
  {
    id: "senegal-commerce",
    title: "Sénégal Commerce",
    time: "2025",
    link: "#",
    skills: [
      "Personal Project",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
    ],
    status: "standby",
    description: `Projet de marketplace multi-vendeurs pour le commerce en ligne au Sénégal. Plateforme ambitieuse actuellement mise en standby.

**Fonctionnalités Prévues**
- Multi-vendeurs avec boutiques personnalisées
- Catalogue dynamique
- Gestion des stocks
- Paiements Stripe et Mobile Money
- Dashboard vendeurs et admin
- API REST complète
- Interface responsive

*Projet mis en standby - Reprise prévue ultérieurement*`,
    logo: undefined,
  },
  {
    id: "digaccess",
    title: "Digaccess",
    time: "2024",
    link: "#",
    skills: ["Client Project", "React", "Node.js", "Express", "MongoDB"],
    status: "available",
    description: `Site web vitrine pour Digaccess, opérateur télécom sénégalais fournissant services internet et solutions de télécommunication.

**Contenu**
- Présentation des offres internet
- Services entreprises
- Couverture réseau
- Espace client
- Support technique`,
    logo: undefined,
  },
  {
    id: "securis",
    title: "Securis Services",
    time: "2024",
    link: "#",
    skills: ["Client Project", "React", "Node.js", "Express", "MongoDB"],
    status: "available",
    description: `Site web vitrine pour Securis Services, entreprise de sécurité privée au Sénégal. Présentation des services de gardiennage et protection.

**Services**
- Gardiennage et surveillance
- Protection rapprochée
- Sécurité événementielle
- Formation agents
- Contact et devis`,
    logo: undefined,
  },
  {
    id: "kdm",
    title: "KDM Group",
    time: "2025",
    link: "#",
    skills: ["Client Project", "WordPress", "Elementor", "WooCommerce", "WPML"],
    status: "available",
    description: `Site web e-commerce pour KDM Group, distributeur d'équipements de protection individuelle (EPI) et matériel informatique au Sénégal.

**Fonctionnalités**
- Catalogue produits WooCommerce
- Catégories EPI et IT
- Panier et commande en ligne
- Blog actualités
- Multilingue (WPML)`,
    logo: undefined,
  },
  {
    id: "portfolio-designs",
    title: "UI/UX Designs",
    time: "2020 — present",
    link: "#",
    skills: [
      "Design Project",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Prototyping",
    ],
    status: "available",
    description: `Collection de créations UI/UX réalisées pour divers clients et projets personnels. Expertise en design d'interfaces modernes et expérience utilisateur.

**Compétences**
- Identités visuelles complètes
- Wireframes et prototypes interactifs
- Design systems
- Applications mobiles iOS/Android
- Sites web responsive
- Landing pages conversion
- Logos et branding
- Tests utilisateurs`,
    logo: undefined,
  },
  {
    id: "happy-avantages-app",
    title: "Happy Avantages - Application",
    time: "2025",
    link: "#",
    skills: [
      "Client Project",
      "Laravel",
      "Vue.js",
      "Pinia",
      "Tailwind CSS",
      "MySQL",
    ],
    status: "in-development",
    description: `Application web de gestion pour Happy Avantages, programme de fidélité et avantages pour entreprises. Plateforme complète B2B.

**Fonctionnalités**
- Gestion des membres et cartes
- Réseau de partenaires
- Système de réductions
- Suivi des transactions
- Dashboard analytique
- Notifications automatiques`,
    logo: undefined,
  },
  {
    id: "happy-avantages-website",
    title: "Happy Avantages - Site Web",
    time: "2025",
    link: "#",
    skills: ["Client Project", "Laravel", "Livewire", "Tailwind CSS"],
    status: "in-development",
    description: `Site vitrine et plateforme d'achat de cartes Happy Avantages. Interface publique pour découvrir le programme et souscrire.

**Contenu**
- Présentation du programme
- Catalogue des avantages
- Achat de cartes en ligne
- Demande de partenariat
- Blog et actualités`,
    logo: undefined,
  },
  {
    id: "sunu-ride",
    title: "Sunu Ride",
    time: "2025",
    link: "#",
    skills: ["Client Project", "Nuxt.js", "Vue.js", "Tailwind CSS", "PWA"],
    status: "in-development",
    description: `Plateforme de transport et livraison au Sénégal. Application PWA pour réservation de courses et livraisons express.

**Services**
- Réservation de courses VTC
- Livraison de colis
- Suivi en temps réel
- Paiements sécurisés
- Historique des courses

**Technique**
- PWA pour expérience native
- Géolocalisation
- Notifications push`,
    logo: undefined,
  },
  {
    id: "reflet",
    title: "REFLET Network",
    time: "2024",
    link: "#",
    skills: ["Client Project", "Vue.js", "Pinia", "Directus", "Tailwind CSS"],
    status: "available",
    description: `Site web du Réseau REFLET (Réseau des Femmes Leaders autour de Thierno Amadou Ba). Plateforme de visibilité pour ce mouvement féminin engagé.

**Contenu**
- Présentation du réseau et de sa mission
- Événements et rencontres
- Programmes et actions
- Galerie photos
- Actualités et articles
- Contact et adhésion`,
    logo: undefined,
  },
  {
    id: "colorfusion",
    title: "ColorFusion",
    time: "2024",
    link: "#",
    skills: ["Open Source", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "available",
    description: `Suite d'outils gratuits et open source pour développeurs et designers. Collection d'utilitaires CSS et design.

**Outils Disponibles**
- Color Converter (HEX, RGB, HSL)
- Tailwind Gradient Generator
- Background Patterns
- Blob Composition
- Box Shadow Generator
- CSS Grid Generator
- Table Generator
- Code Visualizer

Projet open source sur GitHub.`,
    logo: undefined,
  },
  {
    id: "convertisseur-documents",
    title: "Document Converter",
    time: "2024",
    link: "#",
    skills: ["Open Source", "Next.js", "React", "TypeScript"],
    status: "available",
    description: `Convertisseur de documents en ligne gratuit et open source. Conversion rapide et sécurisée entre différents formats.

**Formats Supportés**
- Documents (PDF, DOCX, TXT)
- Images (PNG, JPG, WEBP)
- Traitement côté client (confidentialité)

Gratuit et sans inscription.`,
    logo: undefined,
  },
  {
    id: "xof-converter",
    title: "XOF Converter",
    time: "2024",
    link: "#",
    skills: ["Open Source", "Next.js", "React", "TypeScript"],
    status: "available",
    description: `Convertisseur de devises spécialisé pour le Franc CFA (XOF). Application gratuite avec taux en temps réel.

**Fonctionnalités**
- Conversion XOF vers 150+ devises
- Taux de change en temps réel
- Historique des conversions
- Devises favorites
- Interface intuitive

Gratuit et open source.`,
    logo: undefined,
  },
];
