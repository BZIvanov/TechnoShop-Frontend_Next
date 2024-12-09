import { api } from "./api";
import {
  ProductResponse,
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
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
