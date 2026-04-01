import React, { useState } from "react";
import { Product } from "../types/product";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface Props {
  products: Product[];
  onFilterChange: (categories: string[], maxPrice: number) => void;
}

export const FilterSidebar: React.FC<Props> = ({
  products,
  onFilterChange,
}) => {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [selected, setSelected] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);

  const toggleCat = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const apply = () => {
    onFilterChange(selected, maxPrice);
  };

  return (
    <aside className="w-full max-w-xs space-y-6 p-4">
      <div>
        <h4 className="mb-2 font-semibold">Categorías</h4>
        {categories.map((c) => (
          <label key={c} className="flex items-center space-x-2">
            <Checkbox
              checked={selected.includes(c)}
              onChange={() => toggleCat(c)}
            />
            <span className="text-sm">{c}</span>
          </label>
        ))}
      </div>
      <div>
        <h4 className="mb-2 font-semibold">Precio máximo</h4>
        <Input
          type="number"
          value={maxPrice > 0 ? maxPrice : ""}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="0"
        />
      </div>
      <button
        onClick={apply}
        className="w-full rounded bg-kuromi-pink px-4 py-2 text-white hover:bg-kuromi-purple"
      >
        Aplicar
      </button>
    </aside>
  );
};
