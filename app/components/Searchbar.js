import React from "react";
import { Image } from "@mui/icons-material";
import { BASEURL } from "../services/http-Pos";
import { Rating } from "@mui/material";

const Searchbar = ({ search, setSearch, data, toggleModal }) => {

  // const handleSearch = () => {
  //   if (search.trim() !== "") {
  //     toggleModal(); // Call toggleModal from props when search is clicked
  //   }
  // };

  return (
    <>
      <div className="flex bg-white rounded-2xl">
        <input
          className="bg-white rounded-xl w-[400px] px-4 outline-none text-primary font-semibold"
          placeholder="Search your item here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-second text-white p-4 font-semibold rounded-2xl"
          // onClick={handleSearch} 
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Searchbar;
