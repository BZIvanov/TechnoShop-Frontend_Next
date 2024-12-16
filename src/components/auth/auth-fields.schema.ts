import * as yup from "yup";

export const usernameSchema = yup.string().required("Username is required");

export const emailSchema = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Must be 8 or more characters long")
  .max(30, "Must be 30 or fewer characters long")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/\d/, "Must contain at least one digit")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message:
      'Must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
  });

export const getConfirmPasswordSchema = (passwordFieldName: string) => {
  return yup
    .string()
    .oneOf([yup.ref(passwordFieldName)], "Passwords must match")
    .required("Please confirm your password");
};

export const isSellerSchema = yup.boolean();
