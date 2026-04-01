"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useCart } from "../store/cartContext";

export const Navbar = () => {
  const { totalItems, openCart } = useCart();

  return (
    <nav className="bg-kuromi-dark shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold kuro-logo">
          KuromiShop
        </Link>
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <Input placeholder="Buscar productos..." />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <button
          onClick={openCart}
          className="relative rounded-full p-2 hover:bg-kuromi-light"
        >
          <ShoppingCart className="h-6 w-6 text-white" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1" variant="secondary">
                {totalItems}
              </Badge>
            )}
        </button>
      </div>
    </nav>
  );
};

