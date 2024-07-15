import React, { Suspense, lazy } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  Divider,
  Stepper,
} from "@mui/material";
import { CurrencyRupee, Remove, Add, Delete } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Link from "next/link";

// Lazy load CartItem component
// const CartItem = lazy(() => import("./CartItem"));

const CartPage = ({
  cart,
  totalPrice,
  isAuthenticated,
  removeFromCart,
  handleIncrease,
  handleDecrease,
  clearCart,
  handleProceedToCheckout,
  loading,
}) => {
  return (
    <div className="my-4">
      <Stepper activeStep={0} />
      <Box className="mt-5" p={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className="mb-4 hidden max-md:block text-primary font-semibold">
              {loading ? (
                <Skeleton variant="text" width={100} height={40} />
              ) : (
                <>
                  subtotal{" "}
                  <span className="text-xl font-bold">
                    <CurrencyRupee fontSize="small" />
                    {totalPrice}
                  </span>
                </>
              )}
            </div>
            <div className="max-md:hidden">
              <Box bgcolor="#E6F7FF" p={2} borderRadius={2}>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {loading ? <Skeleton width={80} /> : "Product"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {loading ? <Skeleton width={50} /> : "Price"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {loading ? <Skeleton width={70} /> : "Quantity"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {loading ? <Skeleton width={70} /> : "Subtotal"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
            {loading
              ? [1, 2, 3].map((_, index) => <CartItemSkeleton key={index} />)
              : cart.map((item, index) => (
                  <Suspense fallback={<CartItemSkeleton />} key={index}>
                    <CartItem
                      item={item}
                      isAuthenticated={isAuthenticated}
                      removeFromCart={removeFromCart}
                      handleIncrease={handleIncrease}
                      handleDecrease={handleDecrease}
                    />
                  </Suspense>
                ))}
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
                {loading ? <Skeleton width={100} /> : "Cart total"}
              </Typography>
            </Box>
            <Box p={2} borderRadius={2}>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography variant="body1">
                  {loading ? <Skeleton width={70} /> : "Subtotal"}
                </Typography>
                <Typography variant="body1">
                  {loading ? <Skeleton width={50} /> : `₹${totalPrice}`}
                </Typography>
              </Box>
              {loading ? (
                <Skeleton variant="rectangular" height={56} />
              ) : (
                <TextField
                  label="Enter coupon code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ endAdornment: <Button>Apply</Button> }}
                />
              )}
              {loading ? (
                <Skeleton variant="rectangular" height={56} />
              ) : (
                <Select fullWidth displayEmpty defaultValue="">
                  <MenuItem value="">Country</MenuItem>
                </Select>
              )}
              <Box display="flex" justifyContent="space-between" my={2}>
                <Typography variant="body1">
                  {loading ? <Skeleton width={90} /> : "Total amount"}
                </Typography>
                <Typography variant="body1">
                  {loading ? <Skeleton width={50} /> : `₹${totalPrice}`}
                </Typography>
              </Box>
              <div className="flex justify-center">
                {loading ? (
                  <Skeleton variant="rectangular" height={40} width={250} />
                ) : (
                  <button
                    onClick={handleProceedToCheckout}
                    className="bg-second text-white font-medium text-md rounded-2xl p-2 w-full sm:w-[250px] text-center"
                  >
                    Proceed to checkout
                  </button>
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const CartItemSkeleton = () => {
  return (
    <Box className="my-2 items-center max-md:hidden">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={2}>
          <Skeleton variant="rectangular" width={50} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            <Skeleton width={100} />
          </Typography>
          <Typography variant="body2">
            <Skeleton width={80} />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className="fw-bold" variant="body1">
            <Skeleton width={50} />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Typography variant="body1">
              <Skeleton width={20} />
            </Typography>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Typography className="fw-bold" variant="body1">
            <Skeleton width={50} />
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Skeleton variant="circular" width={40} height={40} />
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default CartPage;
