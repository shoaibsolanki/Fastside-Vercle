"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const [billingAddress, setBillingAddress] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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
              {...register("first_name")}
              type="text"
              id="firstName"
              placeholder="First name"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="text-sm font-semibold">
              Last Name
            </label>
            <input
              {...register("last_name")}
              type="text"
              id="lastName"
              placeholder="Last name"
              className="bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
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
              <option value="India">india</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
            </select>
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
          </div>
          {/* <div className="form-group col-span-2 flex items-center">
            <input
              type="checkbox"
              id="billingAddress"
              checked={billingAddress}
              onChange={() => setBillingAddress(!billingAddress)}
              className="mr-2"
            />
            <label htmlFor="billingAddress" className="text-sm font-semibold">
              Use a different billing address (optional)
            </label>
          </div> */}
        </form>
      </div>

      {/* <div className="border border-gray-300 p-6 mb-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <form className="grid grid-cols-1 gap-4">
          <div className="form-group">
            <input
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              className="mr-2"
            />
            <label htmlFor="creditCard" className="text-sm font-semibold">
              Pay by Card Credit
            </label>
          </div>
          <div className="form-group">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              className="mr-2"
            />
            <label htmlFor="paypal" className="text-sm font-semibold">
              Paypal
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber" className="text-sm font-semibold">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate" className="text-sm font-semibold">
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              placeholder="MM/YY"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvc" className="text-sm font-semibold">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              placeholder="CVC code"
              className=" bg-white mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </form>
      </div> */}

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
