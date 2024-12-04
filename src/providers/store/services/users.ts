import { api } from './api';
import {
  AuthResponse,
  RegisterInput,
  LoginInput,
  UpdateMessageResponse,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from './types/users';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      register: build.mutation<AuthResponse, RegisterInput>({
        query: (data) => {
          return {
            url: '/users/register',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' as const }];
        },
      }),
      login: build.mutation<AuthResponse, LoginInput>({
        query: (data) => {
          return {
            url: '/users/login',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' as const }];
        },
      }),
      logout: build.mutation<void, void>({
        query: () => {
          return {
            url: '/users/logout',
            method: 'POST',
            credentials: 'include',
          };
        },
      }),
      getCurrentUser: build.query<AuthResponse, void>({
        query: () => {
          return {
            url: '/users/current-user',
            method: 'GET',
            credentials: 'include', // this is needed for the cookies to be set and sent to the backend
          };
        },
        providesTags: () => {
          return [{ type: 'User' as const }];
        },
      }),
      forgotPassword: build.mutation<
        UpdateMessageResponse,
        ForgotPasswordInput
      >({
        query: (data) => {
          return {
            url: '/users/forgot-password',
            method: 'POST',
            body: data,
          };
        },
      }),
      resetPassword: build.mutation<UpdateMessageResponse, ResetPasswordInput>({
        query: (data) => {
          return {
            url: '/users/reset-password',
            method: 'POST',
            body: data,
          };
        },
      }),
      updatePassword: build.mutation<
        UpdateMessageResponse,
        UpdatePasswordInput
      >({
        query: (data) => {
          return {
            url: '/users/update-password',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
      }),
      updateAvatar: build.mutation<UpdateMessageResponse, FormData>({
        query: (data) => {
          return {
            url: '/users/update-avatar',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' as const }];
        },
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = usersApi;
