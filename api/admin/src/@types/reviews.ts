export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  isFeatured: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFormData {
  name: string;
  role: string;
  text: string;
  rating: number;
  isFeatured: boolean;
  images?: File | string | null;
}
