"use client";
import Link from "next/link";
import React, { useState } from "react";
import DataService from "../services/requestApi";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthConext";
import { useRouter } from "next/navigation";
// import Toast from "../components/Toast";
import Success from "../../public/svgs/Success.svg";
import Image from "next/image";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address_3: "Building 5",
      discount_percent: 10.0,
      saas_id: "1",
      store_id: "10001",
      sub_centre_id: 1,
      card_number: Math.ceil(Math.random() * 10),
      city: "",
      state: "",
      country: "India",
      preferred_language: "English",
      customer_since: "2020-01-01",
      payment_terms: 30,
      credit_limit: 10000.0,
      sales_representative: "Jane Smith",
    },
  });
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const handleToast = (message, title) => {
    setToastMessage(message);
    setToastTitle(title);
    setOpenToast(true);
  };

  const SignUp = async (data) => {
    try {
      const response = await DataService.Signup(data);
      console.log(response.data);
      if (response?.data?.status) {
        handleToast("success", "Account Created Now You can  Login");
        setSignupSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        setTimeout(() => {
          setSignupSuccess(false);
        }, 6000);
      } else {
        handleToast("warning", "Something Went Wrong Please Try Again!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      handleToast("success", "error");
    }
  };

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center w-full min-md:justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {signupSuccess ? (
        <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-lightPrimary h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center overflow-auto p-4">
          <Image src={Success} width="200" height="200" alt="login success" />
          <h2 className="text-2xl text-second font-semibold underline text-center px-4">
            SignUp Successful! You'll be redirected to the Login Page
          </h2>
        </div>
      ) : (
        <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-white h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center overflow-auto p-4">
          <form
            onSubmit={handleSubmit(SignUp)}
            className="flex flex-col items-center gap-3 py-4 w-full"
          >
            <h1 className="font-bold drop-shadow-md text-xl mb-4">
              Create Account
            </h1>
            <div className="grid grid-cols-1 gap-3 w-full px-2 sm:px-6 md:grid-cols-2 max-md:max-h-[300px] overflow-y-auto">
              <input
                {...register("name")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Name"
              />
              <input
                {...register("email")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="password"
                placeholder="Password"
              />
              <input
                {...register("mobile_number")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Mobile Number"
              />
              <input
                {...register("dob")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="date"
                placeholder="Date of Birth"
              />
              <input
                {...register("address_1")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Address 1"
              />
              <input
                {...register("address_2")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Address 2"
              />
              <select
                {...register("gender")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                {...register("occupation")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Occupation"
              />
              <input
                {...register("income_level")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Income Level"
              />
              <input
                {...register("source_of_acq")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Source of Acquisition"
              />
              <input
                {...register("customer_type")}
                className="border-2 bg-white rounded h-9 w-full focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
                type="text"
                placeholder="Customer Type"
              />
            </div>
            {/* <div className="flex justify-around w-full text-gray-400 gap-5 mt-4 px-2 sm:px-6">
              <div className="checkbox-wrapper flex items-center">
                <input id="terms-checkbox-37" name="checkbox" type="checkbox" />
                <label className="terms-label ml-2" htmlFor="terms-checkbox-37">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 200 200"
                    className="checkbox-svg"
                  >
                    <mask fill="white" id="path-1-inside-1_476_5-37">
                      <rect height="200" width="200"></rect>
                    </mask>
                    <rect
                      mask="url(#path-1-inside-1_476_5-37)"
                      strokeWidth="40"
                      className="checkbox-box"
                      height="200"
                      width="200"
                    ></rect>
                    <path
                      strokeWidth="15"
                      d="M52 111.018L76.9867 136L149 64"
                      className="checkbox-tick"
                    ></path>
                  </svg>
                  <span className="label-text">Remember Me</span>
                </label>
              </div>
              <span>Forget Password</span>
            </div> */}
            <input
              disabled={isSubmitting}
              className="border rounded-3xl h-9 w-full md:w-80 bg-primary italic font-semibold  cursor-pointer text-white focus-visible:outline-none  transition-transform duration-500 mt-4"
              type="submit"
              value="Signup"
            />
            <p className="mt-4 text-center">
              Already Have Account?{" "}
              <Link className="hover:text-second font-medium" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
      {/* <Toast
    message={toastMessage}
    setOpenToast={setOpenToast}
    openToast={openToast}
    title={toastTitle}
  /> */}
    </div>
  );
};

export default Signup;
