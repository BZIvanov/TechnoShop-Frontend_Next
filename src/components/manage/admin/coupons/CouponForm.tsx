import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import DatePickerFieldAdapter from "@/components/form/fields/DatePickerFieldAdapter";
import { CouponFormData } from "./couponForm.schema";

interface CouponFormProps {
  form: UseFormReturn<CouponFormData>;
  createCoupon: (formData: CouponFormData) => void;
  isSubmitting?: boolean;
}

const CouponForm: FC<CouponFormProps> = ({
  form,
  createCoupon,
  isSubmitting,
}) => {
  const onSubmit: SubmitHandler<CouponFormData> = (values) => {
    createCoupon(values);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h5">Coupon Form</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box my={1}>
          <TextFieldAdapter
            control={form.control}
            name="name"
            label="Coupon Name"
          />
        </Box>

        <Box my={1}>
          <TextFieldAdapter
            control={form.control}
            name="discount"
            label="Discount %"
            type="number"
          />
        </Box>

        <Box my={1}>
          <DatePickerFieldAdapter
            control={form.control}
            name="expirationDate"
            label="Expiration Date"
            disablePast={true}
          />
        </Box>

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Create Coupon
        </Button>
      </form>
    </Box>
  );
};

export default CouponForm;
