"use client";
import Image from "next/image";
import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import Address from "./Address";
import Account from "./Account";

const Page = () => {
  const [activeTab, setActiveTab] = useState("account");

  let content;
  switch (activeTab) {
    case "account":
      content = <Account />;
      break;
    case "order":
      content = <OrderHistory />;
      break;
    case "address":
      content = <Address />;
      break;
  }

  return (
    <div className="w-full relative bg-white1 flex flex-col items-center justify-start py-20 px-5 box-border gap-[80px] leading-[normal] tracking-[normal] text-left text-35xl text-black font-headline-3 mq750:gap-[20px] mq1125:gap-[40px]">
      <div className="w-[1120px] flex flex-row items-start justify-center max-w-full">
        <h1 className="text-4xl m-0 relative text-inherit tracking-[-1px] leading-[58px] font-medium font-inherit mq450:text-[32px] mq450:leading-[35px] mq1050:text-[43px] mq1050:leading-[46px]">
          My Account
        </h1>
      </div>
      <main className="w-[1120px] flex flex-row items-start justify-start gap-[7px] max-w-full text-left text-xl text-black font-hairline-2">
        <div className="w-[262px] bg-[#F3F5F7] rounded-lg bg-neutral-02-100 flex flex-col items-start justify-start py-10 px-4 box-border gap-[40px] mq750:hidden mq750:pt-[26px] mq750:pb-[26px] mq750:box-border mq450:gap-[20px]">
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-[66px]">
            <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-[7px]">
                <div className="h-[82px] flex-1 relative">
                  <div className="absolute w-[calc(100%_-_2px)] top-[0px] right-[2px] left-[0px] rounded-[58px] h-20">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-start justify-start">
                      <div className="h-20 w-20 relative rounded-[93px] bg-black-900" />
                    </div>
                    <Image
                      className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[82px] max-w-full overflow-hidden max-h-full object-cover z-[1]"
                      alt=""
                      width={100}
                      height={100}
                      src="/image@2x.png"
                    />
                  </div>
                  <div className=" absolute top-[52px] left-[50px] rounded-[125px] bg-neutral-07-100 box-border w-[30px] h-[30px] flex flex-row items-start justify-start py-[7px] px-[5px] z-[2] border-[1.5px] border-solid border-white1">
                    <Image
                      className="h-4 w-4 relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      width={100}
                      height={100}
                      src="/outlinecamera.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="relative leading-[32px] font-semibold inline-block min-w-[97px] mq450:text-base mq450:leading-[26px]">
                Jeet Patel
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[12px] text-base text-neutral-04-100">
            <div
              onClick={() => {
                setActiveTab("account");
              }}
              className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 text-neutral-07-100 border-b-[1px] border-solid border-neutral-07-100"
            >
              <div className="flex-1 relative leading-[26px] font-semibold">
                Account
              </div>
            </div>
            <div
              onClick={() => {
                setActiveTab("address");
              }}
              className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent"
            >
              <div className="flex-1 relative leading-[26px] font-semibold">
                Address
              </div>
            </div>
            <div
              onClick={() => {
                setActiveTab("order");
              }}
              className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent"
            >
              <div className="flex-1 relative leading-[26px] font-semibold">
                Orders
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent">
              <div className="flex-1 relative leading-[26px] font-semibold">
                Log Out
              </div>
            </div>
          </div>
        </div>
        <section className="flex-1 flex flex-col items-start justify-start px-[72px] box-border gap-[40px] max-w-[calc(100%_-_269px)] mq750:max-w-full mq450:gap-[20px] mq1050:pl-9 mq1050:pr-9 mq1050:box-border ">
          {content}
        </section>
      </main>
    </div>
  );
};

export default Page;
