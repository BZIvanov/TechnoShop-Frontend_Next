import { Category } from "./categories";

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  categoryId: Category | string;
}

export interface CreateSubcategoryInput {
  categoryId: string;
  name: string;
}

export interface UpdateSubcategoryInput {
  id: string;
  categoryId: string;
  name: string;
}

export interface SubcategoriesResponse {
  success: boolean;
  subcategories: Subcategory[];
  totalCount: number;
}

export interface GroupedSubcategoriesResponse {
  success: boolean;
  subcategories: {
    _id: string;
    categoryName: string;
    subcategories: Subcategory[];
  }[];
}

export interface SubcategoryResponse {
  success: boolean;
  subcategory: Subcategory;
}
