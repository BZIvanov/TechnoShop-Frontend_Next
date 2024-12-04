import { Coupon } from './coupons';
import { Product } from './products';
import { Shop } from './shops';

export type DeliveryStatus = 'pending' | 'delivered' | 'canceled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface BuyerOrder {
  _id: string;
  buyer: {
    _id: string;
    username: string;
  };
  coupon?: {
    name: string;
    discount: number;
  };
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  deliveryAddress: string;
  totalPrice: number;
  createdAt: string;
}

interface AdminOrderItemField {
  orderItems: {
    _id: string;
    createdAt: string;
    deliveryAddress: string;
    deliveryStatus: DeliveryStatus;
    paymentStatus: PaymentStatus;
    totalPrice: number;
    shop: Shop;
    products: {
      count: number;
      product: Product;
    }[];
  }[];
  couponDetails: Coupon[];
}

export interface AdminOrder extends BuyerOrder {
  orderItems: AdminOrderItemField['orderItems'];
  couponDetails: AdminOrderItemField['couponDetails'];
}

export interface AdminOrdersResponse {
  success: boolean;
  orders: AdminOrder[];
  totalCount: number;
}

export interface OrdersParams {
  page?: number;
  perPage?: number;
  deliveryStatus?: string;
}

export interface OrdersStatsResponse {
  success: boolean;
  totalOrders: number;
  pendingOrders: number;
  canceledOrders: number;
  totalPrice: number;
}
