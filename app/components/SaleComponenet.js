import Image from "next/image";
import React from "react";
import BadgeReels from "../../public/imgs/BadgeReels2.png";
import ImageSwitchProduct from "./ImageSwitchProduct";
import ProductComponent from "./ProductComponent";
const SaleComponenet = () => {

  
  return (
    <>
      <div className="bg-black  my-4 rounded-2xl p-4 flex justify-around items-center max-w-full mx-auto">
        <div className=" relative">
          <Image src={BadgeReels} />
          <h2 className=" absolute top-2 right-36 w-20 h-20 bg-second p-4 text-center rounded-full text-white font-semibold ">
            50% <span>Off</span>
          </h2>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="bg-second text-white font-medium text-md rounded-2xl p-4 w-[130px] text-center">
            Badge Reel
          </h2>
          <h2 className="text-4xl font-bold text-light2">Sale up to 50% off</h2>
          <p className="text-lg text-white font-bold">
            Retractable Badge Holder
          </p>
          <button className="bg-second text-white font-medium text-md rounded-2xl p-4 w-[130px] text-center">
            Shop Now
          </button>
        </div>
      </div>
      <div className="w-full mx-auto max-w-[1600px] p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 row-span-2">
          <ImageSwitchProduct />
        </div>
        <ProductComponent flex_direction="row" />
        <ProductComponent flex_direction="row" />
      </div>
    </>
  );
};

export default SaleComponenet;
