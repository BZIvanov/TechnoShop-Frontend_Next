import { Image } from './common';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: Image;
}

export interface UpdateCategoryInput {
  id: string;
  formData: FormData;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
  totalCount: number;
}

export interface CategoryResponse {
  success: boolean;
  category: Category;
  message?: string;
}
