import {
  ArrowDownward,
  FavoriteBorderRounded,
  KeyboardArrowDownRounded,
  LocalShippingOutlined,
  Person2Outlined,
  PlaceOutlined,
  ShoppingCartRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Link from "next/link";
import SeachItemMOdal from "./SeachItemMOdal";

const Navbar = ({search,setSearch,data}) => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleSearch = () => {
    if (search.trim() !== "") {
      toggleModal();
    }
  };
  return (
    <>
    <nav id="navbar" className="w-full">
      {/* upper navbar */}
      <div className="bg-lightgray text-dark p-8 flex justify-between items-center ">
        <h2 className="text-lg">Need Help? Call us: (+98) 0234 567 890</h2>
        <div className="flex justify-between gap-5 items-center text-lg">
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
      {/* Middle Navbar  */}
      <div
        id="lower-navbar"
        className="w-full bg-primary p-8 flex justify-between items-center"
      >
        <div className="flex justify-between items-center gap-8">
          <h2 className="text-[36px] font-bold text-white">
            <Link href="/">FastSide</Link>
          </h2>
          <div id="search-bar">
            <Searchbar setSearch={setSearch} search={search}  data={data} toggleModal={toggleModal} modal={modal} handleSearch={handleSearch}/>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <h2 className="flex gap-2 items-center text-white">
            <Person2Outlined className="" fontSize="large" />
            <p className="hidden xl:block text-xl">Profile</p>
          </h2>
          <h2 className="flex gap-2 items-center text-white">
            <FavoriteBorderRounded className="" fontSize="large" />{" "}
            <span className="bg-second rounded-full h-6 w-6 text-center">
              0
            </span>
            <p className="hidden xl:block text-lg">Wishlist</p>
          </h2>
          <h2 className="flex gap-2 items-center text-white">
            <ShoppingCartRounded className="" fontSize="large" />
            <span className="bg-second rounded-full h-6 w-6 text-center">
              0
            </span>
            <p className="hidden xl:block text-lg">Cart</p>
          </h2>
        </div>
      </div>
      {/* lower navbar  */}
      <div className="bg-lightgray h-16 flex gap-8 items-center px-16">
        <h2 className="bg-second text-white font-semibold h-full flex items-center px-4 text-lg">
          Browse Category <KeyboardArrowDownRounded fontSize="large" />
        </h2>
        <ul className="text-dark font-semibold h-full flex items-center px-4 text-lg gap-4">
          <li className="">
            Home <KeyboardArrowDownRounded fontSize="large" />
          </li>
          <li>
            Catelog <KeyboardArrowDownRounded fontSize="large" />
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
    
    <SeachItemMOdal data={data} toggleModal={toggleModal} modal={modal} handleSearch={handleSearch} />
    
    </>
  );
};

export default Navbar;
