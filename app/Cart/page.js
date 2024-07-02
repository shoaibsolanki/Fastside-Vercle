import React from 'react';
import { Box, Button, Divider, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const CartItem = ({ product, color, size, price, quantity, subtotal }) => (
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
        <IconButton><Delete /></IconButton>
      </Grid>
    </Grid>
    <Divider />
  </Box>
);

const page = () => {
  const cartItems = [
    { product: { name: 'Badge Reels', image: 'https://via.placeholder.com/50' }, color: 'Blue', size: 30, price: 150, quantity: 1, subtotal: 140 },
    { product: { name: 'Badge Holders', image: 'https://via.placeholder.com/50' }, color: 'Black', size: 30, price: 130, quantity: 1, subtotal: 130 }
  ];

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
            <CartItem key={index} {...item} />
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
          <button className="bg-second text-white font-medium text-md rounded-2xl p-4 w-[200px] text-center">
          Continue shopping</button>
            <Button className='rounded-2xl' style={{background:"none", color:"#797979", borderColor:"gray"}} variant="contained" >Update cart</Button>
            <Button className='rounded-2xl' style={{background:"none", color:"#C33131", borderColor:"red"}} variant="contained" >Clear cart</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="#E6F7FF" p={2} borderRadius={2}>
            <Typography variant="subtitle1" fontWeight="bold">Cart total</Typography>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">Rs 270</Typography>
            </Box>
            <TextField label="Enter coupon code" variant="outlined" fullWidth margin="normal" InputProps={{ endAdornment: <Button>Apply</Button> }} />
            <Select fullWidth displayEmpty defaultValue="">
              <MenuItem value="">County</MenuItem>
            </Select>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography variant="body1">Total amount</Typography>
              <Typography variant="body1">Rs 270</Typography>
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

export default page;
