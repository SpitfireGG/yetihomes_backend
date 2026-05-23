export interface PatchLanguageProps {
  id: string;
  name: string;
  code: string;
}

export interface PostLanguageProps {
  name: string;
  code: string;
}

interface Language {
  id: string;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface LanguageApiResponse {
  timestamp: string;
  success: boolean;
  status: number;
  message: string;
  data: Language[];
  errors: null | any;
}

