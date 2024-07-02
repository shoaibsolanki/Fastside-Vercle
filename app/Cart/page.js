"use client"
import React from 'react';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { BASEURL } from '../services/http-Pos';

const CartItem = ({ product, color, size, price, quantity, subtotal ,deleteItem,item_id}) => (
  <Box>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={2}>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">{product.name}</Typography>
        <Typography variant="body2">Color: {color}</Typography>
        <Typography variant="body2">Size: {size}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className='fw-bold' variant="body1">Rs {price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center">
          <IconButton><Remove /></IconButton>
          <Typography variant="body1">{quantity}</Typography>
          <IconButton><Add /></IconButton>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Typography className='fw-bold' variant="body1">Rs {subtotal}</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={()=>deleteItem(item_id)}><Delete /></IconButton>
      </Grid>
    </Grid>
    <Divider />
  </Box>
);

const Page = () => {
  const { totalPrice,deleteItem } = useCart();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Cart data:", cart);

  const cartItems = cart.map(item => ({
    product: { name: item.item_name, image: `${BASEURL.ENDPOINT_URL}item/get-image/${item && item.item_id}` },
    color: item?.colorList?.length > 0 ? item.colorList[0] : 'N/A',
    size: item.UOM || 'N/A',
    price: item.price || 0,
    quantity: item.quantity || 1,
    subtotal:  item.price|| 0,
    item_id:item.item_id
  }));

  return (
    <Box className="mt-5" p={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box bgcolor="#E6F7FF" p={2} borderRadius={2}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">Product</Typography>
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" fontWeight="bold">Price</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" fontWeight="bold">Quantity</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" fontWeight="bold">Subtotal</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Box>
          {cartItems.map((item, index) => (
            <CartItem deleteItem={deleteItem} key={index} {...item} />
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link href="/shop">
              <button className="bg-second text-white font-medium text-md rounded-2xl p-4 w-[200px] text-center">
                Continue shopping
              </button>
            </Link>
            <button className="btn btn-outline-info rounded-2xl w-[150px]" style={{background:"none", color:"#797979", borderColor:"gray"}} variant="contained">
              Update cart
            </button>
            <button className="btn btn-outline-info rounded-2xl w-[150px]" style={{background:"none", color:"#C33131", borderColor:"red"}} variant="contained">
              Clear cart
            </button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box p={2} className="flex justify-center" bgcolor="#E6F7FF">
            <Typography variant="subtitle1" fontWeight="bold">Cart total</Typography>
          </Box>
          <Box p={2} borderRadius={2}>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">Rs {totalPrice}</Typography>
            </Box>
            <TextField label="Enter coupon code" variant="outlined" fullWidth margin="normal" InputProps={{ endAdornment: <Button>Apply</Button> }} />
            <Select fullWidth displayEmpty defaultValue="">
              <MenuItem value="">County</MenuItem>
            </Select>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography variant="body1">Total amount</Typography>
              <Typography variant="body1">Rs {totalPrice}</Typography>
            </Box>
            <div className='flex justify-center'>
              <button className="bg-second text-white font-medium text-md rounded-2xl p-2 w-[250px] text-center">Proceed to checkout</button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
