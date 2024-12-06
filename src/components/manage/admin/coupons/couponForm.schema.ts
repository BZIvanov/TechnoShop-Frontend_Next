import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const schema = yup
  .object({
    name: yup.string().min(2).max(20).required("Coupon name is required"),
    discount: yup.number().min(0.01).max(99.99).required(),
    expirationDate: yup
      .date()
      .min(today, "Date cannot be in the past")
      .required(),
  })
  .required();

export type CouponFormData = yup.InferType<typeof schema>;
