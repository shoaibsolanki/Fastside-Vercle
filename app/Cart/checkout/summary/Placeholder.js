import Image from "next/image";
import PropTypes from "prop-types";

const Placeholder = ({ className = "", image, semicolons }) => {
  return (
    <div
      className={`h-28 w-24 relative text-center text-base text-neutrals-8 font-caption-1-semi ${className} w-24 h-24`}
    >
      <Image
        className="absolute top-[16px] left-[0px] w-full h-full overflow-hidden object-cover"
        loading="lazy"
        layout="fit"
        alt=""
        src={image}
      />
      <div className="absolute top-[0px] right-[0px] rounded-61xl bg-neutral-07-100 flex flex-row items-start justify-start py-1 px-[11px] z-[1]">
        <div className="bg-black text-white rounded-full relative leading-[24px] font-semibold inline-flex h-[30px] w-[30px]  items-center justify-center">
          {semicolons}
        </div>
      </div>
    </div>
  );
};

Placeholder.propTypes = {
  className: PropTypes.string,
  imagePlaceholder: PropTypes.string,
  semicolons: PropTypes.string,
};

export default Placeholder;
