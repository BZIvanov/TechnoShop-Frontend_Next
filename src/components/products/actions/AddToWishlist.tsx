import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";

interface AddToWishlistProps {
  productId: string;
  onAddToWishlist: () => void;
}

const AddToWishlist = ({ productId, onAddToWishlist }: AddToWishlistProps) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <Button
      onClick={() => {
        if (!user) {
          return navigate("/auth/login", {
            state: {
              customNavigateTo: `/products/${productId}`,
            },
          });
        }

        onAddToWishlist();
      }}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <FavoriteBorderIcon />
      <Typography variant="caption">Add to wishlist</Typography>
    </Button>
  );
};

export default AddToWishlist;
