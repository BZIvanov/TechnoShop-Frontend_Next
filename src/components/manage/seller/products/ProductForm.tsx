import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import SelectDropdownAdapter from "@/components/form/fields/SelectDropdownAdapter";
import SelectDropdownMultichipAdapter from "@/components/form/fields/SelectDropdownMultichipAdapter";
import { ProductFormData } from "./productForm.schema";

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  categories: string[] | { _id: string; name: string }[];
  categorySubcategories: { _id: string; name: string }[];
  buttonLabel: string;
  isSubmitting: boolean;
}

const ProductForm: FC<ProductFormProps> = ({
  form,
  categories = [],
  categorySubcategories = [],
  buttonLabel,
  isSubmitting,
}) => {
  const onSubmit: SubmitHandler<ProductFormData> = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("discount", values.discount.toString());
    formData.append("shipping", values.shipping);
    formData.append("quantity", values.quantity.toString());
    formData.append("color", values.color);
    formData.append("brand", values.brand);
    formData.append("category", values.category);
    values.subcategories.forEach((subcategory) =>
      formData.append("subcategories", subcategory as string)
    );
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
