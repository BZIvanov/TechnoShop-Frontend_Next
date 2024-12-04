import { api } from './api';
import {
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  SubcategoriesResponse,
  GroupedSubcategoriesResponse,
  SubcategoryResponse,
} from './types/subcategories';

export const subcategoriesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getSubcategories: build.query<SubcategoriesResponse, void>({
        query: () => {
          return {
            url: '/subcategories',
            method: 'GET',
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.subcategories.map(({ _id }) => ({
                  type: 'Subcategories' as const,
                  id: _id,
                })),
                { type: 'Subcategories' as const, id: 'LIST' },
              ]
            : [{ type: 'Subcategories' as const, id: 'LIST' }];
        },
      }),
      getGroupedSubcategories: build.query<GroupedSubcategoriesResponse, void>({
        query: () => {
          return {
            url: '/subcategories/grouped',
            method: 'GET',
          };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.subcategories.map(({ _id }) => ({
                  type: 'GroupedSubcategories' as const,
                  id: _id,
                })),
                { type: 'GroupedSubcategories' as const, id: 'LIST' },
              ]
            : [{ type: 'GroupedSubcategories' as const, id: 'LIST' }];
        },
      }),
      getSubcategory: build.query<SubcategoryResponse, string>({
        query: (id) => {
          return {
            url: `/subcategories/${id}`,
            method: 'GET',
          };
        },
        providesTags: (_result, _error, payload) => {
          return [{ type: 'Subcategories' as const, id: payload }];
        },
      }),
      createSubcategory: build.mutation<
        SubcategoryResponse,
        CreateSubcategoryInput
      >({
        query: (data) => {
          return {
            url: '/subcategories',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [
            { type: 'Subcategories' as const, id: 'LIST' },
            { type: 'GroupedSubcategories' as const, id: 'LIST' },
          ];
        },
      }),
      updateSubcategory: build.mutation<
        SubcategoryResponse,
        UpdateSubcategoryInput
      >({
        query: (data) => {
          const { id, ...body } = data;

          return {
            url: `/subcategories/${id}`,
            method: 'PATCH',
            body,
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [
            { type: 'Subcategories' as const, id: payload.id },
            { type: 'GroupedSubcategories' as const, id: 'LIST' },
          ];
        },
      }),
      deleteSubcategory: build.mutation<void, string>({
        query: (id) => {
          return {
            url: `/subcategories/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [
            { type: 'Subcategories' as const, id: payload },
            { type: 'GroupedSubcategories' as const, id: 'LIST' },
          ];
        },
      }),
    };
  },
});

export const {
  useGetSubcategoriesQuery,
  useGetGroupedSubcategoriesQuery,
  useGetSubcategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoriesApi;
