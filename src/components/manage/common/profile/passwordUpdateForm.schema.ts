import * as yup from "yup";

import {
  passwordSchema,
  getConfirmPasswordSchema,
} from "@/components/auth/auth-fields.schema";

export const schema = yup
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: getConfirmPasswordSchema("newPassword"),
  })
  .required();

export type PasswordUpdateFormData = yup.InferType<typeof schema>;
