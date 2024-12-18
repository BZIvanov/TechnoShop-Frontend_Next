import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useDispatch } from "@/providers/store/hooks";
import { useGetCategoriesQuery } from "@/providers/store/services/categories";
import {
  useCreateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetGroupedSubcategoriesQuery,
  useUpdateSubcategoryMutation,
} from "@/providers/store/services/subcategories";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useForm } from "@/components/form/hooks/useForm";
import SubcategoryForm from "./SubcategoryForm";
import SubcategoriesList from "./SubcategoriesList";
import { schema, SubcategoryFormData } from "./subcategoryForm.schema";

export type SelectedSubcategory = {
  _id: string;
  categoryId: string;
  name: string;
};

const defaultValues = { categoryId: "", subcategoryName: "" };

const ManageSubcategory = () => {
  const dispatch = useDispatch();

  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SelectedSubcategory | null>(null);
  const handleSelectSubcategory = (selectedValue: SelectedSubcategory) => {
    setSelectedSubcategory(selectedValue);
  };

  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const { data: groupedSubcategoriesData, isLoading: isLoadingGrouped } =
    useGetGroupedSubcategoriesQuery();
  const [createSubcategory, { isLoading: isCreating }] =
    useCreateSubcategoryMutation();
  const [updateSubcategory, { isLoading: isUpdating }] =
    useUpdateSubcategoryMutation();
  const [deleteSubcategory, { isLoading: isDeleting }] =
    useDeleteSubcategoryMutation();

  const form = useForm<SubcategoryFormData>({
    schema,
    defaultValues,
  });

  const resetForm = () => {
    setSelectedSubcategory(null);
    form.reset(defaultValues);
  };

  useEffect(() => {
    if (selectedSubcategory) {
      form.reset({
        categoryId: selectedSubcategory.categoryId,
        subcategoryName: selectedSubcategory.name,
      });
    }
  }, [form, selectedSubcategory]);

  const handleUpsertSubcategory = async (
    values: SubcategoryFormData
  ): Promise<void> => {
    let result;
    if (selectedSubcategory) {
      result = await updateSubcategory({
        id: selectedSubcategory._id,
        name: values.subcategoryName,
        categoryId: values.categoryId,
      });
    } else {
      result = await createSubcategory({
        name: values.subcategoryName,
        categoryId: values.categoryId,
      });
    }

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: `Subcategory ${
            selectedSubcategory ? "updated" : "created"
          } successfully`,
        })
      );

      resetForm();
    }
  };

  const handleDeleteSubcategory = (subcategoryId: string) => {
    deleteSubcategory(subcategoryId);
    resetForm();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Subcategories</Typography>

      <SubcategoryForm
        form={form}
        resetForm={resetForm}
        categories={categoriesData?.categories || []}
        upsertSubcategory={handleUpsertSubcategory}
        isSubmitting={
          isLoading ||
          isLoadingGrouped ||
          isCreating ||
          isUpdating ||
          isDeleting
        }
        buttonLabel={
          selectedSubcategory ? "Update subcategory" : "Create subcategory"
        }
      />

      <Divider style={{ margin: "20px 0" }} />

      <SubcategoriesList
        groupedSubcategories={groupedSubcategoriesData?.subcategories || []}
        handleSelectSubcategory={handleSelectSubcategory}
        deleteSubcategory={handleDeleteSubcategory}
      />
    </Box>
  );
};

export default ManageSubcategory;
