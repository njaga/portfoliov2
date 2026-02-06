export type ProjectStatus =
  | "available"
  | "in-development"
  | "coming-soon"
  | "standby";

export type Project = {
  id: string;
  title: string;
  time: string;
  link: string;
  skills: string[];
  description?: string;
  logo?: string;
  images?: string[]; // captures d'écran ou images supplémentaires
  status?: ProjectStatus; // project status
};
