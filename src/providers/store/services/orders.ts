import { api } from './api';
import {
  AdminOrdersResponse,
  OrdersStatsResponse,
  OrdersParams,
} from './types/orders';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getAdminOrders: build.query<AdminOrdersResponse, OrdersParams>({
        query: (params = {}) => {
          return {
            url: '/orders/admin',
            method: 'GET',
            params,
            credentials: 'include',
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.orders.map(({ _id }) => ({
                  type: 'AdminOrders' as const,
                  id: _id,
                })),
                { type: 'AdminOrders' as const, id: 'PARTIAL-LIST' },
              ]
            : [{ type: 'AdminOrders' as const, id: 'PARTIAL-LIST' }];
        },
      }),
      getBuyerOrdersStats: build.query<OrdersStatsResponse, void>({
        query: () => {
          return {
            url: '/orders/stats',
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
      getSellerOrdersStats: build.query<OrdersStatsResponse, void>({
        query: () => {
          return {
            url: '/orders/seller/stats',
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const {
  useGetAdminOrdersQuery,
  useGetBuyerOrdersStatsQuery,
  useGetSellerOrdersStatsQuery,
} = ordersApi;
