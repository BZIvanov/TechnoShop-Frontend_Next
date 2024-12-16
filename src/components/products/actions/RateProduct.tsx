import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import { Review } from "@/providers/store/services/types/reviews";
import { MAX_RATING_VALUE } from "../constants";

interface RateProductProps {
  productId: string;
  onRateProduct: (rating: number) => void;
  review?: Review;
}

const RateProduct: FC<RateProductProps> = ({
  productId,
  onRateProduct,
  review,
}) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const [rating, setRating] = useState<number>(0);
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);

  useEffect(() => {
    // if the user previously rated the product use its rating
    if (review) {
      setRating(review.rating);
    }

    return () => setRating(0);
  }, [review]);

  return (
    <>
      <Button
        onClick={() => {
          if (user) {
            setShowRatingModal(true);
          } else {
            // if the user was trying to rate a product while not logged in, redirect him back to the product page after login
            navigate("/auth/login", {
              state: {
                customNavigateTo: `/products/${productId}`,
              },
            });
          }
        }}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {rating > 0 ? <StarIcon /> : <StarBorderOutlinedIcon />}
        <Typography variant="caption">
          {user ? "Leave rating" : "Login to leave rating"}
        </Typography>
      </Button>

      <Dialog open={showRatingModal} onClose={() => setShowRatingModal(false)}>
        <DialogTitle>Leave your rating</DialogTitle>

        <DialogContent>
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              if (newValue) {
                setRating(newValue);
              }
            }}
            precision={1}
            size="large"
            max={MAX_RATING_VALUE}
          />
        </DialogContent>

        <DialogActions>
          <Button type="button" onClick={() => setShowRatingModal(false)}>
            Cancel
          </Button>

          <Button
            type="submit"
            onClick={() => {
              setShowRatingModal(false);
              onRateProduct(rating);
            }}
          >
            Rate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RateProduct;
