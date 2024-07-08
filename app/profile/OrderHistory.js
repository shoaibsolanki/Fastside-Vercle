import { useAuth } from "../contexts/AuthConext";
import Item from "./Componenets/items";
import PropTypes from "prop-types";

const Orders = ({ className = "" }) => {
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
        <Item
          prop="#3456_768"
          october172023="October 17, 2023"
          rs123400="Rs 1234.00"
        />
        <Item
          prop="#3456_980"
          october172023="October 11, 2023"
          rs123400="Rs 345.00"
        />
        <Item
          prop="#3456_120"
          october172023="August 24, 2023"
          rs123400="Rs 2345.00"
        />
        <Item
          prop="#3456_030"
          october172023="August 12, 2023"
          rs123400="Rs 845.00"
        />
      </section>
    </div>
  );
};

Orders.propTypes = {
  className: PropTypes.string,
};

export default Orders;
