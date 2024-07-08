import PropTypes from "prop-types";

const Item = ({ className = "", prop, october172023, rs123400 }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-center justify-between pt-6 px-0 pb-[22px] gap-[20px] text-left text-sm text-neutral-07-100 font-caption-1 border-b-[1px] border-solid border-neutral-03-100 mq750:flex-wrap ${className}`}
    >
      <div className="w-40 relative leading-[22px] inline-block shrink-0">
        {prop}
      </div>
      <div className="relative leading-[22px] inline-block min-w-[120px]">
        {october172023}
      </div>
      <div className="w-[120px] relative leading-[22px] inline-block shrink-0">
        Delivered
      </div>
      <div className="w-[137px] relative leading-[22px] inline-block shrink-0">
        {rs123400}
      </div>
    </div>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string,
  october172023: PropTypes.string,
  rs123400: PropTypes.string,
};

export default Item;
