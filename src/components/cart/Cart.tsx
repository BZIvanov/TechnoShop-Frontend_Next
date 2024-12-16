import { type FC } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import {
  clearCart,
  selectCart,
} from "@/providers/store/features/cart/cartSlice";
import CartProductRow from "./CartProductRow";
import CartTotalRow from "./CartTotalRow";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const cartIds = Object.keys(cart);

  return (
    <Box>
      <Paper sx={{ m: 1, p: 1 }}>
        <Toolbar variant="dense">
          <Typography sx={{ flex: "1 1 100%" }} variant="h6">
            {cartIds.length} products selected.
          </Typography>

          <Button
            sx={{ marginRight: 1 }}
            onClick={() => dispatch(clearCart())}
            size="small"
            disabled={cartIds.length === 0}
          >
            Clear cart
          </Button>

          <Button
            variant="contained"
            disabled={cartIds.length === 0}
            onClick={() => {
              if (user) {
                navigate("/checkout");
              } else {
                // if the user was trying to buy products from cart while not logged in, redirect it back to the cart page after login
                navigate("/auth/login", {
                  state: { customNavigateTo: "/cart" },
                });
              }
            }}
            size="small"
          >
            Go to Checkout
          </Button>
        </Toolbar>

        {cartIds.length !== 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Color</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Shipping</TableCell>
                  <TableCell align="center">Total price</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartIds.map((cartProductId) => {
                  const { product, count } = cart[cartProductId];

                  return (
                    <CartProductRow
                      key={cartProductId}
                      product={product}
                      count={count}
                    />
                  );
                })}

                <CartTotalRow />
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button onClick={() => navigate("/shop")}>Go back to shop</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Cart;
