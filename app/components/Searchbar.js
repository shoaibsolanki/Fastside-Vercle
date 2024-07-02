"use client"
import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import { BASEURL } from "../services/http-Pos";
import { FavoriteRounded, Image } from "@mui/icons-material";
import { Rating } from "@mui/material";

const Searchbar = ({ search, setSearch, data,handleSearch,modal,toggleModal }) => {

  return (
    <>
      <div className="flex bg-white rounded-2xl ">
        <input
          className="bg-white rounded-xl w-[400px] px-4 outline-none text-primary font-semibold"
          placeholder="Search your item here"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-second text-white p-4 font-semibold rounded-2xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      
    </>
  );
};

export default Searchbar;
``
