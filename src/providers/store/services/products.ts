import { api } from "./api";
import {
  ProductResponse,
  ProductsBrandsResponse,
  ProductsParams,
  ProductsResponse,
  UpdateProductInput,
} from "./types/products";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getProducts: build.query<ProductsResponse, ProductsParams>({
        query: (params = {}) => {
          return {
            url: "/products",
            method: "GET",
            params,
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "Products" as const,
                  id: _id,
                })),
                { type: "Products" as const, id: "PARTIAL-LIST" },
              ]
            : [{ type: "Products" as const, id: "PARTIAL-LIST" }];
        },
      }),
      getSimilarProducts: build.query<ProductsResponse, string>({
        query: (id) => {
          return {
            url: `/products/${id}/similar`,
            method: "GET",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "SimilarProducts" as const,
                  id: _id,
                })),
                { type: "SimilarProducts" as const, id: "LIST" },
              ]
            : [{ type: "SimilarProducts" as const, id: "LIST" }];
        },
      }),
      getProduct: build.query<ProductResponse, string>({
        query: (id) => ({
          url: `/products/${id}`,
          method: "GET",
        }),
        providesTags: (_result, _error, payload) => {
          return [{ type: "Products" as const, id: payload }];
        },
      }),
      createProduct: build.mutation<ProductResponse, FormData>({
        query: (data) => {
          return {
            url: "/products",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
        invalidatesTags: () => {
          return [{ type: "Products" as const, id: "PARTIAL-LIST" }];
        },
      }),
      updateProduct: build.mutation<ProductResponse, UpdateProductInput>({
        query: (data) => {
          const { id, formData } = data;

          return {
            url: `/products/${id}`,
            method: "PATCH",
            body: formData,
            credentials: "include",
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: "Products" as const, id: payload.id }];
        },
      }),
      deleteProduct: build.mutation<void, string>({
        query(id) {
          return {
            url: `/products/${id}`,
            method: "DELETE",
            credentials: "include",
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: "Products" as const, id: payload }];
        },
      }),
      getProductsBrands: build.query<ProductsBrandsResponse, void>({
        query: () => {
          return {
            url: `/products/brands`,
            method: "GET",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.brands.map((brand) => ({
                  type: "ProductsBrands" as const,
                  id: brand,
                })),
                { type: "ProductsBrands" as const, id: "LIST" },
              ]
            : [{ type: "ProductsBrands" as const, id: "LIST" }];
        },
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetSimilarProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsBrandsQuery,
} = productsApi;
