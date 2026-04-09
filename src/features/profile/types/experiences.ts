export type ExperiencePositionIcon =
  | "code"
  | "design"
  | "education"
  | "business"
  | "idea";

export type ExperiencePosition = {
  id: string;
  title: string;
  titleFr?: string;
  year: string;
  yearFr?: string;
  employmentType?: string;
  employmentTypeFr?: string;
  description?: string;
  descriptionFr?: string;
  icon?: ExperiencePositionIcon;
  skills?: string[];
  skillsFr?: string[];
  expanded?: boolean;
};

export type Experience = {
  company: string;
  companyLogo?: string;
  positions: ExperiencePosition[];
  current?: boolean;
};
