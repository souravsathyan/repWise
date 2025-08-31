import { Media } from './media';

export interface Exercise {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name?: string;
  description?: any;
  difficultyLevel: "Beginner" | "Intermediate" | "Difficult";
  image?: Media | null;
  videoUrl?: string;
  isActive?: boolean;
};
