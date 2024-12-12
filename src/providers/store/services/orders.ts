import { api } from "./api";
import {
  AdminOrdersResponse,
  BuyerOrdersResponse,
  OrdersStatsResponse,
  OrdersParams,
  SellerOrdersResponse,
  UpdateOrderDeliveryStatusResponse,
  UpdateOrderDeliveryStatusInput,
  CreateOrderInput,
  BuyerOrderResponse,
} from "./types/orders";

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getBuyerOrders: build.query<BuyerOrdersResponse, OrdersParams>({
        query: (params = {}) => {
          return {
            url: "/orders",
            method: "GET",
            params,
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.orders.map(({ _id }) => ({
                  type: "BuyerOrders" as const,
                  id: _id,
                })),
                { type: "BuyerOrders" as const, id: "PARTIAL-LIST" },
              ]
            : [{ type: "BuyerOrders" as const, id: "PARTIAL-LIST" }];
        },
      }),
      getAdminOrders: build.query<AdminOrdersResponse, OrdersParams>({
        query: (params = {}) => {
          return {
            url: "/orders/admin",
            method: "GET",
            params,
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.orders.map(({ _id }) => ({
                  type: "AdminOrders" as const,
                  id: _id,
                })),
                { type: "AdminOrders" as const, id: "PARTIAL-LIST" },
              ]
            : [{ type: "AdminOrders" as const, id: "PARTIAL-LIST" }];
        },
      }),
      getSellerOrders: build.query<SellerOrdersResponse, OrdersParams>({
        query: (params = {}) => {
          return {
            url: "/orders/seller",
            method: "GET",
            params,
            credentials: "include",
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.orders.map(({ _id }) => ({
                  type: "SellerOrders" as const,
                  id: _id,
                })),
                { type: "SellerOrders" as const, id: "PARTIAL-LIST" },
              ]
            : [{ type: "SellerOrders" as const, id: "PARTIAL-LIST" }];
        },
      }),
      createOrder: build.mutation<BuyerOrderResponse, CreateOrderInput>({
        query: (data) => ({
          url: "/orders",
          method: "POST",
          body: data,
          credentials: "include",
        }),
        invalidatesTags: () => {
          return [{ type: "BuyerOrders", id: "PARTIAL-LIST" }];
        },
      }),
      updateOrderDeliveryStatus: build.mutation<
        UpdateOrderDeliveryStatusResponse,
        UpdateOrderDeliveryStatusInput
      >({
        query: (data) => {
          const { id, deliveryStatus } = data;

          return {
            url: `/orders/seller/${id}`,
            method: "PATCH",
            body: { deliveryStatus },
            credentials: "include",
          };
        },
        invalidatesTags: () => {
          return [{ type: "SellerOrders", id: "PARTIAL-LIST" }];
        },
      }),
      getBuyerOrdersStats: build.query<OrdersStatsResponse, void>({
        query: () => {
          return {
            url: "/orders/stats",
            method: "GET",
            credentials: "include",
          };
        },
      }),
      getSellerOrdersStats: build.query<OrdersStatsResponse, void>({
        query: () => {
          return {
            url: "/orders/seller/stats",
            method: "GET",
            credentials: "include",
          };
        },
      }),
    };
  },
});

export const {
  useGetBuyerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetSellerOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderDeliveryStatusMutation,
  useGetBuyerOrdersStatsQuery,
  useGetSellerOrdersStatsQuery,
} = ordersApi;
