"use client";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { useImageStore } from "@/hooks/useImageStore";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    image_url: string;
    sellerId: string;
  }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const { images } = useImageStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState<any>({});

  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (images.length > 0) {
      setImageURL(images[0]);
    }
  }, [images]);

  if (!isOpen || !userId) return null;

  const validateForm = () => {
    const newErrors: any = {};

    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price || isNaN(Number(price)))
      newErrors.price = "Price is required and must be a number";
    if (!category) newErrors.category = "Category is required";
    if (quantity <= 0) newErrors.quantity = "Quantity must be greater than 0";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && userId) {
      const validImageUrl = imageURL || images[0] || "default-image-url";

      onAddProduct({
        name,
        description,
        price: parseFloat(price),
        category,
        quantity,
        image_url: validImageUrl,
        sellerId: userId,
      });
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form>
          {/* Form fields for product details */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              min="0"
            />
            {errors.price && (
              <p className="text-red-600 text-sm">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select a category</option>
              <option value="ecofriendly">Eco-Friendly</option>
              <option value="organic">Organic</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
              min="1"
            />
            {errors.quantity && (
              <p className="text-red-600 text-sm">{errors.quantity}</p>
            )}
          </div>
          <div className="mb-4">
            <ImageUpload onUpload={(url) => setImageURL(url)} />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
