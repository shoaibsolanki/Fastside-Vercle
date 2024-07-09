"use client";
import { useAuth } from "@/app/contexts/AuthConext";
import { useCart } from "@/app/contexts/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataService from "@/app/services/requestApi";
import { Add } from "@mui/icons-material";
const CheckoutPage = () => {
  const { authData, setIsPaymentSuccessful } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const id = authData?.data?.data?.customer_data?.id;

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
        "http://103.139.59.233:8089/prod/api/v1/rezar/pay/1",
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
    const addressForSave = {
      address: `${data.street},${data.city},${data.state},${data.zipcode} at ${data.address_type}`,
      address_type: data.address_type,
      street: data.street,
      store_id: "10001",
      saas_id: "1",
      pincode: data.zipcode,
      city: data.city,
      state: data.state,
      status: "Active",
      customer_type: "Regular",
    };

    await saveAddress(addressForSave);
    handleRazorpayPayment(data);
  };

  const handlePlaceOrder = async (data, paymentResponse) => {
    try {
      const orderInformations = {
        address_id: 697,
        customer_id: id,
        customer_name: `${data.first_name} ${data.last_name}`,
        mobile_number: data.Mobile_numbers,
        saas_id: "1",
        store_id: "10001",
        order_tax: 0,
        order_value: totalPrice,
        order_discount: 0,
        status: "pending",
        payment_type: "Online Payment",
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        order_date: new Date(),
        order_type: "",
        item_list: [
          {
            item_id: 1220178,
            item_name: "Freash Item",
            description: "New",
            price: 90,
            price_pcs: null,
            product_qty: 1,
            discount: 0,
            tax: null,
            tax_percent: 0,
            status: null,
            category: "MB",
            saas_id: "1",
            store_id: "10001",
            promo_id: null,
            image_name: null,
            hsn_code: "0",
            tax_rate: 0,
            barcode: null,
            supplier_name: null,
            opening_qty: 10,
            received_qty: null,
            sold_qty: null,
            closing_qty: null,
            product_cost: null,
            product_price: null,
            product_av_cost: null,
            mrp: null,
            sku: null,
            bill_qty: 0,
            name: "New",
            new_price: 90,
            discount_menu_is_open: null,
            discount_value: null,
            amount_value: null,
            zero_price: null,
            finalDisc: 0,
          },
        ],
      };

      const response = await DataService.CreateOrder(orderInformations);
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
      const response = await DataService.GetSavedAddress(id);
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
              {...register("mobile_numbers", { required: true })}
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

      {showNewAddressForm ? (
        <div className="border border-gray-300 p-6 mb-6 rounded-md bg-white shadow-md">
          {savedAddresses.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-2 rounded-xl p-4 mx-4 my-2 text-gray-700 bg-gray-100 shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  <span className="font-semibold">Address:</span> {item.address}
                </h2>
                <p className="mb-1">
                  <span className="font-semibold">Place:</span>{" "}
                  {item.addressType}
                </p>
                <p>
                  <span className="font-semibold">Pincode:</span> {item.pincode}
                </p>
              </div>
              <input
                type="radio"
                className="bg-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-full"
                checked={selectedAddress === item.id}
                onChange={() => handleAddressSelect(item.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 p-6 mb-6 rounded-md">
          {savedAddresses.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex justify-between border-2 rounded-xl p-4 mx-4 my-2 text-gray-700"
              >
                <div className=" ">
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
                  class="bg-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-full"
                />
              </div>
            );
          })}
          <button
            className="border-2 rounded-xl p-4 mx-4 my-2 text-gray-400 flex items-center justify-center hover:bg-gray-100 w-full"
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