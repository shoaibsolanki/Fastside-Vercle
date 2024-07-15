"use client";
import Image from "next/image";
import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import Address from "./Address";
import Account from "./Account";
import { useAuth } from "../contexts/AuthConext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { logout, authData, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("order");
  const router = useRouter();
  const { name } = authData;
  console.log(authData, name);
  const userAuthenticated = authData.id != null && authData.id != undefined;
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
  if (!isAuthenticated) {
    return router.push("/login");
  } else
    return (
      <div className="w-full relative bg-white1 flex flex-col items-center justify-start py-20 px-5 box-border gap-[80px] leading-[normal] tracking-[normal] text-left text-35xl text-black font-headline-3 mq750:gap-[20px] mq1125:gap-[40px]">
        <div className="w-[1120px] flex flex-row items-start justify-center max-w-full">
          <h1 className="text-4xl m-0 relative text-inherit tracking-[-1px] leading-[58px] font-medium font-inherit mq450:text-[32px] mq450:leading-[35px] mq1050:text-[43px] mq1050:leading-[46px]">
            My Account
          </h1>
        </div>
        <main className="w-[1120px] flex flex-col md:flex-row md:items-start items-start justify-start gap-[7px] max-w-full text-left text-xl text-black font-hairline-2">
          <div className="w-full md:w-[262px] bg-[#F3F5F7] rounded-lg bg-neutral-02-100 flex flex-col items-start justify-start py-10 px-4 box-border gap-[40px] mq750:hidden mq750:pt-[26px] mq750:pb-[26px] mq750:box-border mq450:gap-[20px]">
            <div className="self-stretch flex flex-row items-start justify-start py-0 px-[66px]">
              <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
                <div className="self-stretch flex flex-row items-start justify-start py-0 px-[7px]">
                  {/* <div className="h-[82px] flex-1 relative">
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
                  <div className="absolute top-[52px] left-[50px] rounded-[125px] bg-neutral-07-100 box-border w-[30px] h-[30px] flex flex-row items-start justify-start py-[7px] px-[5px] z-[2] border-[1.5px] border-solid border-white1">
                    <Image
                      className="h-4 w-4 relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      width={100}
                      height={100}
                      src="/outlinecamera.svg"
                    />
                  </div>
                </div> */}
                </div>
                <div className="text-lg relative text-center  font-semibold inline-block min-w-[97px] mq450:text-base mq450:leading-[26px]">
                  {name}{" "}
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
                <div className="flex-1 relative cursor-pointer leading-[26px] font-semibold">
                  Account
                </div>
              </div>
              <div
                onClick={() => {
                  setActiveTab("address");
                }}
                className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent"
              >
                <div className="flex-1 relative cursor-pointer leading-[26px] font-semibold">
                  Address
                </div>
              </div>
              <div
                onClick={() => {
                  setActiveTab("order");
                }}
                className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent"
              >
                <div className="flex-1 relative cursor-pointer leading-[26px] font-semibold">
                  Orders
                </div>
              </div>
              <div
                // onClick={logout}
                className="self-stretch flex flex-row items-start justify-start pt-2 px-0 pb-1.5 border-b-[1px] border-solid border-transparent"
              >
                <div className="flex-1 relative cursor-pointer leading-[26px] font-semibold">
                  <LogoutModal />
                </div>
              </div>
            </div>
          </div>
          <section className=" flex flex-col items-start justify-start px-4 box-border gap-4 max-w-full mq750:max-w-full mq450:gap-[20px] mq1050:pl-9 mq1050:pr-9 mq1050:box-border">
            {content}
          </section>
        </main>
      </div>
    );
};

export default Page;

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function LogoutModal() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="text-red-500" onClick={handleOpen}>
        Logout
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Do you want to logout?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button onClick={logout} variant="outlined" color="error">
                Logout
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
