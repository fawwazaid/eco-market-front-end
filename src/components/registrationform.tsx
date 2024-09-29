"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      location: "",
      role: "customer", // Default userType
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be at least 8 characters")
        .required("Password is required"),
      location: Yup.string().required("Location is required"),
      role: Yup.string()
        .oneOf(["customer", "seller"], "Invalid user type")
        .required("User type is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Send the data in the format the backend expects
        const response = await registerUser({
          id: "test",
          username: values.username,
          email: values.email,
          password: values.password, // Password is sent as plain text; backend should handle hashing
          location: values.location,
          role: values.role as "customer" | "seller", // Ensure the role is mapped to userType
        });
        console.log("Registration successful", response.data);
        router.push("/login");
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error("Registration failed", error);
        // Handle registration error (e.g., show error message)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.username}
          </div>
        ) : null}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Password */}
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <div
          className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-500" />
          ) : (
            <FaEye className="text-gray-500" />
          )}
        </div>
        {/* <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 py-1"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button> */}
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.location}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {formik.touched.location && formik.errors.location ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.location}
          </div>
        ) : null}
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register
      </button>

      <div className="mt-4">
        <div className="text-center text-sm text-gray-500">
          <Link href="/login" className="hover:underline">
            already have an account?
          </Link>
          <div className="my-2"></div>
          <Link href="/" className="hover:underline">
            Go Back to Home
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
