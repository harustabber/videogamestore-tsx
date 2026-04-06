/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { StatCard } from "../../components/dashboard/StatCard";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function AdminPage() {
  const [items, setItems] = useState<{ name: string; imageUrl: string }[]>([]);
  const [newItem, setNewItem] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("my_games");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const handleAddItem = () => {
    if (!newItem || !imageUrl) return alert("Rellena todo, fiera");
    const updated = [...items, { name: newItem, imageUrl }];
    setItems(updated);
    localStorage.setItem("my_games", JSON.stringify(updated));
    setNewItem("");
    setImageUrl("");
  };

  // 1. Añade esta función dentro de AdminPage
  const handleDeleteItem = (indexToDelete: number) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
    localStorage.setItem("my_games", JSON.stringify(updatedItems));
  };

  return (
    <div className="flex min-h-screen bg-[#eef0ff]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <div className="rounded-[3rem] bg-white/80 p-6 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl border border-white/70">
          <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-kuro-secondary/90">
                Gestión de Tienda
              </p>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Kuro Dashboard</h1>
            </div>
            <div className="rounded-full bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-white/70">
              Bienvenido, administra tu inventario con estilo.
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr] mb-10">
            <div className="grid gap-6">
              <StatCard title="Inventario Actual" color="primary">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-bold">{items.length}</span>
                  <p className="text-white/80 text-sm">Productos registrados</p>
                </div>
              </StatCard>
            </div>
            <StatCard title="Añadir Rápido" color="secondary">
              <div className="space-y-4">
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Nombre..."
                  className="w-full rounded-[1.5rem] border border-white/40 bg-white/15 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none shadow-inner backdrop-blur"
                />
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL Imagen..."
                  className="w-full rounded-[1.5rem] border border-white/40 bg-white/15 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none shadow-inner backdrop-blur"
                />
                <button
                  onClick={handleAddItem}
                  className="w-full rounded-[1.5rem] bg-white py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  GUARDAR
                </button>
              </div>
            </StatCard>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            {/* 2. En el map de tus productos, añade el botón de borrar (puedes usar FiTrash) */}
            {items.map((item, index) => (
              <div key={index} className="relative bg-white p-3 rounded-3xl shadow-sm border border-slate-100 group">
                {/* Botón de borrar - aparece al hacer hover */}
                <button 
                  onClick={() => handleDeleteItem(index)}
                  className="absolute top-2 right-2 z-20 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                >
                  <FiTrash size={14} />
                </button>

                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-2xl mb-3" />
                <h4 className="font-bold text-slate-700 truncate px-1">{item.name}</h4>
                <p className="text-[10px] text-indigo-500 font-bold mt-1 px-1 tracking-widest uppercase">Kuromi Stock</p>
              </div>
            ))}
            <div className="flex items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-300 bg-white/90 p-6 text-slate-400">
              <div className="flex flex-col items-center gap-3">
                <FiPlus size={28} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">New Slot</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}