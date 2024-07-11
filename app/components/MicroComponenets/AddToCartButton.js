import { RemoveRedEyeRounded, ShoppingCart } from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";

const AddToCartButton = ({ item }) => {
  console.log(item);
  const { addToCart } = useCart();
  return (
    <div className="my-4 flex items-center gap-8">
      <button
        onClick={() => addToCart(item)}
        id="addToCart"
        className="text-white bg-second p-2 rounded-md text-center hover:bg-[#de9b15] duration-300 "
      >
        <ShoppingCart />
      </button>
      {/* <button id="eye-view" className="bg-light2 p-4 text-white rounded-xl">
        <Link href={""}>
          <RemoveRedEyeRounded />
        </Link>
      </button> */}
    </div>
  );
};

export default AddToCartButton;

// import { RemoveRedEyeRounded, ShoppingCart } from "@mui/icons-material";
// import React from "react";
// import Link from 'next/link'
// import { useCart } from "../../contexts/CartContext";

// const AddToCartButton = ({item}) => {
//   const {addToCart} =useCart()
//   return (
//     <div className="my-4 flex items-center gap-8">
//       <button
//  onClick={()=>addToCart(item)}
//         id="addToCart"
//         className=" text-center items-center inline-block p-4 bg-light2 text-black rounded-badge font-semibold cursor-pointer"
//       >
//         Add To Cart{" "}
//         <span className="text-white bg-second p-2 rounded-full text-center ">
//           <ShoppingCart />
//         </span>
//       </button >
//       <button id="eye-view" className="bg-light2 p-4 text-white rounded-xl">
//         <RemoveRedEyeRounded />
//       </button>
//     </div>
//   );
// };

// export default AddToCartButton;
