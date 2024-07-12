"use client"; // <===== REQUIRED
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const ImageSwitchProduct = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    const interval = setInterval(() => {
      if (swiper) {
        swiper.slideNext(); // Slide to the next image
      }
    }, 3000); // Slide every 3 seconds

    // Clear interval on component unmount or cleanup
    return () => clearInterval(interval);
  }, []); // Only run on initial mount

  const images = [
    "/imgs/slid1.jpg",
    "/imgs/slid2.jpg",
    "/imgs/slid3.jpg",
    "/imgs/slid4.jpg",
    "/imgs/slid5.jpg",
    "/imgs/slid6.jpg",
    "/imgs/slid7.jpg",
  ];

  const swiperStyles = {
    width: "100%",
    height: "550px",
    marginBottom: "50px",
  };
  const imgContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };
  const imgStyles = {
    maxWidth: "100%", // Adjusted for responsiveness
    height: "auto", // Maintain aspect ratio
    objectFit: "cover",
    borderRadius: "8px", // Rounded corners
    alignItem: "center",
  };

  const autoplayOptions = {
    delay: 2000, // Autoplay delay between slides
    disableOnInteraction: false, // Enable autoplay even when user interacts with swiper
  };

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={autoplayOptions}
      loop={true} // Enable looping through images
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="mySwiper"
      style={swiperStyles}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div style={imgContainerStyles}>
            <img
              src={image}
              className="rounded-3 "
              alt={`Slide ${index + 1}`}
              style={imgStyles}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwitchProduct;
