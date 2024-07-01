import Image from "next/image";
import React from "react";
import BadgeReels from "@/public/imgs/keychain.png";
import SimpleProductComponent from "./SimpleProductComponent";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import CardHolder from "@/public/imgs/CardHolder.png";
import BadgeReels2 from "@/public/imgs/BadgeReels2.png";
import Lanyard from "@/public/imgs/Lanyard.png";
const HeroSection = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-[33%] mx-auto">
          <h2 className="text-3xl font-semibold text-primary">
            Fastside 2 PCS Retractable Badge Holder Clip On ID Card Holders
            (Black-Blue)
          </h2>
          <div className="flex gap-8 mt-4">
            <button className="btn-pri">Shop Now</button>
            <button className="btn-second">View More</button>
          </div>
        </div>
        <div className="relative inline-block">
          <Image objectFit="cover" src={BadgeReels} />
          <p className="p-4 bg-second rounded-full inline-block absolute bottom-10  left-48 text-white font-semibold">
            Only <br />
            450/-
          </p>
        </div>
      </div>
      <div className="  flex items-center justify-center mt-8">
        <button className="bg-primary text-second p-4 rounded-full  ">
          <ArrowBackRounded />
        </button>
        <div className="carousel rounded-box">
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
          <div className="carousel-item">
            <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          </div>
        </div>
        {/* <div id="sample-components" className="flex justify-center ">
          <SimpleProductComponent img={BadgeReels2} title={"Badge Reels"} />
          <SimpleProductComponent img={CardHolder} title={"Card Holder"} />
          <SimpleProductComponent img={Lanyard} title={"Lanyard"} />
        </div> */}
        <button className="bg-primary text-second p-4 rounded-full  ">
          <ArrowForwardRounded />
        </button>
      </div>
    </>
  );
};

export default HeroSection;
