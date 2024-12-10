import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { AppImage } from "@/providers/store/services/types/common";
import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import SelectDropdownAdapter from "@/components/form/fields/SelectDropdownAdapter";
import SelectDropdownMultichipAdapter from "@/components/form/fields/SelectDropdownMultichipAdapter";
import ImagesFieldAdapter from "@/components/form/fields/ImagesFieldAdapter";
import PreviewImageAvatar from "@/components/common/images/PreviewImageAvatar";
import { resizeImage } from "@/utils/resizeImage";
import { ProductFormData } from "./productForm.schema";

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  categories: string[] | { _id: string; name: string }[];
  categorySubcategories: { _id: string; name: string }[];
  buttonLabel: string;
  isSubmitting: boolean;
  upsertProduct: (formData: FormData) => void;
}

const ProductForm: FC<ProductFormProps> = ({
  form,
  categories = [],
  categorySubcategories = [],
  buttonLabel,
  isSubmitting,
  upsertProduct,
}) => {
  const selectedFormImages = form.watch("images") as Array<File | AppImage>;

  const removeImage = (imageToRemove: File | AppImage) => {
    let filteredImages = [];

    // if the image is instance of File is newly uploaded file, otherwise it is previosuly uploaded image
    if (imageToRemove instanceof File) {
      filteredImages = selectedFormImages.filter(
        (formImage) => (formImage as File).name !== imageToRemove.name
      );
    } else {
      filteredImages = selectedFormImages.filter(
        (formImage) =>
          (formImage as AppImage).publicId !== imageToRemove.publicId
      );
    }

    form.setValue("images", filteredImages);
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    if (values.discount) {
      formData.append("discount", values.discount.toString());
    }
    formData.append("shipping", values.shipping);
    formData.append("quantity", values.quantity.toString());
    formData.append("color", values.color);
    formData.append("brand", values.brand);
    formData.append("category", values.category);

    values.subcategories.forEach((subcategory) =>
      formData.append("subcategories", subcategory as string)
    );

    for (const image of values.images) {
      if (image instanceof File) {
        const resizedFile = await resizeImage(image, {
          maxWidth: 450,
          maxHeight: 450,
          compressFormat: "png",
          outputType: "file",
        });
        formData.append("newImages", resizedFile);
      } else {
        formData.append("existingImages", (image as AppImage).publicId);
      }
    }

    upsertProduct(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextFieldAdapter control={form.control} name="title" label="Title" />
      <TextFieldAdapter
        control={form.control}
        name="description"
        label="Description"
      />
      <TextFieldAdapter
        control={form.control}
        name="price"
        label="Price"
        type="number"
      />
      <TextFieldAdapter
        control={form.control}
        name="discount"
        label="Discount"
        type="number"
      />
      <SelectDropdownAdapter
        control={form.control}
        name="shipping"
        label="Shipping"
        options={["Yes", "No"]}
      />
      <TextFieldAdapter
        control={form.control}
        name="quantity"
        label="Quantity"
        type="number"
      />
      <TextFieldAdapter control={form.control} name="color" label="Color" />
      <TextFieldAdapter control={form.control} name="brand" label="Brand" />
      <SelectDropdownAdapter
        control={form.control}
        name="category"
        label="Category"
        options={categories}
        extendedOnChange={() => {
          // reset subcategories whenever category is changed
          form.setValue("subcategories", []);
        }}
      />
      <SelectDropdownMultichipAdapter
        control={form.control}
        name="subcategories"
        label="Subcategory"
        options={categorySubcategories}
      />

      <Divider sx={{ margin: "8px 0" }} />

      <ImagesFieldAdapter
        control={form.control}
        setError={form.setError}
        clearErrors={form.clearErrors}
        name="images"
        maxFiles={10}
        keepPreviousUploads={true}
      />

      <Stack sx={{ marginTop: 3 }} spacing={2} direction="row">
        {selectedFormImages.map((formImage, index) => {
          // for exisiting images we will have publicId, for newly uploaded files, we will use the path
          const imageKey =
            "imageUrl" in formImage ? formImage.imageUrl : `file-${index}`;

          return (
            <PreviewImageAvatar
              key={imageKey}
              image={formImage}
              removeImage={removeImage}
            />
          );
        })}
      </Stack>

      <Box mt={2} ml={1}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => {
            form.reset();
          }}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
