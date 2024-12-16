import { type FC } from "react";
import { SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";

import { useForm } from "@/components/form/hooks/useForm";
import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import PasswordTextFieldAdapter from "@/components/form/fields/PasswordTextFieldAdapter";
import { schema, LoginFormData } from "./loginForm.schema";

interface LoginFormProps {
  loginUser: (values: LoginFormData) => void;
  isSubmitting?: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ loginUser, isSubmitting = false }) => {
  const form = useForm<LoginFormData>({
    schema,
    defaultValues: { email: "", password: "12qwAS!@" },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (values) => {
    loginUser(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextFieldAdapter
        control={form.control}
        name="email"
        label="Email"
        icon={<EmailIcon />}
      />
      <PasswordTextFieldAdapter
        control={form.control}
        name="password"
        label="Password"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
        sx={{
          mt: 2,
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        fullWidth={true}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
