import { api } from "./api";
import {
  ProductResponse,
  ProductsParams,
  ProductsResponse,
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
                { type: "Products" as const, id: "LIST" },
              ]
            : [{ type: "Products" as const, id: "LIST" }];
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
  useDeleteProductMutation,
} = productsApi;
