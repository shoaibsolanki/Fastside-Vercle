"use client"
import React, { useEffect, useState } from "react";

import ProductComponent from "./ProductComponent";
import { BASEURL } from "../services/http-Pos";
import axios from "axios";
import DataService from "../services/requestApi";
const PopularProducts = ({data,setData}) => {
  const [currentPage, setCurrentPage] = useState("1");


  const GetAllBillingItem = async () => {
    try {
      const response = await axios.get(
        `${BASEURL.ENDPOINT_URL}search/recommended-item/10001/1/1`
      );
      setData(response.data.data); // Update the seeds state with the fetched data
    } catch (error) {
      console.error("Error fetching billing items:", error);
    }
  };

  useEffect(() => {
    GetAllBillingItem();
  }, [currentPage]);


  const CatgorybyData= async (query)=>{
    try {
      const response = await DataService.GetDataByCatorya("1", "10001", query, currentPage)
      console.log(response)
      setData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [allcategory, setAllCategory] = useState([]);

  const GetAllCategory = async () => {
    try {
      const response = await DataService.GetAllCateogary("1", "10001");
      console.log("RES CATEGORY", response);

      if (response && response.data && response.data.data) {
        setAllCategory(response.data.data);
        if (response.data.data.length > 0) {
          CatgorybyData(response.data.data[0].category_name);
        }
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  useEffect(() => {
    GetAllCategory();
  }, []); 



  return (
    <div id="popular-products" className="my-2 mx-auto max-w-[1600px]">
      <div className="flex justify-between items-center px-4 md:px-0">
        <h2 className="text-primary text-3xl font-semibold">
          Popular Products
        </h2>
        <ul className="flex flex-wrap justify-between gap-4">
       {allcategory.map((item, index) => ( <li
               onClick={() => {
                // setActiveButton(index);
                CatgorybyData(item.category_name)
              }}
       className="px-8 py-3 border-[1px] cursor-pointer border-primary rounded-3xl text-primary text-lg font-medium capitalize hover:bg-light">
        {item.category_name}
          </li>   ))}
        
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
