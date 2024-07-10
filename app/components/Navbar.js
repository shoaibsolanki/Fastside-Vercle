"use client";
import {
  LocalShippingOutlined,
  Person2Outlined,
  PlaceOutlined,
  ShoppingCartRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthConext";
import Image from "next/image";
import DrawerForNavbarMenu from "./MicroComponenets/DrawerForNavbarMenu";
import menuButton from "@/public/svgs/Menu_lines.svg";

const Navbar = ({ search, setSearch, data }) => {
  const { cart, totalItems } = useCart();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <nav id="navbar" className="w-full">
      {/* upper navbar */}
      <div className="max-md:hidden bg-lightgray text-dark p-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-sm md:text-lg">
          Need Help? Call us: (+98) 0234 567 890
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-5 items-center text-sm md:text-lg">
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
        className="w-full bg-primary p-4 md:p-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex items-center justify-between max-md:w-full gap-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white italic">
            <Link href="/">FastSide</Link>
          </h2>
          <button
            className="hidden max-md:block min text-2xl md:text-3xl font-bold text-white"
            onClick={toggleDrawer(true)}
          >
            <Image src={menuButton} alt="menu_button" />
          </button>
          <div id="search-bar" className="max-md:hidden w-full md:w-auto">
            <Searchbar />
          </div>
        </div>
        <div className="max-md:hidden flex gap-4 items-center mt-4 md:mt-0">
          <Link href={"/profile"}>
            <h2 className="flex gap-2 items-center text-white">
              <Person2Outlined fontSize="large" />
              <p className="hidden xl:block text-sm md:text-xl">Profile</p>
            </h2>
          </Link>

          <Link href="/cart">
            <h2 className="flex gap-2 items-center text-white">
              <ShoppingCartRounded fontSize="large" />
              <span className="bg-second rounded-full h-6 w-6 text-center text-xs md:text-sm">
                {totalItems}
              </span>
              <p className="hidden xl:block text-sm md:text-lg">Cart</p>
            </h2>
          </Link>
        </div>
      </div>
      {/* lower navbar */}
      <DrawerForNavbarMenu open={open} toggleDrawer={toggleDrawer} />
    </nav>
  );
};

export default Navbar;
