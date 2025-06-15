export type TechStack = {
  key: string; // Unique identifier used to fetch the corresponding icon
  title: string; // Display name of the technology
  href: string; // Official website URL of the technology
  categories: string[];
  // Icon path: ./public/stacks/[key].svg
};
