import Box from "@mui/material/Box";

import CartDrawer from "@/components/cart/CartDrawer";
import Header from "./header/Header";

const ShopLayout = () => {
  return (
    <Box>
      <Header />

      <CartDrawer />
    </Box>
  );
};

export default ShopLayout;
