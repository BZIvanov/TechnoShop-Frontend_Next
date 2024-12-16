import { type FC } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useForm } from "@/components/form/hooks/useForm";
import PasswordTextFieldAdapter from "@/components/form/fields/PasswordTextFieldAdapter";
import { schema, PasswordUpdateFormData } from "./passwordUpdateForm.schema";

interface PasswordUpdateFormProps {
  updatePassword: (
    formData: PasswordUpdateFormData,
    successCb: () => void
  ) => void;
  isSubmitting: boolean;
}

const PasswordUpdateForm: FC<PasswordUpdateFormProps> = ({
  updatePassword,
  isSubmitting,
}) => {
  const form = useForm<PasswordUpdateFormData>({
    schema,
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<PasswordUpdateFormData> = async (values) => {
    const formSuccessCb = (): void => {
      form.reset();
    };

    updatePassword(values, formSuccessCb);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <PasswordTextFieldAdapter
        control={form.control}
        name="oldPassword"
        label="Old Password"
      />

      <PasswordTextFieldAdapter
        control={form.control}
        name="newPassword"
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
            width: "40%",
            backgroundColor: "grey.100",
            color: "secondary.main",
            "&:hover": {
              backgroundColor: "grey.300",
              color: "secondary.dark",
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={isSubmitting}
          sx={{
            width: "50%",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Update Password
        </Button>
      </Box>
    </form>
  );
};

export default PasswordUpdateForm;
