import * as yup from "yup";

export const schema = yup
  .object({
    rating: yup.number().min(0).max(5).required("Rating is required"),
    comment: yup.string().min(1).max(1000),
  })
  .required();

export type ReviewFormData = yup.InferType<typeof schema>;
