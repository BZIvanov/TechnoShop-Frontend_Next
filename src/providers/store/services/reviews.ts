import { api } from "./api";
import {
  ReviewInput,
  ReviewResponse,
  ReviewsParams,
  ReviewsResponse,
  ReviewsSummaryResponse,
} from "./types/reviews";

export const reviewsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getProductReviews: build.query<ReviewsResponse, ReviewsParams>({
        query: (data) => {
          const { productId, ...rest } = data;

          return {
            url: `/reviews/${productId}`,
            method: "GET",
            params: rest,
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.reviews.map(({ _id }) => ({
                  type: "Reviews" as const,
                  id: _id,
                })),
                { type: "Reviews" as const, id: "PARTIAL-LIST" },
              ]
            : [{ type: "Reviews" as const, id: "PARTIAL-LIST" }];
        },
      }),
      getMyProductReview: build.query<ReviewResponse, string>({
        query: (productId) => {
          return {
            url: `/reviews/${productId}/my-review`,
            method: "GET",
            credentials: "include",
          };
        },
        providesTags: (_result, _error, payload) => {
          return [{ type: "Reviews" as const, id: payload }];
        },
      }),
      reviewProduct: build.mutation<ReviewResponse, ReviewInput>({
        query: (data) => {
          const { id, ...body } = data;

          return {
            url: `/reviews/${id}`,
            method: "POST",
            body,
            credentials: "include",
          };
        },
        invalidatesTags: (result) => {
          return result
            ? [
                { type: "Reviews" as const, id: result.review._id },
                { type: "Reviews" as const, id: "PARTIAL-LIST" },
                { type: "ReviewsSummary" as const },
                { type: "Products" as const, id: result.review.product },
              ]
            : [
                { type: "Reviews" as const, id: "PARTIAL-LIST" },
                { type: "ReviewsSummary" as const },
              ];
        },
      }),
      getProductReviewsSummary: build.query<ReviewsSummaryResponse, string>({
        query: (productId) => {
          return {
            url: `/reviews/${productId}/summary`,
            method: "GET",
          };
        },
        providesTags: () => {
          return [{ type: "ReviewsSummary" }];
        },
      }),
    };
  },
});

export const {
  useGetProductReviewsQuery,
  useGetMyProductReviewQuery,
  useReviewProductMutation,
  useGetProductReviewsSummaryQuery,
} = reviewsApi;
