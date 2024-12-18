import { type SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";

import { useForm } from "@/components/form/hooks/useForm";
import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import PasswordTextFieldAdapter from "@/components/form/fields/PasswordTextFieldAdapter";
import CheckboxAdapter from "@/components/form/fields/CheckboxAdapter";
import { schema, RegisterFormData } from "./registerForm.schema";

interface RegisterFormProps {
  registerUser: (values: RegisterFormData) => void;
  isSubmitting?: boolean;
}

const RegisterForm = ({
  registerUser,
  isSubmitting = false,
}: RegisterFormProps) => {
  const form = useForm<RegisterFormData>({
    schema,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isSeller: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (values) => {
    registerUser(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextFieldAdapter
        control={form.control}
        name="username"
        label="Username"
        icon={<FaceIcon />}
      />
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
      <PasswordTextFieldAdapter
        control={form.control}
        name="confirmPassword"
        label="Confirm Password"
      />
      <CheckboxAdapter
        control={form.control}
        name="isSeller"
        label="Register as a seller?"
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
          Reset
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
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
