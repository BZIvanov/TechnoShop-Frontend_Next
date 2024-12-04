import { api } from './api';
import {
  CategoriesResponse,
  CategoryResponse,
  UpdateCategoryInput,
} from './types/categories';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getCategories: build.query<CategoriesResponse, void>({
        query: () => {
          return {
            url: '/categories',
            method: 'GET',
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.categories.map(({ _id }) => ({
                  type: 'Categories' as const,
                  id: _id,
                })),
                { type: 'Categories' as const, id: 'LIST' },
              ]
            : [{ type: 'Categories' as const, id: 'LIST' }];
        },
      }),
      getCategory: build.query<CategoryResponse, string>({
        query: (id) => {
          return {
            url: `/categories/${id}`,
            method: 'GET',
          };
        },
        providesTags: (_result, _error, payload) => {
          return [{ type: 'Categories' as const, id: payload }];
        },
      }),
      createCategory: build.mutation<CategoryResponse, FormData>({
        query: (data) => {
          return {
            url: '/categories',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Categories' as const, id: 'LIST' }];
        },
      }),
      updateCategory: build.mutation<CategoryResponse, UpdateCategoryInput>({
        query: (data) => {
          const { id, formData } = data;

          return {
            url: `/categories/${id}`,
            method: 'PATCH',
            body: formData,
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: 'Categories', id: payload.id }];
        },
      }),
      deleteCategory: build.mutation<void, string>({
        query: (id) => {
          return {
            url: `/categories/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [
            { type: 'Categories', id: payload },
            { type: 'Subcategories', id: 'LIST' },
          ];
        },
      }),
    };
  },
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
