import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

const SellerCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const defaultImageUrl = "/paper-bag.png";

  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);

  useEffect(() => {
    const loadImage = async () => {
      if (
        product.image_url &&
        (product.image_url.startsWith("http://") ||
          product.image_url.startsWith("https://"))
      ) {
        try {
          const response = await fetch(product.image_url, { method: "HEAD" });
          if (response.ok) {
            setImageUrl(product.image_url);
          } else {
            setImageUrl(defaultImageUrl);
          }
        } catch (error) {
          setImageUrl(defaultImageUrl);
        }
      } else {
        setImageUrl(defaultImageUrl);
      }
    };

    loadImage();
  }, [product.image_url]);

  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-72">
        {" "}
        {/* Adjust height as needed */}
        <Image
          src={imageUrl}
          alt={product.name}
          layout="fill" // Ensures the image covers the container
          className="object-cover" // Maintains aspect ratio
          onError={() => setImageUrl(defaultImageUrl)} // Fallback in case of error
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-4">
          Price: $
          {product.price !== undefined ? product.price.toFixed(2) : "0.00"}
        </p>
        <p className="text-sm mb-2">Quantity: {product.quantity}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default SellerCard;
