"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState<Cart>({
    cartId: 1,
    customerId: 123,
    cartItems: [],
    totalPrice: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from your API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data.products); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("cart");
      const parsedCartData = JSON.parse(cartData || "{}");
      setCart(parsedCartData);
    }
  }, []);

  const handleAddToCart = (product: any, quantity: number = 1) => {
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
  };

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-gray-100">
        <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
          <div className="woocommerce-notices-wrapper"></div>
          {cart.cartItems.length === 0 ? (
            <div className="wc-empty-cart-message text-center">
              <div className="wc-block-components-notice-banner is-info flex items-center justify-center bg-blue-100 p-4 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  focusable="false"
                  className="mr-3"
                >
                  <path d="M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"></path>
                </svg>
                <div className="wc-block-components-notice-banner__content text-gray-800">
                  Your cart is currently empty.
                </div>
              </div>
              <p className="return-to-shop mt-4">
                <button
                  className="button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => router.push("/products")}
                >
                  Back to products
                </button>
              </p>
            </div>
          ) : (
            <div>
              <ul>
                {cart.cartItems.map((item) => (
                  <li key={item.cartItemId} className="mb-2">
                    Product ID: {item.productId}, Quantity: {item.quantity},
                    Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold mt-4">
                Total Price: ${cart.totalPrice.toFixed(2)}
              </p>
              <div className="return-to-shop mt-4">
                <button
                  className="button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => router.push("/products")}
                >
                  Back to products
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
