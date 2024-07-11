import Image from "next/image";
import React from "react";
import google from "../../public/imgs/Vector.png";
import facebook from "../../public/imgs/facebook.png";
import whatsapp from "../../public/imgs/whatsapp.png";
import sendIcon from "../../public/imgs/send-2.png";
import headphones from "../../public/imgs/headphone.png";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-light text-primary p-10 ">
      <section
        id="subscribe"
        className="bg-white p-8 my-4 rounded-xl flex flex-col md:flex-row justify-evenly items-center space-y-4 md:space-y-0 md:space-x-4 max-w-[1600px] mx-auto"
      >
        <h2 className="text-3xl font-semibold capitalize text-center md:text-left">
          Subscribe FastSide
        </h2>
        <div className="bg-second flex p-4 rounded-xl w-full md:w-auto">
          <input
            className="bg-second text-white outline-none placeholder:text-white flex-1"
            placeholder="Enter Your Email"
          />
          <button className="ml-4">
            <Image src={sendIcon} alt="send-your-email" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Image src={headphones} alt="Call-us-now" />
          <div>
            <h3 className="text-md font-semibold">Call us 24/7</h3>
            <h3 className="text-md font-semibold ">(+91) 775-582-1175</h3>
          </div>
        </div>
      </section>

      <div className="footer ">
        <aside>
          <h2 className="text-4xl font-bold">FastSide</h2>
          <p className=" border-b-[1px] border-primary  pb-4">
            1123, flate no , district, state ,
            <br /> country
          </p>
          <div className="flex gap-8 my-4 ">
            <Image src={google} alt="google_link" />
            <Image src={facebook} alt="facebook_link" />
            <Image src={whatsapp} alt="whatsapp_link" />
          </div>
        </aside>

        <nav>
          <h6 className="footer-title">Find product</h6>{" "}
          <a className="link link-hover">Lanyards </a>
          <a className="link link-hover">Badge Reels</a>
          <a className="link link-hover">Badge Holders</a>
        </nav>
        <nav>
          <Link href="/about" className="footer-title underline">
            About & Policy
          </Link>{" "}
          <p className="link link-hover">Return policy</p>
          <p className="link link-hover">Privacy policy</p>
          <p className="link link-hover">Payment policy</p>
        </nav>
        <nav>
          <Link href="/gethelp" className="footer-title underline">
            Get Help
          </Link>
          {/* <a className="link link-hover">News</a> */}
          <a className="link link-hover">Custmer care</a>
          <a className="link link-hover">Faq’s</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
