"use client";

import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* About Section */}
          <div>
            <h4 className="text-md font-semibold mb-2">About Us</h4>
            <p className="text-sm">
              Eco Market connects local farmers and artisans with consumers,
              promoting sustainability and fresh, eco-friendly products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-gray-300">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-md font-semibold mb-2">Contact Us</h4>
            <ul className="text-sm space-y-1">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@ecomarket.com"
                  className="hover:text-gray-300"
                >
                  info@ecomarket.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-gray-300">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-300">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Image
                  src="/twitter.png"
                  alt="Twitter"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Image
                  src="/youtube.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-3 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} Eco Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
