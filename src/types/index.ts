// src/types/index.ts

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  location: string;
  role: "customer" | "seller";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  sellerId: string;
  image_url?: string;
}

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Cart {
  cartId: number;
  customerId: number;
  cartItems: CartItem[];
  totalPrice: number;
}

export interface Order {
  orderId: number;
  customerId: number;
  totalPrice: number;
  orderDate: string; // Format date-time
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  seller_id: string;
}
