import { Product } from "./products";

export interface WishlistProductsResponse {
  success: boolean;
  products: Product[];
}
