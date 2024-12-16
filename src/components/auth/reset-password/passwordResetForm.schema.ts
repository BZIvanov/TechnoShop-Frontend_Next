import * as yup from "yup";

import {
  passwordSchema,
  getConfirmPasswordSchema,
} from "../auth-fields.schema";

export const schema = yup
  .object({
    password: passwordSchema,
    confirmPassword: getConfirmPasswordSchema("password"),
  })
  .required();

export type PasswordResetFormData = yup.InferType<typeof schema>;
