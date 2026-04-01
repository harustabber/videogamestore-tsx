import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Cute Plushie",
    price: 25,
    images: ["https://via.placeholder.com/400x400?text=Plushie"],
    category: "Toys",
    stock: 12,
  },
  {
    id: "2",
    name: "Kuromi Headband",
    price: 12,
    images: ["https://via.placeholder.com/400x400?text=Headband"],
    category: "Accessories",
    stock: 0,
  },
  {
    id: "3",
    name: "Skull Brooch",
    price: 8,
    images: ["https://via.placeholder.com/400x400?text=Brooch"],
    category: "Jewelry",
    stock: 5,
  },
  {
    id: "4",
    name: "Plushie Keychain",
    price: 15,
    images: ["https://via.placeholder.com/400x400?text=Keychain"],
    category: "Accessories",
    stock: 20,
  },
  {
    id: "5",
    name: "Soft Blanket",
    price: 45,
    images: ["https://via.placeholder.com/400x400?text=Blanket"],
    category: "Home",
    stock: 3,
  },
];
