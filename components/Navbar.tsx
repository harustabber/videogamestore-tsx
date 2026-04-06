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
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100]">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        
        <Link href="/" className="text-2xl kuro-logo">
          KUROMI<span className="text-kuro-secondary font-extrabold font-sans">SHOP</span>
        </Link>

        <div className="flex flex-1 items-center justify-center px-4 md:px-12">
          <div className="relative w-full max-w-md">
            <Input 
              placeholder="Buscar en la tienda..." 
              className="bg-slate-100 border-none rounded-xl pl-4 pr-10 focus-visible:ring-2 focus-visible:ring-kuro-sidebar/50"
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative rounded-xl p-2 bg-slate-100 hover:bg-kuro-secondary/10 transition-all group"
          >
            <ShoppingCart className="h-6 w-6 text-slate-600 group-hover:text-kuro-secondary" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-kuro-secondary hover:bg-kuro-secondary border-2 border-white">
                {totalItems}
              </Badge>
            )}
          </button>
          
          {/* Avatar de usuario para que se parezca más al dashboard de la foto */}
          <div className="w-10 h-10 rounded-full bg-kuro-sidebar flex items-center justify-center text-white font-bold text-xs shadow-sm border-2 border-white">
            V
          </div>
        </div>
      </div>
    </nav>
  );
};