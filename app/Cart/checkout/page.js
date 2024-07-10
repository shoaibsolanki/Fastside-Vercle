"use client";
import React, { useState } from "react";
import UserInformation from "./UserInformation";
import Stepper from "../../components/MicroComponenets/Stepper";
import ItemsShowInSide from "./ItemsShowInSide";
import { useCart } from "@/app/contexts/CartContext";
const Page = () => {
  const { cart, totalPirce } = useCart();
  return (
    <div className="my-4  ">
      <Stepper activeStep={1} />
      <div className="flex  justify-center max-md:flex-col-reverse ">
        <UserInformation />
        <ItemsShowInSide items={cart} />
      </div>
    </div>
  );
};

export default Page;
