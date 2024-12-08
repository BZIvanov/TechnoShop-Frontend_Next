import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import { ShopInfoFormData } from "./shopInfoForm.schema";

interface ShopInfoFormProps {
  form: UseFormReturn<ShopInfoFormData>;
  resetForm: () => void;
  updateShopInfo: (formData: ShopInfoFormData) => void;
  isSubmitting?: boolean;
}

const ShopInfoForm: FC<ShopInfoFormProps> = ({
  form,
  resetForm,
  updateShopInfo,
  isSubmitting,
}) => {
  const onSubmit: SubmitHandler<ShopInfoFormData> = (values) => {
    updateShopInfo(values);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box my={1}>
          <TextFieldAdapter
            control={form.control}
            name="shopName"
            label="Shop name"
          />
        </Box>

        <Box my={1}>
          <TextFieldAdapter
            control={form.control}
            name="country"
            label="Country"
          />
        </Box>

        <Box my={1}>
          <TextFieldAdapter control={form.control} name="city" label="City" />
        </Box>

        <CardActions sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Update Shop Info
          </Button>
        </CardActions>
      </form>
    </Box>
  );
};

export default ShopInfoForm;
