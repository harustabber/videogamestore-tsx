// app/admin/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/dashboard/Sidebar";
import { StatCard } from "../../../components/dashboard/StatCard";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

const STORAGE_KEY = "kuromi_users";

const initialUsers: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "USER", joined: "2023-01-15" },
  { id: 2, name: "María García", email: "maria@example.com", role: "USER", joined: "2023-02-20" },
  { id: 3, name: "Carlos López", email: "carlos@example.com", role: "USER", joined: "2023-03-10" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("USER");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }
  }, []);

  const syncUsers = (nextUsers: User[]) => {
    setUsers(nextUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
  };

  const openNewUserForm = () => {
    setCurrentUser(null);
    setFormName("");
    setFormEmail("");
    setFormRole("USER");
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setCurrentUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setCurrentUser(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    if (!formName.trim() || !formEmail.trim()) {
      window.alert("Completa el nombre y el email antes de guardar.");
      return;
    }

    if (currentUser) {
      const updated = users.map((user) =>
        user.id === currentUser.id
          ? { ...user, name: formName, email: formEmail, role: formRole }
          : user
      );
      syncUsers(updated);
    } else {
      const newUser: User = {
        id: Date.now(),
        name: formName,
        email: formEmail,
        role: formRole,
        joined: new Date().toISOString().slice(0, 10),
      };
      syncUsers([...users, newUser]);
    }

    closeForm();
  };

  const openDeleteConfirmation = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId === null) return;
    syncUsers(users.filter((user) => user.id !== deleteTargetId));
    setDeleteTargetId(null);
    setIsDeleteOpen(false);
  };

  const closeDeleteDialog = () => {
    setDeleteTargetId(null);
    setIsDeleteOpen(false);
  };

  const handleExportUsers = () => {
    const payload = JSON.stringify(users, null, 2);
    navigator.clipboard.writeText(payload);
    window.alert("Usuarios copiados al portapapeles.");
  };

  const handleNewsletter = () => {
    window.alert("Newsletter preparado para los usuarios actuales.");
  };

  return (
    <div className="flex min-h-screen bg-[#eef0ff]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10" style={{ padding: "calc(var(--spacing) * 4)" }}>
        <div className="rounded-[3rem] bg-white/80 p-6 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl border border-white/70">
          <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-kuro-secondary/90">
                Gestión de Usuarios
              </p>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Clientes Registrados</h1>
            </div>
            <div className="rounded-full bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-white/70">
              Administra tus usuarios con estilo.
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr] mb-10">
            <div className="grid gap-6">
              <StatCard title="Total Usuarios" color="primary">
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-bold">{users.length}</span>
                  <p className="text-white/80 text-sm">Usuarios registrados</p>
                </div>
              </StatCard>
            </div>
            <StatCard title="Acciones Rápidas" color="secondary">
              <div className="space-y-4">
                <button
                  onClick={openNewUserForm}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] cursor-pointer py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Nuevo Usuario
                </button>
                <button
                  onClick={handleExportUsers}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] cursor-pointer py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Exportar Usuarios
                </button>
                <button
                  onClick={handleNewsletter}
                  className="w-full rounded-[1.5rem] bg-[#6d5dd3] hover:text-[#6d5dd3] cursor-pointer py-3 text-sm font-bold text-kuro-secondary shadow-lg transition hover:bg-slate-50"
                >
                  Enviar Newsletter
                </button>
              </div>
            </StatCard>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white/90 shadow-lg ring-1 ring-white/70 border border-white/50">
            <table className="w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Fecha de Registro</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.joined}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openEditForm(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(user.id)}
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
                  {currentUser ? "Editar Usuario" : "Nuevo Usuario"}
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
                Nombre
                <input
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. Laura Mendoza"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={formEmail}
                  onChange={(event) => setFormEmail(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                  placeholder="Ej. usuario@correo.com"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Rol
                <select
                  value={formRole}
                  onChange={(event) => setFormRole(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6d5dd3] focus:ring-2 focus:ring-[#6d5dd3]/20"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
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
                {currentUser ? "Guardar cambios" : "Crear usuario"}
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
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Eliminar usuario</h2>
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
              ¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer.
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
                Eliminar usuario
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}