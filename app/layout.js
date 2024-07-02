"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {pathname !== "/login" && pathname !== "/Signup" ? (
          <div className="bg-white ">
            <Navbar />
            <main className="bg-white  mx-auto">{children}</main>
            <Footer />
          </div>
        ) : (
          <main className="bg-white  mx-auto">{children}</main>
        )}
      </body>
    </html>
  );
}
