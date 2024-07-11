"use client";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { BASEURL } from "../services/http-Pos";
import Image from "next/image";
import Stepper from "@/app/components/MicroComponenets/Stepper";
import emptyCart from "@/public/imgs/shopping.png";
const CartItem = ({ item, removeFromCart, handleIncrease, handleDecrease }) => (
  <Box className="my-2 items-center">
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={2}>
        <Image
          src={item.image_name1 ? item.image_url : "/default-image.jpg"}
          alt={item.itemName}
          width={50}
          height={50}
          style={{ width: "50%", borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {item.itemName}
        </Typography>
        <Typography variant="body2">Color: {item.color || "N/A"}</Typography>
        <Typography variant="body2">Size: {item.UOM || "N/A"}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className="fw-bold" variant="body1">
          Rs {item.price}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => handleDecrease(item)}>
            <Remove />
          </IconButton>
          <Typography variant="body1">{item.product_qty}</Typography>
          <IconButton onClick={() => handleIncrease(item)}>
            <Add />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Typography className="fw-bold" variant="body1">
          Rs {item.price * item.product_qty}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => removeFromCart(item)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
    <Divider />
  </Box>
);

const Page = () => {
  const {
    clearCart,
    totalPrice,
    removeFromCart,
    cart,
    handleIncrease,
    handleDecrease,
  } = useCart();
  console.log(cart);

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 flex-col text-center">
        <Image height={200} width={200} alt="empty_cart" src={emptyCart} />
        <h2 className="text-4xl font-semibold text-primary">
          Your cart is empty
        </h2>
        <p className="text-2xl text-black text-medium">
          Looks like you have not added anything to your cart
        </p>
        <Link href="/" className="btn bg-primary my-4 px-16 text-white">
          Shop Now
        </Link>
      </div>
    );
  }
  return (
    <div className="my-4">
      <Stepper activeStep={0} />

      <Box className="mt-5" p={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#E6F7FF" p={2} borderRadius={2}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Product
                  </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Quantity
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Subtotal
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {cart.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  removeFromCart={removeFromCart}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              );
            })}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "center", sm: "flex-start" }}
              mt={2}
            >
              <button className="bg-second text-white font-medium text-md rounded-2xl p-4 w-full sm:w-[200px] text-center mb-2 sm:mb-0">
                <Link href="/">Continue shopping</Link>
              </button>
              <button
                className="btn btn-outline-info rounded-2xl w-full sm:w-[150px] mb-2 sm:mb-0"
                style={{
                  background: "none",
                  color: "#797979",
                  borderColor: "gray",
                }}
                variant="contained"
              >
                Update cart
              </button>
              <button
                className="btn btn-outline-info rounded-2xl w-full sm:w-[150px]"
                style={{
                  background: "none",
                  color: "#C33131",
                  borderColor: "red",
                }}
                variant="contained"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box p={2} className="flex justify-center" bgcolor="#E6F7FF">
              <Typography variant="subtitle1" fontWeight="bold">
                Cart total
              </Typography>
            </Box>
            <Box p={2} borderRadius={2}>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">Rs {totalPrice}</Typography>
              </Box>
              <TextField
                label="Enter coupon code"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{ endAdornment: <Button>Apply</Button> }}
              />
              <Select fullWidth displayEmpty defaultValue="">
                <MenuItem value="">Country</MenuItem>
              </Select>
              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="body1">Total amount</Typography>
                <Typography variant="body1">Rs {totalPrice}</Typography>
              </Box>
              <div className="flex justify-center">
                <Link href="/cart/checkout">
                  <button className="bg-second text-white font-medium text-md rounded-2xl p-2 w-full sm:w-[250px] text-center">
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Page;
