import { FC } from 'react';
import { Link } from 'react-router';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch, useSelector } from '@/providers/store/hooks';
import {
  removeFromCart,
  selectCart,
  selectIsDrawerOpen,
  setDrawerOpen,
} from '@/providers/store/features/cart/cartSlice';

const CartDrawer: FC = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  const cartIds = Object.keys(cart);

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={() => dispatch(setDrawerOpen(false))}
    >
      <Typography
        sx={{ paddingBlock: 1, textAlign: 'center', minWidth: 280 }}
        variant='body1'
      >
        {cartIds.length} products in the cart
      </Typography>

      <Divider />

      {cartIds.map((cartProductId) => {
        const { product } = cart[cartProductId];

        return (
          <Card key={product._id} sx={{ display: 'flex', margin: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: 1 }}>
                <Typography variant='body2' sx={{ padding: 0 }}>
                  {product.title}
                </Typography>
              </CardContent>

              <Box>
                <IconButton
                  size='small'
                  onClick={() => dispatch(removeFromCart(product._id))}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component='img'
              sx={{ width: 101 }}
              image={
                product.images.length > 0
                  ? product.images[0].imageUrl
                  : '/images/product.png'
              }
              alt={product.title}
            />
          </Card>
        );
      })}

      <Tooltip
        title={cartIds.length === 0 ? 'Add some items to the cart' : ''}
        placement='bottom'
      >
        <Box sx={{ margin: 1 }}>
          <Button
            variant='contained'
            component={Link}
            to='/cart'
            onClick={() => dispatch(setDrawerOpen(false))}
            size='small'
            disabled={cartIds.length === 0}
            fullWidth={true}
          >
            Go to cart
          </Button>
        </Box>
      </Tooltip>
    </Drawer>
  );
};

export default CartDrawer;
