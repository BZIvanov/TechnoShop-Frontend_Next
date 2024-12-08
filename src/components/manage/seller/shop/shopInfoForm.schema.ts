import * as yup from "yup";

export const schema = yup
  .object({
    shopName: yup.string().min(2).max(32).required("Shop name is required"),
    country: yup.string().min(2).max(32),
    city: yup.string().min(2).max(32),
  })
  .required();

export type ShopInfoFormData = yup.InferType<typeof schema>;
