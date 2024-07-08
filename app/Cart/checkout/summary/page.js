"use client";
import { Button } from "@mui/material";
import Placeholder from "./Placeholder";
import PropTypes from "prop-types";
import keychain from "../../../../public/imgs/keychain.png";
import Lanyard from "../../../../public/imgs/lanyard.png";
import Stepper from "@/app/components/MicroComponenets/Stepper";
import { useCart } from "../../../contexts/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthConext";

const OrderComplete = ({ className = "" }) => {
  const { cart } = useCart();
  console.log(cart);
  const [item, setItem] = useState([]);

  const getitemImageAndQuantity = () => {
    const items = cart.map(({ itemName, image_name1, product_qty }) => ({
      itemName,
      image_name1,
      product_qty,
    }));
    setItem(items);
    console.log(item);
  };
  useEffect(() => {
    getitemImageAndQuantity();
  }, []);
  const { isPaymentSuccessful } = useAuth();
  const router = useRouter();

  if (!isPaymentSuccessful) {
    router.push("/cart");
  } else
    return (
      <div className="my-4">
        <Stepper activeStep={3} />;
        <div
          className={`w-full shadow-[0px_32px_48px_-48px_rgba(18,_18,_18,_0.1)] rounded-lg bg-white flex flex-col items-center justify-start py-20 px-5 box-border gap-[40px] leading-[normal] tracking-[normal] mq600:gap-[20px] ${className} border-2 my-8 rounded-xl max-w-[700px] mx-auto`}
        >
          <section className="w-[548px] flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-center text-9xl text-neutral-04-100 font-headline-4">
            <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-[22px] box-border max-w-full">
                <h1 className="m-0 flex-1 relative text-3xl tracking-[-0.6px] leading-[34px] font-medium font-inherit inline-block max-w-full mq450:text-[22px] mq450:leading-[27px]">
                  Thank you! 🎉
                </h1>
              </div>
              <h1 className="m-0 self-stretch relative text-4xl tracking-[-0.4px] leading-[44px] font-medium font-inherit text-neutrals-2 text-black">
                Your order has been received
              </h1>
            </div>
          </section>
          <section className="w-[548px] flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-center py-0 px-[89px] box-border max-w-full gap-[20px] mq450:pl-5 mq450:pr-5 mq450:box-border mq600:flex-wrap mq600:pl-11 mq600:pr-11 mq600:box-border ">
              <Placeholder image={keychain} semicolons="3" />
            </div>
          </section>
          <section className="flex flex-row items-center justify-center py-0 px-[139px] box-border gap-[32px] max-w-full text-left text-sm text-neutral-04-100 font-caption-1-semi mq450:pl-5 mq450:pr-5 mq450:box-border mq600:flex-wrap mq600:gap-[16px] mq600:pl-[69px] mq600:pr-[69px] mq600:box-border">
            <div className="flex flex-col items-start justify-start gap-[20px] min-w-[120px] mq600:flex-1">
              <div className="flex flex-row items-center justify-center">
                <div className="relative leading-[22px] font-semibold inline-block min-w-[81px]">
                  Order code:
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <div className="relative leading-[22px] font-semibold inline-block min-w-[36px]">
                  Date:
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <div className="relative leading-[22px] font-semibold inline-block min-w-[38px]">
                  Total:
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <div className="relative leading-[22px] font-semibold inline-block min-w-[120px]">
                  Payment method:
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[20px] min-w-[120px] text-neutral-07-100 mq600:flex-1">
              <div className="relative leading-[22px] font-semibold inline-block min-w-[93px] text-black">
                #0123_45678
              </div>
              <div className="relative leading-[22px] font-semibold inline-block min-w-[118px] text-black">
                October 19, 2023
              </div>
              <div className="relative leading-[22px] font-semibold inline-block min-w-[69px] text-black">
                Rs 875.00
              </div>
              <div className="relative leading-[22px] font-semibold inline-block min-w-[78px] text-black">
                Online{" "}
              </div>
            </div>
          </section>
          <div className="w-[548px] flex flex-row items-start justify-center max-w-full">
            <Button
              className="h-[52px] w-[203px]"
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                background: "#eda315",
                borderRadius: "80px",
                "&:hover": { background: "#eda315" },
                width: 203,
                height: 52,
              }}
            >
              Purchase history
            </Button>
          </div>
        </div>{" "}
      </div>
    );
};

OrderComplete.propTypes = {
  className: PropTypes.string,
};

export default OrderComplete;
