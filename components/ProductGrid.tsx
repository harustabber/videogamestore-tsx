import React from "react";
import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
