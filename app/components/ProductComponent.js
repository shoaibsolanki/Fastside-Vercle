"use client"
import Image from "next/image";
import React, { useState } from "react";
import { FavoriteRounded } from "@mui/icons-material";
import { BASEURL } from "../services/http-Pos";
import Rating from "./Rating";
import AddToCartButton from "./MicroComponenets/AddToCartButton";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

const ProductComponent = ({ flex_direction, data }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const {cart}=useCart()
  console.log("first",cart)
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      {data?.map((item, index) => (
        <div
          key={index}
          className={`border-[1px] p-4 border-gray-400 rounded-xl flex ${
            flex_direction === "row"
              ? "flex-row items-center h-full w-full"
              : "flex-col"
          } max-w-[400px]`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-[200px]">
          <Link href={`/product/${item.item_id}}`}>  <Image
              src={`${BASEURL.ENDPOINT_URL}item/get-image/${item && item.item_id}`}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            /></Link>
            <button className="bg-light p-2 rounded-full absolute top-2 right-2 text-red-600">
              <FavoriteRounded fontSize="medium" />
            </button>
          </div>
          <div className={`${flex_direction === "row" ? "ml-4" : "mt-4"}`}>
            {hoveredItem === index ? (
              <AddToCartButton item={item}/>
            ) : (
              <>
                <h2 className="product-title text-primary">{item.item_name}</h2>
                <p className="priceTitle">₹{item.price}</p>
                <Rating size={"sm"} />
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductComponent;
