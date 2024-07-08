"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FavoriteRounded } from "@mui/icons-material";
import { BASEURL } from "../services/http-Pos";
import Rating from "./Rating";
import AddToCartButton from "./MicroComponenets/AddToCartButton";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import keychain from "../../public/imgs/keychain.png";

const ProductComponent = ({ flex_direction, data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { cart } = useCart();
  const Productimage = data?.colorList[0]?.image_url;
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const selectedProduct = {
    ...data,
    colorList: [data?.colorList[0]]
  };

  return (
    <>
      <div
        className={`border-[1px] p-4 border-gray-400 rounded-xl flex ${
          flex_direction === "row"
            ? "flex-row items-center h-full w-full"
            : "flex-col"
        } max-w-[400px] relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-[200px] overflow-hidden flex items-center justify-center">
          <Link
            href={`/${data?.item_id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={Productimage ? Productimage : keychain}
              alt=""
              width={200}
              height={200}
              // layout="fill"
              // objectFit="cover"
              className="rounded-xl"
            />
          </Link>
          <button className="bg-light p-2 rounded-full absolute top-2 right-2 text-red-600">
            <FavoriteRounded fontSize="medium" />
          </button>
        </div>
        <div
          className={`${
            flex_direction === "row" ? "ml-4" : "mt-4"
          } hover:opacity-100 relative`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            <AddToCartButton item={selectedProduct} />
          </div>

          <div className={`${isHovering ? "invisible" : "visible"}`}>
            <h2 className="product-title text-primary">
              {data?.item_name.length > 40
                ? `${data?.item_name.slice(0, 40)}...`
                : data?.item_name}
            </h2>
            <p className="priceTitle">₹Rs {data?.price}/-</p>
            <Rating size={"sm"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
