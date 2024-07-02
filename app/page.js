"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import SimpleProductComponent from "./components/SimpleProductComponent";
import ProductComponent from "./components/ProductComponent";
import SaleComponenet from "./components/SaleComponenet";
import PopularProducts from "./components/PopularProducts";
import HeroSection from "./components/HeroSection";
import WhyUs from "./components/MicroComponenets/WhyUs";
import Testomonials from "./components/Testomonials";
import { useEffect, useState } from "react";
import { BASEURL } from "./services/http-Pos";
import axios from "axios";
import { useAuth } from "./contexts/AuthConext";
export default function Home() {
  const { products } = useAuth();

  return (
    <main className=" min-h-screen ">
      {/* <Navbar setSearch={setSearch} search={search} data={data} /> */}
      <div className="  max-w-[1800px] mx-auto px-4 my-2">
        <HeroSection data={products} />
        <PopularProducts />
        <SaleComponenet />
        <WhyUs />
        {/* <Testomonials /> */}
      </div>
        
    </main>
  );
}
