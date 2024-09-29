import React, { useState } from "react";
import api from "@/services/api";

const AddVoucher: React.FC = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<number | string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/vouchers", { code, discount });
      alert(response.data.message);
      setCode("");
      setDiscount("");
    } catch (error) {
      console.error("Error adding voucher:", error);
      alert("Failed to add voucher");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Voucher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Voucher Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Percentage
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="0"
            max="100"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Voucher
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;
