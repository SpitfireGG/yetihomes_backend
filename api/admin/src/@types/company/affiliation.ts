export interface Affiliation {
  id: string;
  name: string;
  logoUrl: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliationFormData {
  name: string;
  logoUrl: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CompanyAffiliationTranslationDataForm {
  link?: string;
  translations: {
    language_id: string;
    title: string;
    description: string;
  }[];
}

export interface CreateAffiliationDto {
  image: File | string | null;
  link: string;
  translations: {
    language_id: string;
    title: string;
    description: string;
  }[];
}

export interface CompanyAffiliationApiResponse {
  id: string;
  link: string;
  imageUrl: string;
  translations: {
    language_id: string;
    title: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
