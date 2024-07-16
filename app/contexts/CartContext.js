"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthConext";
import DataService from "../services/requestApi";
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Snackbar } from "@mui/material";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { authData } = useAuth();
  const { id, saasId, storeId } = authData;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const showAlert = (message, severity) => {
    setAlert({ show: true, message, severity });
    setTimeout(
      () => setAlert({ show: false, message: "", severity: "" }),
      2000
    ); // Hide the alert after 2 seconds
  };

  let subTotal;
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (id) {
      getCartItems(id);
      migrateLocalStorageCartToServerCart(id);
    } else {
      setTotalItem();
    }
  }, [id,getCartItems,migrateLocalStorageCartToServerCart,setTotalItem]);

  const getCartItems = async (userId) => {
    try {
      const response = await DataService.GetCartItems(saasId, storeId, userId);
      const fetchedCart = response?.data?.data?.products;
      setCart(fetchedCart);
      subTotal = fetchedCart.reduce((total, product) => {
        return total + product.price;
      }, 0);
      setTotalPrice(subTotal);
      setTotalItems(fetchedCart.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const setTotalItem = () => {
    setTotalItems(cart.length);
  };

  const migrateLocalStorageCartToServerCart = async (userId) => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const localStorageCart = JSON.parse(storedCart);
        for (const item of localStorageCart) {
          await AddProductInTheCart(item, userId);
        }
        localStorage.removeItem("cart");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !id) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const AddProductInTheCart = async (product, userId = id) => {
    try {
      const response = await DataService.AddItemsToCart(
        product,
        saasId,
        storeId,
        userId
      );
      getCartItems(userId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemid) => {
    try {
      await DataService.DeleteItemsFromCart(saasId, storeId, id, itemid);
      console.log("itemidd", itemid);
      getCartItems(id);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.item_id === product.item_id)) {
        return prevWishlist.filter((item) => item.item_id !== product.item_id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.item_id === productId);
  };

  const addToCart = (product) => {
    const item = product;

    if (id) {
      AddProductInTheCart(item)
        .then(() => {
          showAlert("Item Added to Cart", "success");
        })
        .catch((error) => {
          console.error(
            "Error adding product to the cart on the server:",
            error
          );
          showAlert(
            "There was a problem adding the product to your cart. Please try again.",
            "error"
          );
        });
    } else {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) =>
            item.item_id === product.item_id &&
            item?.colorList[0].product_color ===
              product?.colorList[0].product_color
        );
        console.log("Added on the local storage");

        let updatedCart;
        if (existingProductIndex >= 0) {
          updatedCart = prevCart.map((item, index) => {
            if (index === existingProductIndex) {
              return {
                ...item,
                product_qty: item.product_qty + 1,
                id: Math.random() * 100,
              };
            }
            return item;
          });
          setTotalItems(updatedCart.length);
        } else {
          updatedCart = [
            ...prevCart,
            { ...product, product_qty: 1, id: Math.random() * 100 },
          ];
          console.log("updetedcart", updatedCart);
          setTotalItems(updatedCart.length);
        }

        const newTotalPrice = updatedCart.reduce((total, item) => {
          return total + item.price * item.product_qty;
        }, 0);

        setTotalPrice(newTotalPrice);

        showAlert("Item Added to Cart", "success");

        return updatedCart;
      });
    }
  };

  const removeFromCart = (product) => {
    console.log("product for remove", product);
    if (id) {
      deleteItem(product.id);
    } else {
      console.log("item deleted from local storage");
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(
          (item) =>
            item.item_id !== product.item_id ||
            item?.colorList[0].product_color !==
              product?.colorList[0].product_color
        );

        const totalNewPrice = updatedCart.reduce((total, item) => {
          return total + item.price * item.product_qty;
        }, 0);

        setTotalPrice(totalNewPrice);
        setTotalItems(updatedCart.length);
        return updatedCart;
      });
    }
  };

  const clearCartFromServer = async (UserId) => {
    try {
      const response = await DataService.DeleteAllItemsFromCart(
        saasId,
        storeId,
        UserId
      );
      getCartItems(UserId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const clearCart = () => {
    if (id) {
      clearCartFromServer(id);
    }
    setCart([]);
    setTotalPrice(0);
    setTotalItems(0);
  };

  const handleIncrease = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, product_qty: cartItem.product_qty + 1 };
        }
        return cartItem;
      });

      const newTotalPrice = updatedCart.reduce((total, item) => {
        return total + item.price * item.product_qty;
      }, 0);

      setTotalPrice(newTotalPrice);

      return updatedCart;
    });
  };

  const handleDecrease = (item) => {
    if (item.product_qty < 2) {
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, product_qty: cartItem.product_qty - 1 };
        }
        return cartItem;
      });

      const newTotalPrice = updatedCart.reduce((total, item) => {
        return total + item.price * item.product_qty;
      }, 0);

      setTotalPrice(newTotalPrice);

      return updatedCart;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <CartContext.Provider
      value={{
        totalPrice,
        cart,
        wishlist,
        subTotal,
        totalItems,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        clearWishlist,
        addToWishlist,
        isInWishlist,
        handleIncrease,
        handleDecrease,
        deleteItem,
      }}
    >
      {children}
      {alert.show && (
        <Snackbar
          open={alert.show}
          autoHideDuration={2000}
          onClose={() => setAlert({ show: false, message: "", severity: "" })}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={alert.severity}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
