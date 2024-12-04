import { api } from './api';
import { ShopsResponse, ShopResponse, ShopsParams } from './types/shops';

export const shopsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getShops: build.query<ShopsResponse, ShopsParams>({
        query: (params = {}) => {
          return {
            url: '/shops',
            method: 'GET',
            credentials: 'include',
            params,
          };
        },
        providesTags: () => {
          return [{ type: 'Shops' as const, id: 'PARTIAL-LIST' }];
        },
      }),
      // get shop by id for admin
      getShop: build.query<ShopResponse, string>({
        query: (id) => {
          return {
            url: `/shops/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
        providesTags: (_result, _error, payload) => [
          { type: 'Shops', id: payload },
        ],
      }),
      // get shop for the currently logged in seller
      getSellerShop: build.query<ShopResponse, void>({
        query: () => {
          return {
            url: '/shops/seller',
            method: 'GET',
            credentials: 'include',
          };
        },
        providesTags: () => {
          return [{ type: 'SellerShop' as const }];
        },
      }),
    };
  },
});

export const { useGetShopsQuery, useGetShopQuery, useGetSellerShopQuery } =
  shopsApi;
