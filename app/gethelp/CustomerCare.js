import { Email, Factory, Phone } from "@mui/icons-material";
import React from "react";

const CustomerCare = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl text-black mb-4">Contact Us</h2>
      <div className="border-[1px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 bg-primary shadow-md border-primary gap-4">
        <div className="p-2">
          <a
            href="mailto:FastSideshop@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="flex justify-center items-center flex-col h-full p-6 border border-second rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300">
              <Email fontSize="large" />
              <h2 className="mt-2 text-center">FastSideshop@gmail.com</h2>
            </div>
          </a>
        </div>
        <div className="p-2">
          <a href="tel:+91-775-582-1175" className="block h-full">
            <div className="flex justify-center items-center flex-col h-full p-6 border border-second rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300">
              <Phone fontSize="large" />
              <h2 className="mt-2 text-center">+91-775-582-1175</h2>
            </div>
          </a>
        </div>
        <div className="p-2">
          <div className="flex justify-center items-center flex-col h-full p-6 border border-second rounded-lg shadow-lg bg-white">
            <Factory fontSize="large" />
            <h2 className="mt-2 text-center">
              Bhopal - 1 Address : IT Office : Plot no 242/G3,Nitikhand-1,
              Indirapuram, Ghaziabad NCR
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
