import PropTypes from "prop-types";

const Product = ({ className = "" }) => {
  return (
    <div
      className={`w-full flex flex-row items-start justify-start p-4 box-border relative gap-[12px] leading-[normal] tracking-[normal] text-left text-xs text-neutral-dark font-heading-h6 ${className}`}
    >
      <section className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-8xs bg-background-white box-border border-[1px] border-solid border-neutral-light" />
      <img
        className="h-[72px] w-[72px] relative rounded-8xs object-cover z-[1]"
        loading="lazy"
        alt=""
        src="/image-47@2x.png"
      />
      <div className="flex-1 flex flex-col items-start justify-start gap-[12px]">
        <div className="self-stretch flex flex-row items-start justify-start gap-[13px]">
          <b className="flex-1 relative tracking-[0.5px] leading-[150%] z-[1]">
            Nike Air Zoom Pegasus 36 Miami
          </b>
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1]"
              loading="lazy"
              alt=""
              src="/system-icon24pxlove.svg"
            />
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[1]"
              loading="lazy"
              alt=""
              src="/system-icon24pxtrash.svg"
            />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] text-primary-blue">
          <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
            <b className="relative tracking-[0.5px] leading-[150%] inline-block min-w-[52px] whitespace-nowrap z-[1]">
              $299,43
            </b>
          </div>
          <div className="flex flex-row items-start justify-start py-0 px-2 relative gap-[8px] z-[1] text-center text-darkslateblue">
            <img
              className="h-full w-8 absolute !m-[0] top-[0px] bottom-[0px] left-[0px] max-h-full"
              alt=""
              src="/rectangle-430.svg"
            />
            <img
              className="h-full w-8 absolute !m-[0] top-[0px] right-[0px] bottom-[0px] max-h-full"
              alt=""
              src="/rectangle-432.svg"
            />
            <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
              <img
                className="w-4 h-4 relative overflow-hidden shrink-0 z-[1]"
                loading="lazy"
                alt=""
                src="/system-icon16pxminus.svg"
              />
            </div>
            <div className="h-6 flex flex-row items-start justify-start py-0 pr-[17px] pl-0 box-border">
              <div className="h-[25px] w-[41px] relative bg-neutral-light box-border border-[1px] border-solid border-neutral-light" />
              <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 ml-[-22px]">
                <div className="relative tracking-[0.01em] leading-[150%] inline-block min-w-[4px] z-[1]">
                  1
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
              <img
                className="w-4 h-4 relative overflow-hidden shrink-0 z-[1]"
                loading="lazy"
                alt=""
                src="/system-icon16pxplus.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
};

export default Product;
