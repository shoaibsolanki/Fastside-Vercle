import React, { useState } from "react";
import Image from "next/image";
import BadgeReel from "@/public/imgs/keychain.png";
import Lanyard from "@/public/imgs/Lanyard.png";
import { useCart } from "@/app/contexts/CartContext";

const ItemsShowInSide = ({ items }) => {
  const { totalPrice } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(25);
  const [total, setTotal] = useState(totalPrice);
  console.log(items);

  const handleApplyCoupon = () => {};

  const handleRemoveCoupon = () => {
    setDiscount(0);
  };

  return (
    <div className="my-4 w-[500px] h-full mx-auto border border-gray-300 p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>
      <div className="space-y-4">
        {items?.map((item, index) => {
          return (
            <div className="flex items-center space-x-4" key={index}>
              <Image
                src={item.image_url}
                alt="Badge Reel"
                width={50}
                height={50}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.itemName}</h3>
                <p>Color: Black</p>
              </div>
              <div>
                <p className="font-semibold">Rs {item.price}.00</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className="p-1 border rounded">-</button>
                  <span>{item.product_qty}</span>
                  <button className="p-1 border rounded">+</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between text-sm">
          <p>JenkateMW</p>
          <div className="flex items-center space-x-2 text-green-500">
            <span>-Rs 25.00</span>
            <button className="text-red-500" onClick={handleRemoveCoupon}>
              [Remove]
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>Rs {totalPrice}</p>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>Rs {totalPrice - discount}.00</p>
        </div>
      </div>
    </div>
  );
};

export default ItemsShowInSide;
