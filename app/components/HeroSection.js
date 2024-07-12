import Image from "next/image";
import React from "react";
import video from "@/public/vdo/vdo.mp4";

const HeroSection = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-[1000px] mx-auto my-4">
      <div className="max-w-full overflow-hidden ">
        <video
          autoPlay
          muted
          loop
          className="w-full h-auto rounded-2xl"
          onClick={(e) => e.preventDefault()} // Prevent video from opening in full screen
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;

{
  /* <div className="flex flex-col md:flex-row items-center justify-center gap-8">
  <div className="max-w-full md:max-w-[33%] mx-auto">
    <h2 className="text-3xl font-semibold text-primary">
      Fastside 2 PCS Retractable Badge Holder Clip On ID Card Holders
      (Black-Blue)
    </h2>
    <div className="flex gap-8 mt-4 justify-center md:justify-start">
      <button className="btn-pri">Shop Now</button>
      <button className="btn-second">View More</button>
    </div>
  </div>
  <div className="relative inline-block w-full md:w-auto">
    <Image objectFit="contain" alt="product_image" src={BadgeReels} />
    <p className="p-4 bg-second rounded-full inline-block absolute bottom-4 md:bottom-10 left-4 md:left-48 text-white font-semibold">
      Only <br />
      450/-
    </p>
  </div>
</div>
<div className="flex items-center justify-center mt-8">
  <button className="bg-primary text-second p-4 rounded-full hidden md:block">
    <ArrowBackRounded />
  </button>
  <div className="carousel rounded-box w-full">
    <div className="carousel-item">
      <SimpleProductComponent
        data={data}
        img={BadgeReels2}
        title={"Badge Reels"}
      />
    </div>
  </div>
  <button className="bg-primary text-second p-4 rounded-full hidden md:block">
    <ArrowForwardRounded />
  </button>
</div> */
}
