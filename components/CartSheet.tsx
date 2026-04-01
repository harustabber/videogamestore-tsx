"use client";

import React from "react";
import { useCart } from "../store/cartContext";
import { Button } from "./ui/button";

export const CartSheet = () => {
  const { items, open, closeCart, removeFromCart } = useCart();

  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeCart}
          />
          <div className="relative ml-auto w-full max-w-md bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tu carrito</h2>
              <button
                onClick={closeCart}
                className="text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-gray-600">No hay productos en el carrito.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((i) => (
                  <li key={i.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{i.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {i.quantity} × ${i.product.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeFromCart(i.product.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {items.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                <Button className="mt-4 w-full">Checkout</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
