import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my projects and work showcasing web development, mobile apps, and digital solutions.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 