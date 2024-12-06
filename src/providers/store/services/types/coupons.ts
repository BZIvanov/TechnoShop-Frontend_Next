export interface Coupon {
  _id: string;
  name: string;
  discount: number;
  expirationDate: string;
  createdAt: string;
}

export interface CreateCouponInput {
  name: string;
  discount: number;
  expirationDate: Date;
}

export interface CouponsParams {
  page?: number;
  perPage?: number;
}

export interface CouponsResponse {
  success: boolean;
  coupons: Coupon[];
  totalCount: number;
}

export interface CouponResponse {
  success: boolean;
  coupon: Coupon;
  message?: string;
}
