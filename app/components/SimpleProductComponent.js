import Image from "next/image";
import React from "react";
import lanyard from "../../public/imgs/lanyard.png";
const SimpleProductComponent = ({ title, data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <div
          key={index}
          className="m-2 rounded-xl border-[1px] border-dark inline-flex  py-4 px-6 items-center gap-12 hover:bg-lightgray shadow-lg "
        >
          <div>
            <Image alt="image" height={100} width={100} src={lanyard} />
          </div>
          <div className="text-center">
            <h1 className=" text-primary font-semibold text-2xl">
              {item.item_name}
            </h1>
            <p className=" text-lg text-primary font-medium">
              {item.colorList.length}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SimpleProductComponent;
