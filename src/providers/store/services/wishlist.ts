import { api } from "./api";
import { WishlistProductsResponse } from "./types/wishlists";

export const wishlistsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getWishlistProducts: build.query<WishlistProductsResponse, void>({
        query: () => {
          return {
            url: "/wishlists",
            method: "GET",
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "Wishlist" as const,
                  id: _id,
                })),
                { type: "Wishlist" as const, id: "LIST" },
              ]
            : [{ type: "Wishlist" as const, id: "LIST" }];
        },
      }),
      addToWishlist: build.mutation<WishlistProductsResponse, string>({
        query: (id) => {
          return {
            url: `/wishlists/${id}`,
            method: "POST",
            body: {},
            credentials: "include",
          };
        },
        invalidatesTags: () => {
          return [{ type: "Wishlist" as const, id: "LIST" }];
        },
      }),
      removeFromWishlist: build.mutation<WishlistProductsResponse, string>({
        query: (id) => {
          return {
            url: `/wishlists/${id}`,
            method: "DELETE",
            credentials: "include",
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: "Wishlist", id: payload }];
        },
      }),
    };
  },
});

export const {
  useGetWishlistProductsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistsApi;
