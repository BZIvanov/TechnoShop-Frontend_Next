import { api } from "./api";
import {
  CouponResponse,
  CouponsParams,
  CouponsResponse,
  CreateCouponInput,
} from "./types/coupons";

export const couponsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getCoupons: build.query<CouponsResponse, CouponsParams>({
        query: (params = {}) => {
          return {
            url: "/coupons",
            method: "GET",
            params,
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.coupons.map(({ _id }) => ({
                  type: "Coupons" as const,
                  id: _id,
                })),
                { type: "Coupons" as const, id: "LIST" },
              ]
            : [{ type: "Coupons" as const, id: "LIST" }];
        },
      }),
      createCoupon: build.mutation<CouponResponse, CreateCouponInput>({
        query: (data) => ({
          url: "/coupons",
          method: "POST",
          body: data,
          credentials: "include",
        }),
        invalidatesTags: () => {
          return [{ type: "Coupons" as const, id: "LIST" }];
        },
      }),
      deleteCoupon: build.mutation<void, string>({
        query: (id) => {
          return {
            url: `/coupons/${id}`,
            method: "DELETE",
            credentials: "include",
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: "Coupons" as const, id: payload }];
        },
      }),
    };
  },
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
