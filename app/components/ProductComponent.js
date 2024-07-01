import Image from "next/image";
import React from "react";
import keychain from "../../public/imgs/keychain.png";
import Rating from "./Rating";
import { FavoriteRounded } from "@mui/icons-material";
import { BASEURL } from "../services/http-Pos";

const ProductComponent = ({ flex_direction, data }) => {
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
        >
          <div className="relative w-full h-[200px]">
            <Image   src={`${BASEURL.ENDPOINT_URL}item/get-image/${item && item.item_id}`}
          alt={item.name}layout="fill" objectFit="cover"  />
            <button className="bg-light p-2 rounded-full absolute top-2 right-2 text-red-600">
              <FavoriteRounded fontSize="medium" />
            </button>
          </div>
          <div className={`${flex_direction === "row" ? "ml-4" : "mt-4"}`}>
            <h2 className="product-title text-primary">   {item.item_name}</h2>
            <p className="priceTitle"> ₹{item.price}</p>
            <Rating size={"sm"} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductComponent;
