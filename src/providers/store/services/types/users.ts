import { Image } from './common';

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  role: 'admin' | 'buyer' | 'seller';
  avatar?: Image;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

export interface UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateMessageResponse {
  success: boolean;
  message: string;
}
