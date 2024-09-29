import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductModal from './ProductModal';
import styles from './ProductCard.module.css';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: {
    id: number;
    image: string;
    category: string;
    name: string;
    rating?: number;
    price: number;
  };
  oldPrice?: string;
  discount?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  oldPrice,
  discount,
  onAddToCart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cart = useCart();

  return (
    <>
      <div className="col-lg-4 col-sm-6">
        <div
          className={`${styles.verticalProductCard} rounded-2 position-relative`}
          onClick={handleCardClick}
        >
          {discount && (
            <span className={`${styles.offerBadge} text-white fw-bold`}>
              {discount}
            </span>
          )}
          <div className={styles.thumbnail}>
            <Image
              src={product.image}
              alt={product.name}
              layout="responsive"
              width={550}
              height={400}
              className={styles.featureImg}
            />
          </div>
          <div className={styles.cardContent}>
            <Link href={`/product-category/${product.category}`} className="d-inline-block text-secondary mb-2">
              {product.category}
            </Link>
            <Link href={`/product/${product.id}`} className={styles.productName}>
              {product.name}
            </Link>
            <h6 className={styles.price}>
              {oldPrice && <del className={styles.oldPrice}>${oldPrice}</del>}
              <ins className={styles.newPrice}>${product.price}</ins>
            </h6>
            <button
              className={styles.addToCartButton}
              onClick={(e) => {
                e.stopPropagation();  // Prevent button click from triggering card click
                cart.addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={{
            name: product.name,
            description: "Product description here", // Replace with actual data
            price: product.price,
            category: product.category,
            quantity: 1,
            ecoFriendly: true,
            image: product.image,
          }}
          onAddToCart={(quantity) => {
            closeModal();
            cart.addToCart(product);
          }}
        />
      )}
    </>
  );
};

export default ProductCard;
