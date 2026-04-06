/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { FilterSidebar } from "../components/FilterSidebar";
import { ProductGrid } from "../components/ProductGrid";

export default function Home() {
  // Ahora el estado inicial es un array vacío
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Traemos la data que tú mismo creaste en /admin
    const savedGames = localStorage.getItem("my_games");
    
    if (savedGames) {
      const customItems = JSON.parse(savedGames);
      
      // Mapeamos al tipo Product para que el Grid no explote
      const formatted: Product[] = customItems.map((item: any, index: number) => ({
        id: `kuro-${index}-${Date.now()}`,
        name: item.name,
        price: 59.99,
        category: "Kuro-Stock",
        images: [item.imageUrl || "/placeholder.png"],
        stock: 1,
      }));

      setAllProducts(formatted);
      setFiltered(formatted);
    }
  }, []);

  const handleFilter = (categories: string[], maxPrice: number) => {
    let list = allProducts;
    if (categories.length) {
      list = list.filter((p) => categories.includes(p.category));
    }
    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice);
    }
    setFiltered(list);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-6 lg:flex-row">
      
      {/* Mobile Toggle con estilo Kuro */}
      <div className="lg:hidden flex justify-end">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="bg-kuro-secondary text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
        >
          {showFilters ? "✕ Cerrar" : "☰ Filtros"}
        </button>
      </div>

      {/* Sidebar de Filtros */}
      <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64`}>
        <div className="bg-white p-6 rounded-kuro shadow-sm border border-slate-200">
          <FilterSidebar products={allProducts} onFilterChange={handleFilter} />
        </div>
      </aside>

      {/* Grid Principal */}
      <main className="flex-1">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-kuro-dark tracking-tight">
            MY <span className="text-kuro-sidebar">COLLECTION</span>
          </h2>
          <div className="h-1 w-20 bg-kuro-secondary rounded-full mt-2"></div>
        </header>

        {allProducts.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-300 rounded-kuro-lg">
            <p className="text-lg font-medium">No hay productos en el inventario.</p>
            <p className="text-sm">Ve al panel de Admin para agregar tu primer juego.</p>
          </div>
        )}
      </main>
    </div>
  );
}