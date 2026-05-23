export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  expertise: string[];
  education: string;
  thumbnail: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberFormData {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  expertise: string[];
  education: string;
  thumbnail?: File | string | null;
  image?: File | string | null;
}

export interface TeamApiResponse {
  success: boolean;
  message?: string;
  data: TeamMember;
}

export interface TeamListApiResponse {
  data: TeamMember[];
}

export interface CompanyTeamTranslationDataForm {
  slug: string;
  translations: any[];
}