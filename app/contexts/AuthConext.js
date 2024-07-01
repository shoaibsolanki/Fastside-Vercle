"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataService from "../services/requestApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      return storedAuthData;
    } else {
      return { token: null, user: null };
    }
  });
  // console.log("auth", authData);

  const isAuthenticated = authData.data;

  const fetchProductApi = async () => {
    try {
      const response = await DataService.FetchProductApi();
      return response.data;
    } catch (error) {
      console.error("product fetch", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const productsData = await fetchProductApi();
        setProducts(productsData.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchAndSetProducts();
  }, []);
  // console.log(products);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
  }, []);

  const login = (data) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
    Cookies.set("authToken", data.token, { expires: 7 });
  };

  const logout = () => {
    console.log("Logged Out");
    setAuthData({ token: null, user: null });
    localStorage.removeItem("authData");
    Cookies.remove("authToken");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        isAuthenticated,
        login,
        logout,
        products,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
