import AddressBox from "./Componenets/AddressBox";
import PropTypes from "prop-types";

const Address = ({ className = "" }) => {
  return (
    <div
      className={`w-full flex flex-col items-start justify-start py-0 px-[72px] box-border gap-[19px] leading-[normal] tracking-[normal] text-left text-[20px] text-black font-caption-1 mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <a className="[text-decoration:none] relative leading-[32px] font-semibold text-[inherit] inline-block min-w-[81px] mq450:text-base mq450:leading-[26px]">
        Address
      </a>
      <section className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[23px] max-w-full">
        <AddressBox billingAddress="Billing Address" />
        <AddressBox billingAddress="Shipping Address" />
      </section>
    </div>
  );
};

Address.propTypes = {
  className: PropTypes.string,
};

export default Address;
