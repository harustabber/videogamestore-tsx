import Link from 'next/link';
import { FiHome, FiBox, FiPieChart, FiActivity, FiSettings, FiUsers, FiMapPin } from "react-icons/fi";

export const Sidebar = () => (
  <aside className="hidden lg:flex h-[calc(100vh-73px)] flex-col items-center w-24 rounded-[2.75rem] bg-gradient-to-b from-[#6d5dd3] via-[#7f6ee3] to-[#a98dff] shadow-2xl border border-white/10 backdrop-blur-xl mx-4 my-4 p-4">
    <Link href="/admin" className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg ring-1 ring-white/30 transition hover:bg-white/30">
      <FiHome className="text-2xl" />
    </Link>
    <nav className="flex flex-col gap-4 w-full">
      <Link href="/admin/users" className="flex h-14 w-full items-center justify-center rounded-3xl bg-white/15 text-white shadow-sm transition hover:bg-white/25">
        <FiUsers className="text-xl" />
      </Link>
      <Link href="/admin/stores" className="flex h-14 w-full items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-sm transition hover:bg-white/20">
        <FiMapPin className="text-xl" />
      </Link>
      <button className="flex h-14 w-full items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-sm transition hover:bg-white/20">
        <FiBox className="text-xl" />
      </button>
      <button className="flex h-14 w-full items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-sm transition hover:bg-white/20">
        <FiPieChart className="text-xl" />
      </button>
      <button className="flex h-14 w-full items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-sm transition hover:bg-white/20">
        <FiActivity className="text-xl" />
      </button>
    </nav>
    <div className="mt-auto">
      <button className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white/90 shadow-sm transition hover:bg-white/20">
        <FiSettings className="text-xl" />
      </button>
    </div>
  </aside>
);