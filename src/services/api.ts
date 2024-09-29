import axios from "axios";
import { User, Product, Cart, CartItem, Order, Voucher } from "../types";

const API_URL = "https://efficient-rejoicing-production.up.railway.app"; // Adjust with your backend URL

const api = axios.create({
  baseURL: API_URL,
});
// Add an interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as a retry to avoid infinite loops

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login"; // Redirect to login if no refresh token
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the access token
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("token", newAccessToken); // Update the access token

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, remove tokens and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Login function
export const loginUser = (email: string, password: string) => {
  return api.post("/login", { email, password });
};

// Registration function
export const registerUser = (user: User) => {
  return api.post("/register", user);
};

// Fetch all products
export const fetchProducts = () => {
  return api.get<Product[]>("/products");
};

// Fetch product by ID
export const fetchProductById = (productId: number) => {
  return api.get<Product>(`/products/${productId}`);
};

// Add product to cart
export const addToCart = (cartItem: Partial<CartItem>) => {
  return api.post("/cart", cartItem);
};

// Fetch cart by customer ID
export const fetchCart = (customerId: number) => {
  return api.get<Cart>(`/cart/${customerId}`);
};

// Fetch all orders by customer ID
export const fetchOrders = (customerId: number) => {
  return api.get<Order[]>(`/orders/${customerId}`);
};

// Fetch all products by seller (requires JWT)
export const fetchProductsBySeller = () => {
  return api.get<Product[]>("/products/seller");
};

// Add new product
export const addProduct = (product: Omit<Product, "id">) => {
  return api.post("/products", product);
};

// Update product by ID
export const updateProduct = (productId: string, product: Partial<Product>) => {
  return api.put(`/products/${productId}`, product);
};

// Delete product by ID
export const deleteProduct = (productId: number) => {
  return api.delete(`/products/${productId}`);
};
export const addVoucher = (voucherData: Omit<Voucher, "id">) => {
  return api.post("/vouchers", voucherData);
};

export const fetchVouchers = () => {
  return api.get("/vouchers");
};

export const deleteVoucher = (id: string) => {
  return api.delete(`/vouchers/${id}`);
};

export default api;
