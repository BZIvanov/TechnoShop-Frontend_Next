import { FC } from "react";
import { useNavigate } from "react-router";
import { SubmitHandler } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "@/providers/store/hooks";
import {
  clearCart,
  selectCart,
} from "@/providers/store/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/providers/store/services/orders";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useForm } from "@/components/form/hooks/useForm";
import TextFieldAdapter from "@/components/form/fields/TextFieldAdapter";
import { currencyFormatter } from "@/utils/formatting";
import { schema, CheckoutFormData } from "./checkoutForm.schema";

const defaultValues = { address: "", coupon: "" };

const Checkout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const [createOrder] = useCreateOrderMutation();

  const form = useForm<CheckoutFormData>({
    schema,
    defaultValues,
  });

  const totalPrice = Object.keys(cart)
    .map((cartProductKey) => {
      const {
        product: { price },
        count,
      } = cart[cartProductKey];

      return price * count;
    })
    .reduce((a, b) => a + b, 0);

  const hasNotCartItems = Object.keys(cart).length === 0;

  const onSubmit: SubmitHandler<CheckoutFormData> = async (values) => {
    const { address, coupon } = values;
    const cartProducts = Object.keys(cart).map((cartProductId) => {
      return {
        count: cart[cartProductId].count,
        product: cart[cartProductId].product._id,
      };
    });

    const result = await createOrder({ address, coupon, cart: cartProducts });

    if (!("error" in result)) {
      form.reset();

      dispatch(clearCart());
      dispatch(
        showNotification({
          type: "success",
          message: "Order created successfully",
        })
      );

      navigate("/buyer/orders");
    }
  };

  return (
    <Paper sx={{ margin: 2, padding: 1 }}>
      <Box>
        <Typography>
          Total price: <strong>{currencyFormatter(totalPrice)}</strong>
        </Typography>
      </Box>

      <Box>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box my={1}>
            <TextFieldAdapter
              control={form.control}
              name="address"
              label="Address"
              multiline={true}
              minRows={2}
              maxRows={5}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              control={form.control}
              name="coupon"
              label="Got a coupon?"
            />
          </Box>

          <Button variant="contained" type="submit" disabled={hasNotCartItems}>
            Buy
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default Checkout;
