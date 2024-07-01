import React from "react";

const Searchbar = () => {
  return (
    <div className="flex bg-white rounded-2xl ">
      <input
        className="bg-white rounded-xl w-[400px] px-4 outline-none text-primary font-semibold"
        placeholder="Search your item here"
      />
      <button className=" bg-second text-white p-4 font-semibold rounded-2xl ">
        Search
      </button>
    </div>
  );
};

export default Searchbar;
