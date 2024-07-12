"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthConext";
import DataService from "../services/requestApi";
import Swal from "sweetalert2";

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
  }, [id]);

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
          Swal.fire({
            icon: "success",
            title: "Added to Cart",
            text: `${item.item_name} has been added to your cart successfully!`,
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          console.error(
            "Error adding product to the cart on the server:",
            error
          );
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem adding the product to your cart. Please try again.",
          });
        });
    } else {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) => item.item_id === product.item_id
        );
        console.log("Added on the local storage");

        let updatedCart;
        if (existingProductIndex >= 0) {
          updatedCart = prevCart.map((item, index) => {
            if (index === existingProductIndex) {
              return { ...item, product_qty: item.product_qty + 1 };
            }
            return item;
          });
        } else {
          updatedCart = [...prevCart, { ...product, product_qty: 1 }];
        }

        const newTotalPrice = updatedCart.reduce((total, item) => {
          return total + item.price * item.product_qty;
        }, 0);

        setTotalPrice(newTotalPrice);

        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${item.item_name} has been added to your cart successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });

        return updatedCart;
      });
      setTotalItem();
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
          (item) => item.item_id !== product.item_id
        );

        const totalNewPrice = updatedCart.reduce((total, item) => {
          return total + item.price * item.product_qty;
        }, 0);

        setTotalPrice(totalNewPrice);
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
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
