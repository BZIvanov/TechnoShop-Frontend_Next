import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password should have at least 8 characters' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password should have at least 8 characters' }),
  name: z.string().min(1, { message: 'Name is required' }),
});
