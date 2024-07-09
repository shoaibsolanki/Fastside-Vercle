import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthConext";
import Item from "./Componenets/items";
import PropTypes from "prop-types";
import { useState } from "react";

const Orders = ({ className = "" }) => {
  const { allOrders } = useAuth();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allOrders.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = allOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className={`w-full flex flex-col items-start justify-start py-0 px-[72px] box-border gap-[40px] leading-[normal] tracking-[normal] text-left text-[20px] text-black font-caption-1 mq450:gap-[20px] mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <a className="[text-decoration:none] relative leading-[32px] font-semibold text-[inherit] mq450:text-[16px] mq450:leading-[26px]">
        Orders History
      </a>
      <section className="self-stretch flex flex-col items-start justify-start text-left text-sm text-neutral-04-100 font-caption-1">
        <div className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-1.5 gap-[20px] border-b-[1px] border-solid border-neutral-03-100 mq750:flex-wrap">
          <div className="w-40 relative leading-[22px] inline-block shrink-0">
            Number ID
          </div>
          <a className="[text-decoration:none] w-[120px] relative leading-[22px] text-[inherit] inline-block shrink-0">
            Dates
          </a>
          <div className="w-[120px] relative leading-[22px] inline-block shrink-0">
            Status
          </div>
          <a className="[text-decoration:none] w-[137px] relative leading-[22px] text-[inherit] inline-block shrink-0">
            Price
          </a>
        </div>
        {currentOrders.map((item, index) => (
          <Item
            key={index}
            prop={item.order_id}
            date={item.order_date}
            price={item.order_value}
            status={item.status}
          />
        ))}
        <div className="flex justify-between mt-4 w-full">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="py-2 px-4 bg-gray-200 rounded disabled:opacity-50"
          >
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

Orders.propTypes = {
  className: PropTypes.string,
};

export default Orders;
