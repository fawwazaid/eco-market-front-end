import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Voucher } from "@/types"; // Adjust the import path as necessary
import { addVoucher } from "@/services/api"; // Import the function to handle voucher creation

interface AddVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVoucher: (voucher: Omit<Voucher, "id">) => void;
}

const validationSchema = Yup.object({
  code: Yup.string().required("Voucher code is required"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .required("Discount percentage is required"),
});

const AddVoucherModal: React.FC<AddVoucherModalProps> = ({
  isOpen,
  onClose,
  onAddVoucher,
}) => {
  const formik = useFormik({
    initialValues: {
      code: "",
      discount: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting voucher with values:", values); // Add this line
        await addVoucher({
          code: values.code,
          discount: values.discount,
          seller_id: "your-seller-id", // Ensure you provide the correct seller ID
        });
        onAddVoucher({ ...values } as Omit<Voucher, "id">);
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error("Failed to add voucher", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Add Voucher</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Voucher Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.code && formik.errors.code ? (
              <div className="text-red-500 text-sm">{formik.errors.code}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Percentage
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discount}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-500 text-sm">
                {formik.errors.discount}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucherModal;
