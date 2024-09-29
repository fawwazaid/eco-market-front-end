import { useState, useEffect } from "react";
import { fetchProducts, addToCart } from "@/services/api";
import { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart({ productId, quantity: 1 }); // Adjust quantity as needed
      alert("Product added to cart");
    } catch (error) {
      console.error("Failed to add product to cart", error);
    }
  };

  return { products, loading, handleAddToCart };
}
