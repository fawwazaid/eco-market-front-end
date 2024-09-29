"use client";

import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            At Eco Market, we are passionate about connecting you with the
            freshest and most sustainable local produce. Our mission is to
            bridge the gap between local farmers and consumers, offering a
            marketplace that champions organic and eco-friendly products.
          </p>
        </section>

        {/* Main Content Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src="/about1.jpg"
              alt="Local Market"
              width={500}
              height={200}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Experience Local Markets Like Never Before
            </h2>
            <p className="mb-3">
              Dive into a world where local cultures and traditional practices
              meet modern sustainability. Our platform brings you closer to the
              freshest produce, such as rice and chilies, directly from the
              farms to your table.
            </p>
            <p className="mb-4">
              We are dedicated to empowering local farmers and artisans by
              providing them with a platform to showcase their goods. By
              choosing Eco Market, you support the growth of local economies and
              contribute to a more sustainable future.
            </p>

            {/* Benefits Section */}
            <section className="space-y-4">
              <div className="flex items-start mb-2">
                <Image
                  src="/fresh.png"
                  alt="Benefit 1"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <div>
                  <h3 className="text-lg font-semibold">Fresh Products</h3>
                  <p className="text-sm text-gray-600">
                    Enjoy the freshest local products delivered straight from
                    the market.
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-2">
                <Image
                  src="/local.png"
                  alt="Benefit 2"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <div>
                  <h3 className="text-lg font-semibold">Support Local</h3>
                  <p className="text-sm text-gray-600">
                    Support local farmers and artisans with every purchase you
                    make.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src="/sustainable.png"
                  alt="Benefit 3"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <div>
                  <h3 className="text-lg font-semibold">Sustainable Living</h3>
                  <p className="text-sm text-gray-600">
                    Contribute to a greener planet with eco-friendly and
                    sustainable products.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Team and Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Top Row */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/leonard.jpg"
                alt="Leonard Abimanyu"
                width={180}
                height={180}
                className="rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">Leonard Abimanyu</h3>
              <p>Front End Developer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/michelyn.jpg"
                alt="Michelyn Angela"
                width={180}
                height={180}
                className="rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">Michelyn Angela</h3>
              <p>Front End Developer</p>
            </div>
            {/* Bottom Row */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/alvaro.png"
                alt="Alvaro"
                width={180}
                height={180}
                className="rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">Alvaro Septra</h3>
              <p>Back End Developer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/fawaz.jpg"
                alt="Aid Fawwaz"
                width={180}
                height={180}
                className="rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">Aid Fawwaz</h3>
              <p>Back End Developer</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
