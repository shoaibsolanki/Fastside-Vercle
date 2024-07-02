import Image from "next/image";
import React from "react";
import productImage from "../../public/imgs/keychain.png";
import Rating from "../components/Rating";
import { Check, FavoriteRounded } from "@mui/icons-material";
import ProductComponent from "../components/ProductComponent";

const Page = () => {
  return (
    <section className="container mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="flex flex-col items-center">
          <div
            className="border-2 rounded-xl overflow-hidden w-[500] h-[500] mb-4 flex items-center justify-center"
            id="main-image"
          >
            <Image
              alt="product image"
              src={productImage}
              layout="responsive"
              width={400}
              height={500}
              objectFit="cover"
            />
          </div>
          <div className="flex gap-4" id="other-image">
            <div className="w-[240px] h-[120px] flex items-center justify-center border-2 rounded-xl overflow-hidden">
              <Image
                src={productImage}
                alt="product_images"
                layout="responsive"
                width={180}
                height={180}
                objectFit="cover"
              />
            </div>
            <div className="w-[240px] h-[120px] flex items-center justify-center border-2 rounded-xl overflow-hidden">
              <Image
                src={productImage}
                alt="product_images"
                layout="responsive"
                width={180}
                height={180}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-lg ">
          <h2 className="text-3xl text-primary font-semibold mb-4">
            Fastside 2 PCS Retractable Badge
          </h2>
          <p className="text-2xl font-bold text-gray-700 mb-4">Rs 150</p>
          <Rating />
          <h2 className="text-lg text-black font-semibold flex items-center my-2">
            Availability:
            <span className="text-green-500 flex items-center ml-2">
              <Check /> In stock
            </span>
          </h2>
          <p className="text-gray-600 mb-4">
            Hurry up! Only 34 products left in stock!
          </p>
          <div className="flex items-center gap-4 my-4">
            Color:
            <div className="w-[20px] h-[20px] bg-green-500 rounded-full border-2 border-gray-300"></div>
            <div className="w-[20px] h-[20px] bg-gray-800 rounded-full border-2 border-gray-300"></div>
          </div>
          <div className="flex items-center gap-4 my-4">
            Size:
            <div className="bg-gray-200 border px-3 py-1 rounded">4*3</div>
            <div className="bg-gray-200 border px-3 py-1 rounded">3*4</div>
            <div className="bg-gray-200 border px-3 py-1 rounded">H(4)</div>
            <div className="bg-gray-200 border px-3 py-1 rounded">W(3)</div>
          </div>
          <div className="flex items-center gap-4 my-4">
            Quantity:
            <div className="bg-gray-200 flex items-center border">
              <button className="px-3 border-r">-</button>
              <p className="px-3">1</p>
              <button className="px-3 border-l">+</button>
            </div>
          </div>
          <div className="flex gap-4 my-6">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-full shadow hover:bg-yellow-600 transition">
              Add to cart
            </button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-full shadow hover:bg-yellow-600 transition">
              Buy it now
            </button>
            <button className="text-red-500 bg-gray-200 rounded-full p-4">
              <FavoriteRounded />
            </button>
          </div>
          <div className="flex items-center gap-2 my-4">
            <p className="font-semibold">SKU:</p>
            <p>01133-9-9</p>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p className="font-semibold">Category:</p>
            <p>20% off, 49% off</p>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p className="font-semibold">Share:</p>
            <div className="flex gap-2">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-4">
        <button className=" btn-second ">Description</button>
        <button className=" text-white border-[1px] bg-primary px-8 py-4 rounded-xl ">
          Reviews
        </button>
      </div>
      <div className="w-full mx-auto my-4">
        <h2 className="text-3xl  text-primary font-semibold">
          Related Products
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
        </div>
      </div>
    </section>
  );
};

export default Page;
