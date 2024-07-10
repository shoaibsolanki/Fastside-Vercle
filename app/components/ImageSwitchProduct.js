import Image from "next/image";
import React from "react";
import CardHolder from "@/public/imgs/CardHolder2.png";
import Rating from "./Rating";
import AddToCartButton from "./MicroComponenets/AddToCartButton";
const ImageSwitchProduct = () => {
  return (
    <div className="gap-8 items-center border-gray-400 border-[1px] flex flex-col md:flex-row p-8 rounded-badge h-full justify-between w-full">
      <div className="w-full md:w-auto">
        <Image alt="item_image" src={CardHolder} objectFit="contain" />
      </div>
      <div className="w-full">
        <h2 className="product-title text-primary">Badge Holders</h2>
        <p className="priceTitle">Rs. 169/-</p>
        <Rating />
        <ul className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
          <li className="bg-light font-bold text-xl text-second p-8 rounded-full w-16 h-16 flex items-center justify-center">
            W(4)
          </li>
          <li className="bg-light font-bold text-xl text-second p-8 rounded-full w-16 h-16 flex items-center justify-center">
            H(4)
          </li>
          <li className="bg-light font-bold text-xl text-second p-8 rounded-full w-16 h-16 flex items-center justify-center">
            W(3)
          </li>
          <li className="bg-light font-bold text-xl text-second p-8 rounded-full w-16 h-16 flex items-center justify-center">
            H(4)
          </li>
        </ul>
        <div className="flex justify-center md:justify-start">
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default ImageSwitchProduct;
