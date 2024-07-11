"use client";
import React, { useState } from "react";
import UserInformation from "./UserInformation";
import Stepper from "../../components/MicroComponenets/Stepper";
import ItemsShowInSide from "./ItemsShowInSide";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthConext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { cart, totalPirce } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // if (!isAuthenticated) {
  //   return router.push("/login");
  // }
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
