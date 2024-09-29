// src/components/CartContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, Cart } from "@/types";

interface CartContextType {
  cart: Cart;
  addToCart: (product: any, quantity?: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    cartId: 1,
    customerId: 123,
    cartItems: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: any, quantity: number = 1) => {
    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === product.id
    );

    let updatedCartItems: CartItem[];

    if (existingCartItem) {
      updatedCartItems = cart.cartItems.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newCartItem: CartItem = {
        cartItemId: cart.cartItems.length + 1,
        cartId: cart.cartId,
        productId: product.id,
        quantity,
        price: product.price,
      };
      updatedCartItems = [...cart.cartItems, newCartItem];
    }

    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice: updatedTotalPrice,
    });
    localStorage.setItem(
      "cart",
      JSON.stringify({
        ...cart,
        cartItems: updatedCartItems,
        totalPrice: updatedTotalPrice,
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
