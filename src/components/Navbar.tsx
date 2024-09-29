"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const disableNavbar =
    pathname.includes("/register") || pathname.includes("/login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      if (role === "seller") {
        setIsSeller(true);
      }
    } else {
      setIsAuthenticated(false);
      setIsSeller(false);
    }
  }, [pathname]);

  if (disableNavbar) return null;

  // Define button size based on pathname
  const getButtonSizeClasses = () => {
    return pathname === "/login" ? "py-2 px-6 text-lg" : "py-1 px-3 text-sm";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setIsSeller(false);
    router.push("/");
  };

  return (
    <nav className="bg-green-800 py-3 px-5 shadow-lg fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src="/paper-bag.png"
            alt="Eco Market Logo"
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="text-white text-lg font-semibold">
            <Link href="/">Eco Market</Link>
          </span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-green-500 font-bold"
                : "text-white hover:text-green-300"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`${
              pathname === "/about"
                ? "text-green-500 font-bold"
                : "text-white hover:text-green-300"
            }`}
          >
            About
          </Link>
          {isAuthenticated && (
            <>
              {isSeller && (
                <Link
                  href="/products/seller"
                  className={`${
                    pathname === "/products/seller"
                      ? "text-green-500 font-bold"
                      : "text-white hover:text-green-300"
                  }`}
                >
                  Seller
                </Link>
              )}
              <Link
                href="/products"
                className={`${
                  pathname === "/products"
                    ? "text-green-500 font-bold"
                    : "text-white hover:text-green-300"
                }`}
              >
                Products
              </Link>
              <Link
                href="/cart"
                className={`${
                  pathname === "/cart"
                    ? "text-green-500 font-bold"
                    : "text-white hover:text-green-300"
                }`}
              >
                Cart
              </Link>
              <button
                className={`border border-transparent rounded-md shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${getButtonSizeClasses()}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className={`${
                  pathname === "/login"
                    ? "text-green-500 font-bold"
                    : "text-white hover:text-green-300"
                }`}
              >
                Login
              </Link>
              <button
                className={`border border-transparent rounded-md shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${getButtonSizeClasses()}`}
                onClick={() => router.push("/register")}
              >
                Register Now
              </button>
            </>
          )}
        </div>
        <button
          className="md:hidden text-white"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 bg-green-800">
          <Link
            href="/"
            className={`block py-2 px-4 ${
              pathname === "/"
                ? "text-green-500 font-bold"
                : "text-white hover:bg-green-700"
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`block py-2 px-4 ${
              pathname === "/products"
                ? "text-green-500 font-bold"
                : "text-white hover:bg-green-700"
            }`}
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className={`block py-2 px-4 ${
              pathname === "/cart"
                ? "text-green-500 font-bold"
                : "text-white hover:bg-green-700"
            }`}
            onClick={toggleMenu}
          >
            Cart
          </Link>
          <Link
            href="/about"
            className={`block py-2 px-4 ${
              pathname === "/about"
                ? "text-green-500 font-bold"
                : "text-white hover:bg-green-700"
            }`}
            onClick={toggleMenu}
          >
            About
          </Link>
          {isAuthenticated && (
            <>
              {isSeller && (
                <Link
                  href="/products/seller"
                  className={`block py-2 px-4 ${
                    pathname === "/products/seller"
                      ? "text-green-500 font-bold"
                      : "text-white hover:bg-green-700"
                  }`}
                  onClick={toggleMenu}
                >
                  Seller
                </Link>
              )}
              <button
                className="block py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                onClick={() => {
                  handleLogout();
                  toggleMenu(); // Close menu after navigating
                }}
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className={`block py-2 px-4 ${
                  pathname === "/login"
                    ? "text-green-500 font-bold"
                    : "text-white hover:bg-green-700"
                }`}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <button
                className={`block py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${getButtonSizeClasses()}`}
                onClick={() => {
                  router.push("/register");
                  toggleMenu(); // Close menu after navigating
                }}
              >
                Register Now
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
