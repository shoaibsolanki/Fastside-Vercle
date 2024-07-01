import Image from "next/image";
import React from "react";
import keychain from "../../public/imgs/keychain.png";
import Rating from "./Rating";
import { FavoriteRounded } from "@mui/icons-material";

const ProductComponent = ({ flex_direction }) => {
  return (
    <div
      className={`border-[1px]  p-4 border-gray-400 rounded-xl flex ${
        flex_direction === "row"
          ? "flex-row items-center h-full w-full"
          : "flex-col"
      } max-w-[400px] `}
    >
      <div className="relative w-full h-[200px]">
        <Image src={keychain} layout="fill" objectFit="cover" alt="Lanyard" />
        <button className="bg-light p-2 rounded-full absolute top-2 right-2 text-red-600">
          <FavoriteRounded fontSize="medium" />
        </button>
      </div>
      <div className={`${flex_direction === "row" ? "ml-4" : "mt-4"}`}>
        <h2 className="product-title text-primary">Badge Reels</h2>
        <p className="priceTitle">Rs. 168</p>
        <Rating size={"sm"} />
      </div>
    </div>
  );
};

export default ProductComponent;
