"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataService from "../services/requestApi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthConext";
import Cookies from "js-cookie";
import Image from "next/image";
import { Alert } from "@mui/material";

const Page = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await DataService.Login(data);
      const redirectUrl = sessionStorage ?? sessionStorage.getItem("redirectAfterLogin");
      if (response.data.status) {
        const token = response.data.data.jwt_response;
        const user = response.data.data.customer_data;

        if (token && user) {
          login(user, token);

          setUser(response.data);
          if (redirectUrl) {
            sessionStorage.removeItem("redirectAfterLogin");
            router.push(redirectUrl);
          } else {
            router.push("/");
          }
        } else {
          console.error("Token or user data is missing");
          setErrorAlert(true);
          setError("User not found. Email or Password incorrect");
        }
      } else {
        console.error("Login response status is false");
        setErrorAlert(true);
        setError("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorAlert(true);
      setError("User not found. Email or Password incorrect");
    }
  };

  //redirect user to the homePage if user is already logged in
  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center w-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="shadow-2xl mx-4 md:mx-10 rounded-lg bg-white h-auto md:h-[80vh] w-full sm:w-[90%] md:w-[80vh] flex flex-col justify-center items-center p-4 md:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3 py-4 w-full"
        >
          <h1 className="font-bold text-dark text-xl">Sign In</h1>
          <input
            {...register("user_name", { required: true })}
            className="border-2 bg-white rounded h-9 w-full md:w-80 focus-visible:outline-none focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
            type="text"
            placeholder="Email"
          />
          {errors.user_name && (
            <p className="text-red-500">Email is required</p>
          )}
          <input
            {...register("password", { required: true })}
            className="border-2 rounded h-9 w-full md:w-80 focus-visible:outline-none bg-white focus-visible:bg-lightPrimary focus-visible:text-primary px-2"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <input
            disabled={isSubmitting}
            className="border rounded-3xl h-9 w-full md:w-80 bg-primary text-white focus-visible:outline-none  transition-transform duration-500 cursor-pointer italic font-semibold"
            type="submit"
            value="Login"
          />
          <p>
            Don't have an account?{" "}
            <Link className="hover:text-second font-medium" href="/Signup">
              Register
            </Link>
          </p>
          {errorAlert && <Alert severity="error">{error}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default Page;

{
  /* <div className="flex justify-around w-[50vh] text-gray-400 gap-5">
  <div className="checkbox-wrapper">
    <input id="terms-checkbox-37" name="checkbox" type="checkbox" />
    <label className="terms-label" htmlFor="terms-checkbox-37">
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
  <Link href="/forgot-password" className="hover:text-primary">
    Forget Password
  </Link>
</div> */
}
