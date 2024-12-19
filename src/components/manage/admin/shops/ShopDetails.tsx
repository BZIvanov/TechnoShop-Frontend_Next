import { useNavigate, useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useGetShopQuery } from "@/providers/store/services/shops";
import { UserRoles } from "@/providers/store/services/types/users";
import { dateFormatter } from "@/utils/formatting";

const ShopDetails = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const { data } = useGetShopQuery(shopId || "", { skip: !shopId });
  const shop = data?.shop;

  const handleBackClick = () => {
    navigate(`/${UserRoles.ADMIN}/shops`);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back to Shops
        </Button>

        <Typography variant="h5" gutterBottom={true}>
          Shop Details
        </Typography>
        {shop && (
          <Grid container={true} spacing={2} columns={1}>
            <Grid size={1}>
              <Typography variant="subtitle1">
                <strong>Shop Name:</strong> {shop.shopInfo?.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Country:</strong> {shop.shopInfo?.country}
              </Typography>
              <Typography variant="subtitle1">
                <strong>City:</strong> {shop.shopInfo?.city}
              </Typography>
            </Grid>

            <Grid size={1}>
              <Typography variant="subtitle1">
                <strong>Seller:</strong> {shop.user?.username} (
                {shop.user?.email})
              </Typography>
            </Grid>

            <Grid size={1}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Chip
                  label={`Activity: ${shop.activityStatus}`}
                  color={
                    shop.activityStatus === "active" ? "success" : "warning"
                  }
                />
                <Chip
                  label={`Payment: ${shop.paymentStatus}`}
                  color={shop.paymentStatus === "paid" ? "success" : "error"}
                />
              </Box>
            </Grid>

            <Grid size={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Created At: {dateFormatter(shop.createdAt)}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopDetails;
