import Image from "next/image";
import React from "react";
import CardHolder from "@/public/imgs/CardHolder2.png";
import Rating from "./Rating";
import AddToCartButton from "./MicroComponenets/AddToCartButton";
const ImageSwitchProduct = () => {
  return (
    <div className=" gap-8 items-center border-gray-400 border-[1px] flex p-8 rounded-badge h-full justify-between ">
      <div>
        <Image alt="item_image" src={CardHolder} />
      </div>
      <div>
        <h2 className="product-title text-primary">Badge Holders</h2>
        <p className="priceTitle">Rs. 169/-</p>
        <Rating />
        <ul className="flex gap-4 mt-4 ">
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
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ImageSwitchProduct;
