"use client";

// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthConext";
import { CartProvider } from "./contexts/CartContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {pathname !== "/login" && pathname !== "/Signup" ? (
              <div className="bg-white w-full ">
                <Navbar />
                <main className="bg-white  w-full max-w-[1600px] mx-auto px-4 ">
                  {children}
                </main>
                <Footer />
              </div>
            ) : (
              <main className="bg-white  mx-auto p-11">{children}</main>
            )}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
