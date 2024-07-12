"use client";
import { useAuth } from "@/app/contexts/AuthConext";
import { useCart } from "@/app/contexts/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataService from "@/app/services/requestApi";
import { Add } from "@mui/icons-material";
import { BASEURL } from "@/app/services/http-Pos";
const CheckoutPage = () => {
  const { authData, setIsPaymentSuccessful } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { id, saasId, storeId } = authData;

  const [billingAddress, setBillingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createRazorpayOrder = async () => {
    try {
      const data = {
        amount: totalPrice * 100,
        currency: "INR",
      };

      const response = await axios.post(
        `${BASEURL.ENDPOINT_URL}rezar/pay/1`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `rzp_test_USk6kNFvt2WXOE:afZsDDDaTvqhZPxMLH1p0b2t`
            ).toString("base64")}`,
          },
        }
      );

      console.log("Razorpay order created:", response.data);
      return response.data.id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async (formData) => {
    try {
      const orderId = await createRazorpayOrder();
      const options = {
        key: "rzp_test_USk6kNFvt2WXOE",
        amount: totalPrice * 100,
        currency: "INR",
        name: "FastSide",
        description: "Test Transaction",
        image: "",
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          await handlePlaceOrder(formData, response);
          setIsPaymentSuccessful(true);
          clearCart();
          router.push("/cart/checkout/summary");
        },
        prefill: {
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          contact: formData.Mobile_numbers,
        },
        notes: {
          address: formData["Street Address"],
        },
        theme: {
          color: "#003f62",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error handling Razorpay payment:", error);
    }
  };

  const onSubmit = async (data) => {
    handleRazorpayPayment(data);
  };
  const handleSaveAddress = async (data) => {
    const addressForSave = {
      address: `${data.street},${data.city},${data.state},${data.zipcode} at ${data.address_type}`,
      address_type: data.address_type,
      street: data.street,
      store_id: storeId,
      saas_id: saasId,
      pincode: data.zipcode,
      city: data.city,
      state: data.state,
      status: "Active",
      customer_type: "Regular",
    };

    await saveAddress(addressForSave);
  };
  const handlePlaceOrder = async (data, paymentResponse) => {
    try {
      const orderInformations = {
        address_id: data.address_id,
        customer_id: id,
        customer_name: `${data.first_name} ${data.last_name}`,
        mobile_number: data.Mobile_numbers,
        saas_id: saasId,
        store_id: storeId,
        order_tax: 0,
        order_value: totalPrice,
        order_discount: 0,
        status: "pending",
        payment_type: "Online Payment",
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        order_date: new Date(),
        order_type: "",
        item_list: cart,
      };
      localStorage.setItem("orderInformations", JSON.stringify(cart));
      const response = await DataService.CreateOrder(orderInformations);
      localStorage.setItem("orderMaster", JSON.stringify(response.data));
      console.log("Order placed:", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const saveAddress = async (data) => {
    try {
      const response = await DataService.SaveAddress(data, id);
      console.log("Address saved:", response);
      setShowNewAddressForm(false);
      getSavedData(); // Refresh the saved addresses list
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const getSavedData = async () => {
    try {
      const response = await DataService.GetSavedAddress(id, saasId, storeId);
      console.log("Saved addresses:", response.data.data);
      setSavedAddresses(response.data.data);
    } catch (error) {
      console.error("Error fetching saved addresses:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSavedData();
    }
  }, [id]);
  return (
    <div className="w-full mx-auto p-4">
      <div className="border border-gray-300 p-6 mb-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="firstName" className="text-sm font-semibold">
              First Name
            </label>
            <input
              {...register("first_name", { required: true })}
              type="text"
              id="firstName"
              placeholder="First name"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.first_name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="text-sm font-semibold">
              Last Name
            </label>
            <input
              {...register("last_name", { required: true })}
              type="text"
              id="lastName"
              placeholder="Last name"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="text-sm font-semibold">
              Phone Number
            </label>
            <input
              {...register("mobile_numbers", { required: true })}
              type="number"
              id="phoneNumber"
              placeholder="Phone number"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.mobile_numbers && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Your Email"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.email && <span>This field is required</span>}
          </div>
        </form>
      </div>

      {showNewAddressForm ? (
        <div className="border border-gray-300 p-6 mb-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <form className="" onSubmit={handleSubmit(handleSaveAddress)}>
            <div className="grid gap-4 grid-cols-2 max-md:grid-cols-1 w-full">
              <div className="form-group ">
                <label
                  htmlFor="streetAddress"
                  className="text-sm font-semibold"
                >
                  Street Address *
                </label>
                <input
                  {...register("street", { required: true })}
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.street && <span>This field is required</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city" className="text-sm font-semibold">
                  Town / City *
                </label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  id="city"
                  placeholder="Town / City"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.city && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  {...register("state", { required: true })}
                  type="text"
                  id="state"
                  placeholder="State"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.state && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode" className="text-sm font-semibold">
                  Zip Code
                </label>
                <input
                  {...register("zipcode", { required: true })}
                  type="number"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.zipcode && <span>This field is required</span>}
              </div>
              <div className="form-group ">
                <label className="text-sm font-semibold">Address Type *</label>
                <div className="mt-2 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Home"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Home</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      {...register("address_type", { required: true })}
                      type="radio"
                      value="Work"
                      className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-gray-700">Work</span>
                  </label>
                </div>
                {errors.address_type && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <span></span>
              <button
                type="submit"
                className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Save address
              </button>
              {savedAddresses.length !== 0 && (
                <button
                  onClick={() => setShowNewAddressForm(false)}
                  className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Use existing address
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="border  gap-4 border-gray-300 p-6 mb-6 rounded-md">
          {savedAddresses.map((item, index) => {
            return (
              <div
                key={index}
                className="mx-auto flex flex-col md:flex-row w-full justify-between border-2 rounded-xl p-4 my-2 text-gray-700"
              >
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold mb-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {item.address}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">Place:</span>{" "}
                    {item.addressType}
                  </p>
                  <p>
                    <span className="font-semibold">Pincode:</span>{" "}
                    {item.pincode}
                  </p>
                </div>
                <input
                  type="radio"
                  id={`address_${index}`}
                  {...register("address_id", { required: true })}
                  value={item.id.toString()}
                  checked={selectedAddress === item.id}
                  onChange={() => handleAddressSelect(item.id)}
                  className="self-start md:self-center bg-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-full mt-4 md:mt-0"
                />
              </div>
            );
          })}
          <button
            className="border-2 rounded-xl p-4 mx-auto my-2 text-gray-400 flex items-center justify-center hover:bg-gray-100 w-full"
            onClick={() => setShowNewAddressForm(true)}
          >
            <Add fontSize="large" />
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full py-3 bg-second text-white rounded-md text-lg font-semibold hover:bg-yellow-600 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

// "use client";
// import { useAuth } from "@/app/contexts/AuthConext";
// import { useCart } from "@/app/contexts/CartContext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import DataService from "@/app/services/requestApi";
// import { Add } from "@mui/icons-material";
// import { BASEURL } from "@/app/services/http-Pos";
// const CheckoutPage = () => {
//   const { authData, setIsPaymentSuccessful } = useAuth();
//   const { cart, totalPrice, clearCart } = useCart();
//   const router = useRouter();
//   const { id, saasId, storeId } = authData;

//   const [billingAddress, setBillingAddress] = useState(false);
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleAddressSelect = (id) => {
//     setSelectedAddress(id);
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => {
//       console.log("Razorpay script loaded successfully.");
//     };
//     script.onerror = () => {
//       console.error("Failed to load Razorpay script.");
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const createRazorpayOrder = async () => {
//     try {
//       const data = {
//         amount: totalPrice * 100,
//         currency: "INR",
//       };

//       const response = await axios.post(
//         `${BASEURL.ENDPOINT_URL}rezar/pay/1`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Basic ${Buffer.from(
//               `rzp_test_USk6kNFvt2WXOE:afZsDDDaTvqhZPxMLH1p0b2t`
//             ).toString("base64")}`,
//           },
//         }
//       );

//       console.log("Razorpay order created:", response.data);
//       return response.data.id;
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       throw error;
//     }
//   };

//   const handleRazorpayPayment = async (formData) => {
//     try {
//       const orderId = await createRazorpayOrder();
//       const options = {
//         key: "rzp_test_USk6kNFvt2WXOE",
//         amount: totalPrice * 100,
//         currency: "INR",
//         name: "FastSide",
//         description: "Test Transaction",
//         image: "",
//         order_id: orderId,
//         handler: async function (response) {
//           console.log(response);
//           await handlePlaceOrder(formData, response);
//           setIsPaymentSuccessful(true);
//           clearCart();
//           router.push("/cart/checkout/summary");
//         },
//         prefill: {
//           name: `${formData.first_name} ${formData.last_name}`,
//           email: formData.email,
//           contact: formData.Mobile_numbers,
//         },
//         notes: {
//           address: formData["Street Address"],
//         },
//         theme: {
//           color: "#003f62",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error handling Razorpay payment:", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     handleRazorpayPayment(data);
//   };
//   console.log(selectedAddress);
//   const handleSaveAddress = async (data) => {
//     const addressForSave = {
//       address: `${data.street},${data.city},${data.state},${data.zipcode} at ${data.address_type}`,
//       address_type: data.address_type,
//       street: data.street,
//       store_id: storeId,
//       saas_id: saasId,
//       pincode: data.zipcode,
//       city: data.city,
//       state: data.state,
//       status: "Active",
//       customer_type: "Regular",
//     };

//     await saveAddress(addressForSave);
//   };
//   const handlePlaceOrder = async (data, paymentResponse) => {
//     try {
//       const orderInformations = {
//         address_id: data.address_id,
//         customer_id: id,
//         customer_name: `${data.first_name} ${data.last_name}`,
//         mobile_number: data.Mobile_numbers,
//         saas_id: saasId,
//         store_id: storeId,
//         order_tax: 0,
//         order_value: totalPrice,
//         order_discount: 0,
//         status: "pending",
//         payment_type: "Online Payment",
//         razorpay_order_id: paymentResponse.razorpay_order_id,
//         razorpay_payment_id: paymentResponse.razorpay_payment_id,
//         order_date: new Date(),
//         order_type: "",
//         item_list: cart,
//       };
//       localStorage.setItem("orderInformations", JSON.stringify(cart));

//       const response = await DataService.CreateOrder(orderInformations);
//       console.log("Order placed:", response);
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   console.log(selectedAddress);
//   const saveAddress = async (data) => {
//     try {
//       const response = await DataService.SaveAddress(data, id);
//       console.log("Address saved:", response);
//       setShowNewAddressForm(false);
//       getSavedData(); // Refresh the saved addresses list
//     } catch (error) {
//       console.error("Error saving address:", error);
//     }
//   };

//   const getSavedData = async () => {
//     try {
//       const response = await DataService.GetSavedAddress(id, saasId, storeId);
//       console.log("Saved addresses:", response.data.data);
//       setSavedAddresses(response.data.data);
//     } catch (error) {
//       console.error("Error fetching saved addresses:", error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getSavedData();
//     }
//   }, [id]);
//   return (
//     <div className="w-full mx-auto p-4">
//       <div className="border border-gray-300 p-6 mb-6 rounded-md">
//         <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="form-group">
//             <label htmlFor="firstName" className="text-sm font-semibold">
//               First Name
//             </label>
//             <input
//               {...register("first_name", { required: true })}
//               type="text"
//               id="firstName"
//               placeholder="First name"
//               className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//             {errors.first_name && <span>This field is required</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName" className="text-sm font-semibold">
//               Last Name
//             </label>
//             <input
//               {...register("last_name", { required: true })}
//               type="text"
//               id="lastName"
//               placeholder="Last name"
//               className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//             {errors.last_name && <span>This field is required</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phoneNumber" className="text-sm font-semibold">
//               Phone Number
//             </label>
//             <input
//               {...register("mobile_numbers", { required: true })}
//               type="number"
//               id="phoneNumber"
//               placeholder="Phone number"
//               className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//             {errors.mobile_numbers && <span>This field is required</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email" className="text-sm font-semibold">
//               Email Address
//             </label>
//             <input
//               {...register("email", { required: true })}
//               type="email"
//               id="email"
//               placeholder="Your Email"
//               className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//             {errors.email && <span>This field is required</span>}
//           </div>
//         </form>
//       </div>

//       {showNewAddressForm ? (
//         <div className="border border-gray-300 p-6 mb-6 rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
//           <form
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             onSubmit={handleSubmit(handleSaveAddress)}
//           >
//             <div className="form-group col-span-2">
//               <label htmlFor="streetAddress" className="text-sm font-semibold">
//                 Street Address *
//               </label>
//               <input
//                 {...register("street", { required: true })}
//                 type="text"
//                 id="streetAddress"
//                 placeholder="Street Address"
//                 className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//               />
//               {errors.street && <span>This field is required</span>}
//             </div>

//             <div className="form-group">
//               <label htmlFor="city" className="text-sm font-semibold">
//                 Town / City *
//               </label>
//               <input
//                 {...register("city", { required: true })}
//                 type="text"
//                 id="city"
//                 placeholder="Town / City"
//                 className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//               />
//               {errors.city && <span>This field is required</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="state" className="text-sm font-semibold">
//                 State
//               </label>
//               <input
//                 {...register("state", { required: true })}
//                 type="text"
//                 id="state"
//                 placeholder="State"
//                 className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//               />
//               {errors.state && <span>This field is required</span>}
//             </div>
//             <div className="form-group">
//               <label htmlFor="zipCode" className="text-sm font-semibold">
//                 Zip Code
//               </label>
//               <input
//                 {...register("zipcode", { required: true })}
//                 type="number"
//                 id="zipCode"
//                 placeholder="Zip Code"
//                 className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
//               />
//               {errors.zipcode && <span>This field is required</span>}
//             </div>
//             <div className="form-group col-span-2">
//               <label className="text-sm font-semibold">Address Type *</label>
//               <div className="mt-2 flex space-x-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     {...register("address_type", { required: true })}
//                     type="radio"
//                     value="Home"
//                     className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
//                   />
//                   <span className="text-gray-700">Home</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     {...register("address_type", { required: true })}
//                     type="radio"
//                     value="Work"
//                     className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
//                   />
//                   <span className="text-gray-700">Work</span>
//                 </label>
//               </div>
//               {errors.address_type && (
//                 <span className="text-red-500 text-sm">
//                   This field is required
//                 </span>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
//             >
//               Save address
//             </button>
//             {savedAddresses.length != [] && (
//               <button
//                 onClick={() => setShowNewAddressForm(false)}
//                 className="w-full py-3 bg-second text-white text-lg font-semibold hover:bg-yellow-600 transition-colors"
//               >
//                 Use existing address
//               </button>
//             )}
//           </form>
//         </div>
//       ) : (
//         <div className="border  gap-4 border-gray-300 p-6 mb-6 rounded-md">
//           {savedAddresses.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 className=" mx-auto flex  w-full justify-between border-2 rounded-xl p-4  my-2 text-gray-700"
//               >
//                 <div>
//                   <h2 className="text-lg font-semibold mb-2">
//                     <span className="font-semibold">Address:</span>{" "}
//                     {item.address}
//                   </h2>
//                   <p className="mb-1">
//                     <span className="font-semibold">Place:</span>{" "}
//                     {item.addressType}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Pincode:</span>{" "}
//                     {item.pincode}
//                   </p>
//                 </div>
//                 <input
//                   type="radio"
//                   id={`address_${index}`}
//                   {...register("address_id", { required: true })}
//                   value={item.id.toString()}
//                   checked={selectedAddress === item.id}
//                   onChange={() => handleAddressSelect(item.id)}
//                   className="bg-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-full"
//                 />
//               </div>
//             );
//           })}
//           <button
//             className="border-2 rounded-xl p-4 mx-auto my-2 text-gray-400 flex items-center justify-center hover:bg-gray-100 w-full"
//             onClick={() => setShowNewAddressForm(true)}
//           >
//             <Add fontSize="large" />
//           </button>
//         </div>
//       )}

//       <button
//         onClick={handleSubmit(onSubmit)}
//         className="w-full py-3 bg-second text-white rounded-md text-lg font-semibold hover:bg-yellow-600 transition-colors"
//       >
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
