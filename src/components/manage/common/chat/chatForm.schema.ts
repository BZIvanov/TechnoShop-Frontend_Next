import * as yup from "yup";

export const schema = yup
  .object({
    message: yup.string().min(1).max(200).required("Message is required"),
  })
  .required();

export type ChatFormData = yup.InferType<typeof schema>;
