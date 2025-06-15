import type { LucideIcon } from "lucide-react";
import {
    CodeIcon,
    LightbulbIcon,
    PaletteIcon,
    SmartphoneIcon,
    TrendingUpIcon,
    WrenchIcon
} from "lucide-react";

export interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    features: string[];
    icon: LucideIcon;
    price?: string;
    duration?: string;
}

export const SERVICES: Service[] = [
    {
        id: "web-development",
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies",
        shortDescription: "Modern websites & web apps",
        features: [
            "Responsive design for all devices",
            "Modern frameworks (React, Next.js, Vue)",
            "Performance optimization",
            "SEO-friendly architecture",
            "Content Management Systems",
            "E-commerce solutions"
        ],
        icon: CodeIcon,
        duration: "2-8 weeks"
    },
    {
        id: "mobile-development",
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications",
        shortDescription: "iOS & Android apps",
        features: [
            "iOS and Android development",
            "React Native & Flutter",
            "App Store deployment",
            "Push notifications",
            "Offline functionality",
            "API integrations"
        ],
        icon: SmartphoneIcon,
        duration: "4-12 weeks"
    },
    {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description: "User-centered design solutions that enhance engagement",
        shortDescription: "User experience design",
        features: [
            "User research & personas",
            "Wireframing & prototyping",
            "Visual design systems",
            "Usability testing",
            "Brand identity design",
            "Design system creation"
        ],
        icon: PaletteIcon,
        duration: "1-4 weeks"
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategies to grow your business",
        shortDescription: "SEO & digital growth",
        features: [
            "SEO optimization",
            "Social media strategy",
            "Content marketing",
            "Google Ads management",
            "Analytics & reporting",
            "Email marketing campaigns"
        ],
        icon: TrendingUpIcon,
        duration: "Ongoing"
    },
    {
        id: "tech-consulting",
        title: "Tech Consulting",
        description: "Strategic technology guidance for your business growth",
        shortDescription: "Technology strategy",
        features: [
            "Technology stack selection",
            "Architecture planning",
            "Code audits & reviews",
            "Performance optimization",
            "Team training & mentoring",
            "Digital transformation strategy"
        ],
        icon: LightbulbIcon,
        duration: "Flexible"
    },
    {
        id: "maintenance-support",
        title: "Maintenance & Support",
        description: "Ongoing support and maintenance for your digital assets",
        shortDescription: "Ongoing maintenance",
        features: [
            "Regular updates & patches",
            "Security monitoring",
            "Performance monitoring",
            "Bug fixes & improvements",
            "Backup & recovery",
            "24/7 technical support"
        ],
        icon: WrenchIcon,
        duration: "Ongoing"
    }
]; 