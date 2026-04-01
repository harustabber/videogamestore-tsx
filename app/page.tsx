"use client";

import { useState } from "react";
import { products as allProducts } from "../data/products";
import { Product } from "../types/product";
import { FilterSidebar } from "../components/FilterSidebar";
import { ProductGrid } from "../components/ProductGrid";

export default function Home() {
  const [filtered, setFiltered] = useState<Product[]>(allProducts);

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

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-4 lg:flex-row">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="rounded bg-kuromi-pink px-4 py-2 text-white"
        >
          {showFilters ? "Cerrar filtros" : "Filtros"}
        </button>
      </div>
      <div
        className={
          showFilters
            ? "w-full lg:w-auto block lg:block"
            : "w-full lg:w-auto hidden lg:block"
        }
      >
        <FilterSidebar products={allProducts} onFilterChange={handleFilter} />
      </div>
      <main className="flex-1">
        <ProductGrid products={filtered} />
      </main>
    </div>
  );
}
