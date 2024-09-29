import React, { useState } from "react";
import { updateProduct } from "@/services/api";
import { Product } from "@/types";

type SellerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

const SellerModal: React.FC<SellerModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<number>(product.price);
  const [description, setDescription] = useState<string>(product.description);
  const [imageUrl, setImageUrl] = useState<string>(product.image_url || '');

  if (!isOpen) return null;

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(product.id, {
        quantity,
        name,
        price,
        description,
        image_url: imageUrl,
      });
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div
      key={product.id}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <span className="text-sm mb-2">Quantity</span>
          <div className="flex items-center">
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l text-sm"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              className="w-16 text-center border-0 bg-gray-100 text-gray-700 mx-1 py-1 rounded"
              readOnly
            />
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r text-sm"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default SellerModal;
