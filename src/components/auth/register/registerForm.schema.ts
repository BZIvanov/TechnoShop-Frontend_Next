import * as yup from 'yup';

import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  getConfirmPasswordSchema,
  isSellerSchema,
} from '../auth-fields.schema';

export const schema = yup
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: getConfirmPasswordSchema('password'),
    isSeller: isSellerSchema,
  })
  .required();

export type RegisterFormData = yup.InferType<typeof schema>;
