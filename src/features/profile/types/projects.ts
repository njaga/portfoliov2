export type Project = {
  id: string;
  title: string;
  time: string;
  link: string;
  skills: string[];
  description?: string;
  logo?: string;
  images?: string[]; // captures d'écran ou images supplémentaires
};
