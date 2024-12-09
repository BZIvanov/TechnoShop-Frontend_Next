import * as yup from "yup";

export const schema = yup
  .object({
    avatarImage: yup
      .array()
      .of(
        yup
          .mixed()
          .test(
            "is-file-or-image",
            "Each item must be a File or an Image",
            (value) => {
              if (value instanceof File) {
                return true;
              }

              if (
                value &&
                typeof value === "object" &&
                "publicId" in value &&
                "imageUrl" in value &&
                typeof value.publicId === "string" &&
                typeof value.imageUrl === "string"
              ) {
                return true;
              }

              return false;
            }
          )
      )
      .transform((value) => (value === undefined ? [] : value))
      .min(1, "An image is required")
      .max(1, "Only one image can be uploaded")
      .defined(),
  })
  .required();

export type AvatarUpdateFormData = yup.InferType<typeof schema>;
