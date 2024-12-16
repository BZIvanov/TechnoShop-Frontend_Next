import { type FC } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useForm } from "@/components/form/hooks/useForm";
import PasswordTextFieldAdapter from "@/components/form/fields/PasswordTextFieldAdapter";
import { schema, PasswordResetFormData } from "./passwordResetForm.schema";

interface PasswordResetFormProps {
  resetPassword: (values: PasswordResetFormData) => void;
  isSubmitting?: boolean;
}

const PasswordResetForm: FC<PasswordResetFormProps> = ({
  resetPassword,
  isSubmitting,
}) => {
  const form = useForm<PasswordResetFormData>({
    schema,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordResetFormData> = (values) => {
    resetPassword(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <PasswordTextFieldAdapter
        control={form.control}
        name="password"
        label="New Password"
      />

      <PasswordTextFieldAdapter
        control={form.control}
        name="confirmPassword"
        label="Confirm New Password"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          type="button"
          disabled={isSubmitting}
          onClick={() => form.reset()}
          sx={{
            width: "45%",
            backgroundColor: "grey.100",
            color: "secondary.main",
            "&:hover": {
              backgroundColor: "grey.300",
              color: "secondary.dark",
            },
          }}
        >
          Reset Form
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            width: "45%",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Reset Password
        </Button>
      </Box>
    </form>
  );
};

export default PasswordResetForm;
