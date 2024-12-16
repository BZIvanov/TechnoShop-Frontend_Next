import { type FC } from "react";
import { Link } from "react-router";
import { Box, Button, Typography } from "@mui/material";

const NotFound: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey.100"
      textAlign="center"
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={2}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
