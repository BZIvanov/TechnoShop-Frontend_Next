import { AppImage } from "./common";
import { Category } from "./categories";
import { Subcategory } from "./subcategories";
import { Shop } from "./shops";

export interface Product {
  _id: string;
  shop: Shop;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  category: Category;
  subcategories: Subcategory[];
  quantity: number;
  sold: number;
  images: AppImage[];
  shipping: string;
  color: string;
  brand: string;
  averageRating: number;
  reviewCount: number;
}

export interface ProductsParams {
  page?: number;
  perPage?: number;
  text?: string;
  price?: string;
  sortColumn?: string;
  shop?: string;
  shipping?: string;
  categories?: string;
  subcategories?: string;
  rating?: string;
  brands?: string;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  totalCount: number;
}

export interface ProductResponse {
  success: boolean;
  product: Product;
}

export interface UpdateProductInput {
  id: string;
  formData: FormData;
}
