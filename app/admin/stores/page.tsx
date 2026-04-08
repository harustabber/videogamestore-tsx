// app/admin/stores/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/dashboard/Sidebar";
import { StatCard } from "../../../components/dashboard/StatCard";
import { Store } from "../../../types/store";

const STORAGE_KEY = "kuromi_stores";

const initialStores: Store[] = [
  {
    id: "1",
    name: "Kuromi Centro",
    address: "Av. Principal 123",
    city: "Madrid",
    phone: "+34 912 345 678",
    mapUrl: "https://maps.google.com/?q=Madrid",
    isMain: true,
    openingHours: "Lun-Vie 9am-6pm",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Kuromi Plaza",
    address: "Calle Comercio 456",
    city: "Barcelona",
    phone: "+34 934 567 890",
    mapUrl: "https://maps.google.com/?q=Barcelona",
    isMain: false,
    openingHours: "Lun-Sab 10am-8pm",
    createdAt: new Date("2023-02-20"),
  },
];

export default function AdminStoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [formName, setFormName] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMapUrl, setFormMapUrl] = useState("");
  const [formIsMain, setFormIsMain] = useState(false);
  const [formOpeningHours, setFormOpeningHours] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert createdAt back to Date objects
      const storesWithDates = parsed.map((store: any) => ({
        ...store,
        createdAt: new Date(store.createdAt),
      }));
      setStores(storesWithDates);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStores));
      setStores(initialStores);
    }
  }, []);

  const syncStores = (nextStores: Store[]) => {
    setStores(nextStores);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStores));
  };

  const openNewStoreForm = () => {
    setCurrentStore(null);
    setFormName("");
    setFormAddress("");
    setFormCity("");
    setFormPhone("");
    setFormMapUrl("");
    setFormIsMain(false);
    setFormOpeningHours("");
    setIsFormOpen(true);
  };

  const openEditForm = (store: Store) => {
    setCurrentStore(store);
    setFormName(store.name);
    setFormAddress(store.address);
    setFormCity(store.city);
    setFormPhone(store.phone || "");
    setFormMapUrl(store.mapUrl || "");
    setFormIsMain(store.isMain);
    setFormOpeningHours(store.openingHours || "");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setCurrentStore(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    if (!formName.trim() || !formAddress.trim() || !formCity.trim()) {
      window.alert("Completa el nombre, dirección y ciudad antes de guardar.");
      return;
    }

    if (currentStore) {
      const updated = stores.map((store) =>
        store.id === currentStore.id
          ? {
              ...store,
              name: formName,
              address: formAddress,
              city: formCity,
              phone: formPhone || null,
              mapUrl: formMapUrl || undefined,
              isMain: formIsMain,
              openingHours: formOpeningHours || null,
            }
          : store
      );
      syncStores(updated);
    } else {
      const newStore: Store = {
        id: Date.now().toString(),
        name: formName,
        address: formAddress,
        city: formCity,
        phone: formPhone || null,
        mapUrl: formMapUrl || undefined,
        isMain: formIsMain,
        openingHours: formOpeningHours || null,
        createdAt: new Date(),
      };
      syncStores([...stores, newStore]);
    }

    closeForm();
  };

  const openDeleteConfirmation = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId === null) return;
    syncStores(stores.filter((store) => store.id !== deleteTargetId));
    setDeleteTargetId(null);
    setIsDeleteOpen(false);
  };

  const closeDeleteDialog = () => {
    setDeleteTargetId(null);
    setIsDeleteOpen(false);
  };

  const handleExportStores = () => {
    const payload = JSON.stringify(stores, null, 2);
    navigator.clipboard.writeText(payload);
    window.alert("Tiendas copiadas al portapapeles.");
  };

  const handleReport = () => {
    window.alert("Reporte de tiendas generado.");
  };

  return (
    <div className="flex min-h-screen bg-[#eef0ff]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10" style={{ padding: "calc(var(--spacing) * 4)" }}>
        <div className="rounded-[3rem] bg-white/80 p-6 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl border border-white/70">
          <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-kuro-secondary/90">
                Gestión de Tiendas
              </p>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Sucursales Físicas</h1>
            </div>
            <div className="rounded-full bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-white/70">
              Administra tus tiendas físicas con estilo.
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr] mb-10">
            <div className="grid gap-6">
              <StatCard title="Total Tiendas" color="primary">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-bold">{stores.length}</span>
                  <p className="text-white/80 text-sm">Sucursales registradas</p>
                </div>
              </StatCard>
            </div>
            <StatCard title="Acciones Rápidas" color="secondary">
              <div className="space-y-4">
                <button
                  onClick={openNewStoreForm}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Nueva Tienda
                </button>
                <button
                  onClick={handleExportStores}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Exportar Tiendas
                </button>
                <button
                  onClick={handleReport}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Generar Reporte
                </button>
              </div>
            </StatCard>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white/90 shadow-lg ring-1 ring-white/70 border border-white/50">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Ciudad</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Principal</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{store.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{store.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{store.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{store.phone || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        store.isMain ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {store.isMain ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openEditForm(store)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(store.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-kuro-secondary/90">Formulario</p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                  {currentStore ? "Editar Tienda" : "Nueva Tienda"}
                </h2>
              </div>
              <button
                className="rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
                onClick={closeForm}
                aria-label="Cerrar formulario"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre de la Tienda
                <input
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. Kuromi Centro"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Dirección
                <input
                  value={formAddress}
                  onChange={(event) => setFormAddress(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. Av. Principal 123"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Ciudad
                <input
                  value={formCity}
                  onChange={(event) => setFormCity(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. Madrid"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Teléfono
                  <input
                    value={formPhone}
                    onChange={(event) => setFormPhone(event.target.value)}
                    className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                    placeholder="Ej. +34 912 345 678"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Horario de Apertura
                  <input
                    value={formOpeningHours}
                    onChange={(event) => setFormOpeningHours(event.target.value)}
                    className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                    placeholder="Ej. Lun-Vie 9am-6pm"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                URL del Mapa
                <input
                  value={formMapUrl}
                  onChange={(event) => setFormMapUrl(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. https://maps.google.com/?q=Madrid"
                />
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formIsMain}
                  onChange={(event) => setFormIsMain(event.target.checked)}
                  className="rounded border-slate-300 text-[#6d5dd3] focus:ring-[#6d5dd3]"
                />
                <span className="text-sm font-medium text-slate-700">Tienda Principal</span>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                onClick={closeForm}
              >
                Cancelar
              </button>
              <button
                className="w-full rounded-[1.5rem] bg-[#6d5dd3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5c50c9] sm:w-auto"
                onClick={handleFormSubmit}
              >
                {currentStore ? "Guardar cambios" : "Crear tienda"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isDeleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/95 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500/90">Confirmación</p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Eliminar tienda</h2>
              </div>
              <button
                className="rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
                onClick={closeDeleteDialog}
                aria-label="Cerrar diálogo de eliminación"
              >
                ✕
              </button>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              ¿Estás seguro de que quieres eliminar esta tienda? Esta acción no se puede deshacer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                onClick={closeDeleteDialog}
              >
                Cancelar
              </button>
              <button
                className="w-full rounded-[1.5rem] bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto"
                onClick={confirmDelete}
              >
                Eliminar tienda
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}