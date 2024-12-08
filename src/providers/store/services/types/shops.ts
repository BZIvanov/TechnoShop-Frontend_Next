export type ShopActivityStatus = "active" | "deactive";

export type ShopPaymentStatus = "paid" | "unpaid";

export interface Shop {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  activityStatus: ShopActivityStatus;
  paymentStatus: ShopPaymentStatus;
  shopInfo?: {
    name: string;
    country?: string;
    city?: string;
  };
  createdAt: string;
}

export interface ShopsParams {
  page?: number;
  perPage?: number;
  activityStatus?: ShopActivityStatus;
}

export interface ShopsResponse {
  success: boolean;
  shops: Shop[];
  totalCount: number;
}

export interface ShopResponse {
  success: boolean;
  shop: Shop;
}

export interface UpdateShopInfoInput {
  shopName: string;
  country?: string;
  city?: string;
}

export interface UpdatePaymentInput {
  paymentStatus: ShopPaymentStatus;
}
