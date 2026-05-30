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
  translations?: any[];
}
