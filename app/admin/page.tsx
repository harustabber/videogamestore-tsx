/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
    // Este estado se puede usar para almacenar la lista de juegos que se van a mostrar en la página. 
    // Inicialmente está vacío, pero luego se puede llenar con datos de una base de datos o un mock.
    const [items, setItems] = useState<{ name: string; imageUrl: string }[]>([]);
    // Este estado se puede usar para almacenar el nombre del nuevo juego que se quiere agregar
    const [newItem, setNewItem] = useState("");
    // El contador se puede usar para generar un ID único o simplemente para mostrar cuántos juegos se han agregado
    const [count, setCount] = useState(0);
    // Este estado se puede usar para mostrar un mensaje de carga o deshabilitar el botón mientras se agrega un nuevo juego
    const [isAdding, setIsAdding] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    

    useEffect (() => {
      const savedGames = localStorage.getItem("my_games");
      if (savedGames) {
        setItems(JSON.parse(savedGames));
      }
      // Aquí podríamos hacer una llamada a una API para obtener la lista de juegos desde una base de datos o un mock 
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("my_games", JSON.stringify(items));
        }
    }, [items]);

    const handleAddItem = () => {
      if (!newItem || !imageUrl) return alert("Rellena ambos campos");
      setIsAdding(true);
      // Creamos el nuevo objeto con los nombres exactos de tus estados
      const newGame = { name: newItem, imageUrl: imageUrl };
      // Actualizamos la lista
      setItems([...items, newGame]);
      // Actualizamos el contador basándonos en la nueva longitud de la lista
      setCount(items.length + 1);
      // LIMPIEZA: Es importante resetear los inputs para el siguiente juego
      setNewItem("");
      setImageUrl("");
      setIsAdding(false); // Ya terminó de agregar
    };


    return (
        <main className="p-8 bg-black min-h-screen text-white">
          <h1 className="text-4xl font-bold text-blue-500 mb-6 underline decoration-blue-800">
            Video Game Store
          </h1>
          <p className="text-gray-400">
            Bienvenido, Vic. Aquí empezaremos a renderizar los juegos desde una base de datos o un mock.
          </p>
          
          {/* Aquí llamaremos luego a <GameGrid /> */}
          <div className="mt-10 border-2 border-dashed border-gray-700 p-20 text-center">
            Lista de Juegos (Total: {count})
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover border-b border-gray-800"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white truncate">{item.name}</h3>
                    <p className="text-blue-400 text-sm mt-1">Videojuego</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mario Kart DS */}
          {/* https://upload.wikimedia.org/wikipedia/en/8/86/Mario_Kart_DS_cover.jpg */}
          <div className="flex flex-col items-start mt-10">
              <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Nombre del juego" className="mt-6 p-2 rounded bg-gray-800 text-white w-full max-w-sm" />
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de la imagen" className="mt-4 p-2 rounded bg-gray-800 text-white w-full max-w-sm" />
              <button onClick={handleAddItem} className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer mt-6">
                Agregar Juego
              </button>
          </div>
          
        </main>
    );
}