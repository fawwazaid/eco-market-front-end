"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "@/services/api";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string()
    .min(2, "Your password is too weak, please enter a stronger password")
    .required("Please enter your password"),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    // console.log("Sending the following data to backend:", values); // Log the request data

    try {
      const response = await loginUser(values.email, values.password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("id", response.data.id); // Save token to localStorage
      console.log("Login successful");
      router.push("/products");
    } catch (error: any) {
      console.error("Login error", error);
      if (error.response) {
        // Log error response from the server
        console.error("Error response from server:", error.response.data);
      } else {
        // Log any other error (e.g., network error)
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {() => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Field
                type="text"
                name="email" // Update name to "email"
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 pl-3 pr-10 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your email" // Update placeholder
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password" // Keep the name as "password"
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 pl-3 pr-10 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your password"
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <div className="text-center text-sm text-gray-500">
            <Link href="/register" className="hover:underline">
              Don't have an account?
            </Link>
            <span className="mx-2 underline">|</span>
            <Link href="/" className="hover:underline">
              Go Back to Home
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
