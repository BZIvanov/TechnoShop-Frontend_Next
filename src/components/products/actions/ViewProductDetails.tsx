import { type FC } from "react";
import { Link } from "react-router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";

interface ViewProductDetailsProps {
  productId: string;
}

const ViewProductDetails: FC<ViewProductDetailsProps> = ({ productId }) => {
  return (
    <Button
      component={Link}
      to={`/products/${productId}`}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <PreviewIcon />
      <Typography variant="caption" sx={{ textAlign: "center" }}>
        View Detailed
      </Typography>
    </Button>
  );
};

export default ViewProductDetails;
