import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useRegisterMutation } from "@/providers/store/services/users";
import RegisterForm from "./RegisterForm";
import { RegisterFormData } from "./registerForm.schema";

const UserRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const registerUser = (values: RegisterFormData) => {
    const { username, email, password, isSeller } = values;

    register({
      username,
      email,
      password,
      role: isSeller ? "seller" : "buyer",
    });
  };

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
        Create Your Account
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
        <RegisterForm registerUser={registerUser} isSubmitting={isLoading} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Typography variant="body2" component="span" color="primary">
              <Link to="/auth/login" style={{ color: "inherit" }}>
                Login
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserRegister;
