"use client";
import { useAuth } from "@/app/contexts/AuthConext";
import { useCart } from "@/app/contexts/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { setIsPaymentSuccessful } = useAuth();
  console.log();
  const { totalPrice, clearCart } = useCart();
  const [billingAddress, setBillingAddress] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

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
        "http://103.139.59.233:8089/prod/api/v1/rezar/pay/1",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${"rzp_test_USk6kNFvt2WXOE"}:${"afZsDDDaTvqhZPxMLH1p0b2t"}`
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
      console.log(orderId);
      const options = {
        key: "rzp_test_USk6kNFvt2WXOE",
        amount: totalPrice * 100,
        currency: "INR",
        name: "IB Shoppy",
        description: "Test Transaction",
        image: "",
        order_id: orderId,
        handler: function (response) {
          console.log(response);
          setIsPaymentSuccessful(true); // Update payment status
          router.push("/cart/checkout/summary");
          clearCart();
        },
        prefill: {
          name: formData.first_name + " " + formData.last_name,
          email: formData.email,
          contact: formData.Mobile_numbers,
        },
        notes: {
          address: formData["Street Address"],
        },
        theme: {
          color: "#00B207",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error handling Razorpay payment:", error);
    }
  };

  const onSubmit = (data) => {
    handleRazorpayPayment(data);
  };

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
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
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
          <div className="form-group col-span-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold">
              Phone Number
            </label>
            <input
              {...register("Mobile_numbers", { required: true })}
              type="number"
              id="phoneNumber"
              placeholder="Phone number"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.Mobile_numbers && <span>This field is required</span>}
          </div>
          <div className="form-group col-span-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Your Email"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.email && <span>This field is required</span>}
          </div>
        </form>
      </div>

      <div className="border border-gray-300 p-6 mb-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group col-span-2">
            <label htmlFor="streetAddress" className="text-sm font-semibold">
              Street Address *
            </label>
            <input
              {...register("Street Address", { required: true })}
              type="text"
              id="streetAddress"
              placeholder="Street Address"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors["Street Address"] && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="country" className="text-sm font-semibold">
              Country *
            </label>
            <select
              {...register("country", { required: true })}
              id="country"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
            </select>
            {errors.country && <span>This field is required</span>}
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
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
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
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
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
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.zipcode && <span>This field is required</span>}
          </div>
        </form>
      </div>

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
