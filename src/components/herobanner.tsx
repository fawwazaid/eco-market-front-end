"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import Autoplay CSS
import { FaStar } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HeroBanner = () => {
  const clientFeedbacks = [
    {
      image: "/client-1.png",
      name: "Louis. G",
      feedback: "Great products and amazing service!",
      rating: 5,
    },
    {
      image: "/client-2.png",
      name: "Marchel Lee",
      feedback: "The best organic food I've ever had!",
      rating: 4,
    },
    {
      image: "/client-3.png",
      name: "Fred Joe",
      feedback: "Highly recommend this market!",
      rating: 5,
    },
    {
      image: "/client-4.png",
      name: "Connor",
      feedback: "Fresh and healthy products. Love it!",
      rating: 4,
    },
    {
      image: "/client-5.png",
      name: "Noah Red",
      feedback: "Amazing quality and very fresh!",
      rating: 5,
    },
  ];

  return (
    <>
      {/* Section 1: Hero Banner */}
      <section className="hero-banner bg-[#006450] py-24">
        <div className="hero-content text-center text-white px-4">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Discover Freshness: Your Local Market for Organic Goodness
          </h1>
          <p className="mt-4 text-xl font-semibold text-orange-400">
            100% Organic Food Provided
          </p>
          <p className="mt-8 text-md text-gray-300">
            Your purchase helps local farmers and artisans thrive, boosting the
            local economy and preserving traditional farming practices.
          </p>
          <div className="mt-12">
            <a
              href="/products" // Mengarahkan ke halaman produk
              className="inline-flex items-center px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              <span className="mr-2">Shop Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Categories */}
      <section className="features bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            Featured Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            <div className="feature-item p-4 border rounded-lg shadow-lg flex flex-col items-center">
              <Image
                src="/veggy.png"
                alt="Vegetable"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">Vegetable</h3>
            </div>
            <div className="feature-item p-4 border rounded-lg shadow-lg flex flex-col items-center">
              <Image
                src="/apple.png"
                alt="Fruits"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">Fruits</h3>
            </div>
            <div className="feature-item p-4 border rounded-lg shadow-lg flex flex-col items-center">
              <Image
                src="/meat.png"
                alt="Meat"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">Meat</h3>
            </div>
            <div className="feature-item p-4 border rounded-lg shadow-lg flex flex-col items-center">
              <Image
                src="/milk.png"
                alt="Milk"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">Milk</h3>
            </div>
            <div className="feature-item p-4 border rounded-lg shadow-lg flex flex-col items-center">
              <Image
                src="/rice1.png"
                alt="Rice"
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">Rice</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What Our Clients Say */}
      <section className="testimonials bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            What Our Clients Say
          </h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000 }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            {clientFeedbacks.map((client, index) => (
              <SwiperSlide key={index}>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-full mb-4"
                  />
                  <p className="text-lg italic mb-4">"{client.feedback}"</p>
                  <h4 className="text-xl font-semibold">{client.name}</h4>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: client.rating }, (_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
