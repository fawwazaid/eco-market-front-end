// components/VoucherListModal.tsx
import React, { useEffect, useState } from "react";
import { Voucher } from "@/types";
import { fetchVouchers, deleteVoucher } from "@/services/api"; // Adjust import path

interface VoucherListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoucherListModal: React.FC<VoucherListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchAllVouchers = async () => {
        try {
          const response = await fetchVouchers();
          setVouchers(response.data);
        } catch (error) {
          console.error("Failed to fetch vouchers", error);
        }
      };

      fetchAllVouchers();
    }
  }, [isOpen]);

  const handleDeleteVoucher = async (id: string) => {
    try {
      await deleteVoucher(id);
      setVouchers(vouchers.filter((voucher) => voucher.id !== id));
    } catch (error) {
      console.error("Failed to delete voucher", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Vouchers List</h2>
        <button
          onClick={onClose}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Close
        </button>
        <ul>
          {vouchers.map((voucher) => (
            <li
              key={voucher.id}
              className="flex justify-between items-center mb-2 p-2 border-b"
            >
              <span>
                {voucher.code} - {voucher.discount}%
              </span>
              <button
                onClick={() => handleDeleteVoucher(voucher.id)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoucherListModal;
