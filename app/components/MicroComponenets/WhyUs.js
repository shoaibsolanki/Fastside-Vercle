import React from "react";
import boxTick from "../../../public/imgs/box-tick.png";
import crown from "../../../public/imgs/crown.png";
import shield from "../../../public/imgs/shield-security.png";
import Image from "next/image";

const details = [
  {
    icon: boxTick,
    title: "Free Delivery",
    details: "on order above RS 1,000",
  },
  {
    icon: crown,
    title: "Best Quality",
    details: "best quality in low price",
  },
  {
    icon: shield,
    title: "1 year warranty",
    details: "Available warranty",
  },
];
const WhyUs = () => {
  return (
    <div className="w-full mx-auto bg-light rounded-xl p-8 flex justify-around">
      {details?.map((item) => {
        return (
          <div className="flex gap-2 items-center" key={item.index}>
            <Image src={item.icon} alt={item.title} />
            <div className="">
              <h2 className="text-2xl font-semibold text-primary">
                {item.title}
              </h2>
              <p className="text-primary text-lg font-medium">{item.details}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WhyUs;
