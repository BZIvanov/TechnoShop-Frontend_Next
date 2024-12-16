import { type FC } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useResetPasswordMutation } from "@/providers/store/services/users";
import PasswordResetForm from "./PasswordResetForm";
import { PasswordResetFormData } from "./passwordResetForm.schema";

const PasswordReset: FC = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [reset, { isLoading, isSuccess }] = useResetPasswordMutation();

  const resetPassword = async (values: PasswordResetFormData) => {
    reset({
      password: values.password,
      token: token || "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login");
    }
  }, [isSuccess, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "primary.main",
        }}
      >
        Reset Your Password
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          bgcolor: "background.default",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <PasswordResetForm
          resetPassword={resetPassword}
          isSubmitting={isLoading}
        />
      </Box>
    </Box>
  );
};

export default PasswordReset;
