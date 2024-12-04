export interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  product: string;
  comment: string;
  rating: number;
}

export interface ReviewsParams {
  productId: string;
  page?: number;
  perPage?: number;
}

export interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
  totalCount: number;
}

export interface ReviewResponse {
  success: boolean;
  review: Review;
}

export interface ReviewsSummaryResponse {
  success: boolean;
  review: {
    averageRating: number;
    totalReviews: number;
    ratings: {
      '5': { count: number };
      '4': { count: number };
      '3': { count: number };
      '2': { count: number };
      '1': { count: number };
    };
  };
}

export interface ReviewInput {
  id: string;
  rating: number;
}
