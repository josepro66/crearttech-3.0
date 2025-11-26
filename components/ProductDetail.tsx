import React from 'react';
import { Product } from '../types';
import ProductConfigurator from './ProductConfigurator';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  // Renderizar directamente el configurador
  return (
    <ProductConfigurator
      product={product}
      onClose={onBack}
      onAddToCart={onAddToCart}
    />
  );
};

export default ProductDetail;