"use client"
import React, { useEffect, useState } from "react";

import ProductComponent from "./ProductComponent";
import { BASEURL } from "../services/http-Pos";

const PopularProducts = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const [data, setData] = useState([]);

  const GetAllBillingItem = async () => {
    try {
      const response = await axios.get(
        `${BASEURL.ENDPOINT_URL}search/recommended-item/80001/8/1`
      );
      setData(response.data.data); // Update the seeds state with the fetched data
    } catch (error) {
      console.error("Error fetching billing items:", error);
    }
  };

  useEffect(() => {
    GetAllBillingItem();
  }, [currentPage]);



  return (
    <div id="popular-products" className="my-2 mx-auto max-w-[1600px]">
      <div className="flex justify-between items-center px-4 md:px-0">
        <h2 className="text-primary text-3xl font-semibold">
          Popular Products
        </h2>
        <ul className="flex flex-wrap justify-between gap-4">
          <li className="px-8 py-3 border-[1px] border-primary rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
            Lanyard
          </li>
          <li className="px-8 py-3 border-[1px] border-gray-300 rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
            Badge reels
          </li>
          <li className="px-8 py-3 border-[1px] border-gray-300 rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
            Badge holders
          </li>
          <li className="px-8 py-3 border-[1px] border-gray-300 rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
            Lanyard
          </li>
        </ul>
      </div>
      <div className="w-full mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductComponent data={data} />
        {/* <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent /> */}
      </div>
    </div>
  );
};

export default PopularProducts;
