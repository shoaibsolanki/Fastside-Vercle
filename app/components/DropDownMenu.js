"use client";
import React, { useState } from "react";
// import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { ChevronDownIcon } from "@heroicons/react/solid";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {/* Dropdown toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-second text-white font-semibold h-full flex items-center px-4 text-lg"
      >
        Browse Category <KeyboardArrowDownRounded fontSize="large" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 dark:bg-gray-800"
        >
          <div className="py-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold" href="#">
                  Sara Salah
                </span>{" "}
                replied on the{" "}
                <span className="text-blue-500 hover:underline" href="#">
                  Upload Image
                </span>{" "}
                article . 2m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold" href="#">
                  Slick Net
                </span>{" "}
                start following you . 45m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold" href="#">
                  Jane Doe
                </span>{" "}
                Like Your reply on{" "}
                <span className="text-blue-500 hover:underline" href="#">
                  Test with TDD
                </span>{" "}
                article . 1h
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold" href="#">
                  Abigail Bennett
                </span>{" "}
                start following you . 3h
              </p>
            </a>
          </div>
          <a
            href="#"
            className="block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline"
          >
            See all notifications
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
