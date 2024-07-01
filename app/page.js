import Image from "next/image";
import Navbar from "./components/Navbar";
import SimpleProductComponent from "./components/SimpleProductComponent";
import ProductComponent from "./components/ProductComponent";
import SaleComponenet from "./components/SaleComponenet";
import PopularProducts from "./components/PopularProducts";
import HeroSection from "./components/HeroSection";
import WhyUs from "./components/MicroComponenets/WhyUs";
import Testomonials from "./components/Testomonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className=" min-h-screen max-w-[1800px] mx-auto px-4 my-2">
      <HeroSection />
      <PopularProducts />
      <SaleComponenet />
      <WhyUs />
      {/* <Testomonials /> */}
    </main>
  );
}
