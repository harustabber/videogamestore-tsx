import React from "react";
import { Product } from "../types/product";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../store/cartContext";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (product.stock > 0) addToCart(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#d7dcf6] bg-white shadow-lg hover:shadow-2xl max-w-[320px] mx-auto">
      <div className="h-80 w-full overflow-hidden rounded-[1.75rem] bg-kuromi-light">
        <img
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-700">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-auto">
          {product.stock === 0 ? (
            <Badge variant="outline" className="text-red-600">
              Out of Stock
            </Badge>
          ) : (
            <Button
              className="mt-4 w-full"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
