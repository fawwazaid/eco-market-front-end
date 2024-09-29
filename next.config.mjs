// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com",
        port: "",
        pathname: "/**",
      },
      // Add other allowed domains here
    ],
    domains: [
      "pikbest.com",
      "assets.example.com",
      "images.unsplash.com",
      "www.istockphoto.com",
      "www.google.com",
      "img.pikbest.com",
      "res.cloudinary.com",
      // Add more domains as needed
    ],
  },
};

export default nextConfig;
