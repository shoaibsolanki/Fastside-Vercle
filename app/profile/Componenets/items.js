import PropTypes from "prop-types";

const Item = ({ className = "", prop, date, price, status }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-center justify-between pt-6 px-0 pb-[22px] gap-[4px] text-left text-sm text-neutral-07-100 font-caption-1 border-b-[1px] border-solid border-neutral-03-100 mq750:flex-wrap ${className}`}
    >
      <div className="w-40 relative leading-[22px] inline-block shrink-0">
        {prop}
      </div>
      <div className="relative leading-[22px] inline-block min-w-[120px]">
        {date}
      </div>
      <div className="w-[120px] relative leading-[22px] inline-block shrink-0">
        {status}
      </div>
      <div className="w-[137px] relative leading-[22px] inline-block shrink-0">
        {price}
      </div>
    </div>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.string,
  status: PropTypes.string,
};

export default Item;
