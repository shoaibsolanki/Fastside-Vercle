"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImage from "../../public/imgs/keychain.png";
import Rating from "../components/Rating";
import { Check, FavoriteRounded } from "@mui/icons-material";
import ProductComponent from "../components/ProductComponent";
import DataService from "../services/dataServiceInstance";
import { BASEURL } from "../services/http-Pos";
import { useCart } from "../contexts/CartContext";

const Page = ({ params }) => {
  const { addToCart } = useCart();
  const id = params.productid;
  console.log("id", id);

  const [singleProduct, setSingleProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const fetchSingleProduct = async (id) => {
    try {
      const response = await DataService.FetchSingleProduct(id);
      const productData = response.data.data;
      setSingleProduct(productData);
      setSelectedColor(productData?.colorList[0]?.product_color);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  const handleColorClick = (color, index) => {
    setIndex(index);
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      ...singleProduct,
      colorList: [singleProduct?.colorList[index]],
      new_price: singleProduct.price,
    };

    addToCart(selectedProduct);
  };

  const images = singleProduct
    ? [
        singleProduct.image_name1,
        singleProduct.image_name2,
        singleProduct.image_name3,
      ].filter((image) => image && image !== "unavailable")
    : [];

  const addQty = () => {
    try {
      const updatedProduct = {
        ...singleProduct,
        product_qty: singleProduct.product_qty + 1,
      };
      console.log(updatedProduct);
      setSingleProduct(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  const DecQty = () => {
    try {
      if (singleProduct.product_qty > 1) {
        const updatedProduct = {
          ...singleProduct,
          product_qty: singleProduct.product_qty - 1,
        };
        console.log(updatedProduct);
        setSingleProduct(updatedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="flex flex-col items-center w-full lg:w-auto">
          <div
            className="overflow-hidden w-full sm:w-[500px] h-auto mb-4 flex items-center justify-center"
            id="main-image"
          >
            {singleProduct?.colorList &&
              singleProduct?.colorList[index]?.image_url && (
                <Image
                  alt="product image"
                  src={singleProduct?.colorList[index]?.image_url}
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-xl sm:object-contain"
                />
              )}
          </div>
        </div>

        <div className="flex flex-col max-w-full lg:max-w-lg w-full">
          {singleProduct && (
            <>
              <h2 className="text-3xl text-primary font-semibold mb-4">
                {singleProduct.item_name} ({selectedColor})
              </h2>
              <p className="text-2xl font-bold text-gray-700 mb-4">
                Rs {singleProduct.price}
              </p>
              <Rating />
              <h2 className="text-lg text-black font-semibold flex items-center my-2">
                Availability:
                <span className="text-green-500 flex items-center ml-2">
                  <Check /> In stock
                </span>
              </h2>

              <div className="flex items-center gap-4 my-4">
                Color:
                {singleProduct?.colorList?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleColorClick(el?.product_color, index)}
                      className={`w-[20px] h-[20px] cursor-pointer rounded-full border-2 border-gray-300 ${
                        el?.product_color === selectedColor
                          ? "border-black"
                          : ""
                      }`}
                      style={{
                        background: el?.product_color.toLowerCase(),
                      }}
                    ></div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 my-4">
                Quantity:
                <div className="bg-gray-200 flex items-center border">
                  <button
                    className="px-3 border-r"
                    onClick={() => {
                      DecQty();
                    }}
                  >
                    -
                  </button>
                  <p className="px-3">{singleProduct.product_qty}</p>
                  <button
                    className="px-3 border-l"
                    onClick={() => {
                      addQty();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex gap-4 my-6 flex-wrap justify-center lg:justify-start">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-500 text-white px-6 py-2  shadow hover:bg-yellow-600 transition"
                >
                  Add to cart
                </button>
              </div>
              {/* <div className="flex items-center gap-2 my-4">
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
              </div> */}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <button className="btn-second">Description</button>
        <button className="text-white border-[1px] bg-primary px-8 py-4 rounded-xl">
          Reviews
        </button>
      </div>
    </section>
  );
};

export default Page;
