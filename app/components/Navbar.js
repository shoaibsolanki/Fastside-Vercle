"use client";
import {
  LocalShippingOutlined,
  Person2Outlined,
  PlaceOutlined,
  ShoppingCartRounded,
  WhatsApp,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthConext";
import { useRouter } from "next/navigation";
import logo from "../../public/imgs/logo.png";
import Image from "next/image";
const Navbar = ({ search, setSearch, data }) => {
  const { cart, totalItems } = useCart();
  const { authData } = useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (authData && authData.id) {
      setUserId(authData.id);
    }
  }, [authData]);

  const handleProceedToProfile = () => {
    if (userId) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav id="navbar" className="w-full">
      {/* upper navbar */}
      <div className=" bg-lightgray text-dark p-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-sm md:text-lg flex items-center gap-2">
          Chat with us:{" "}
          <a
            target="_blank"
            href="https://wa.me/+917755821175"
            className=" hover:underline flex items-center gap-2"
          >
            <WhatsApp className=" text-green-500" /> (+91) 775-582-1175
          </a>
        </h2>

        <div className=" max-md:hidden flex flex-col md:flex-row justify-between gap-5 items-center text-sm md:text-lg">
          <h2 className="flex gap-2 items-center">
            <PlaceOutlined fontSize="large" />
            Our Store
          </h2>
          <h2 className="flex gap-2 items-center">
            <LocalShippingOutlined fontSize="large" />
            Track Your Order
          </h2>
        </div>
      </div>
      {/* Middle Navbar */}
      <div
        id="lower-navbar"
        className="w-full bg-primary p-4 md:p-8 flex  min-md:flex-row flex-col justify-between items-center"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-between max-md:w-full gap-8">
            <Link href="/">
              <Image
                src={logo}
                alt="FastSide Logo"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
              />
            </Link>
          </div>
          <div className=" flex gap-4 items-center mt-4 md:mt-0">
            <button
              className="flex  items-center gap-2"
              onClick={handleProceedToProfile}
            >
              <div className="flex gap-2 items-center text-white">
                <Person2Outlined fontSize="large" />
                <p className="hidden xl:block text-sm md:text-xl">
                  {userId ? "Profile" : "Login"}
                </p>
              </div>
            </button>

            <Link href="/cart">
              <div className="flex gap-2 items-center text-white">
                <ShoppingCartRounded fontSize="large" />
                <h3 className=" flex items-center justify-center    bg-second rounded-full h-6 w-6 text-center text-xs md:text-sm">
                  {totalItems}
                </h3>
                <p className="hidden xl:block text-sm md:text-lg">Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
