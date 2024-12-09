import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useDispatch } from "@/providers/store/hooks";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/providers/store/services/categories";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useForm } from "@/components/form/hooks/useForm";
import { AppImage } from "@/providers/store/services/types/common";
import CategoryForm from "./CategoryForm";
import CategoriesList from "./CategoriesList";
import { schema, CategoryFormData } from "./categoryForm.schema";

export type SelectedCategory = {
  _id: string;
  name: string;
  image: AppImage;
};

const defaultValues = { categoryName: "", categoryImage: [] };

const ManageCategory: FC = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);
  const handleSelectCategory = (selectedValue: SelectedCategory) => {
    setSelectedCategory(selectedValue);
  };

  const { data, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const form = useForm<CategoryFormData>({
    schema,
    defaultValues,
  });

  const resetForm = () => {
    setSelectedCategory(null);
    form.reset(defaultValues);
  };

  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        categoryName: selectedCategory.name,
        categoryImage: [selectedCategory.image],
      });
    }
  }, [form, selectedCategory]);

  const handleUpsertCategory = async (formData: FormData): Promise<void> => {
    let result;
    if (selectedCategory) {
      result = await updateCategory({
        id: selectedCategory._id,
        formData,
      });
    } else {
      result = await createCategory(formData);
    }

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: `Category ${
            selectedCategory ? "updated" : "created"
          } successfully`,
        })
      );

      resetForm();
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
    resetForm();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Categories</Typography>

      <CategoryForm
        form={form}
        resetForm={resetForm}
        upsertCategory={handleUpsertCategory}
        isSubmitting={isLoading || isCreating || isUpdating || isDeleting}
        buttonLabel={selectedCategory ? "Update category" : "Create category"}
      />

      <Divider style={{ margin: "20px 0" }} />

      <CategoriesList
        categories={data?.categories || []}
        selectCategory={handleSelectCategory}
        deleteCategory={handleDeleteCategory}
      />
    </Box>
  );
};

export default ManageCategory;
