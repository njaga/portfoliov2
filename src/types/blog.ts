export type PostMetadata = {
  title: string;
  subtitle?: string;
  seoTitle?: string;
  description: string;
  image?: string;
  illustration?: string;
  category?: string;
  new?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};
