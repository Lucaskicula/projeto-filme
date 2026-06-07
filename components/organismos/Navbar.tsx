"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const path = usePathname();
  const { user, logout } = useAuth();

  function linkClass(route: string) {
    return path === route ? "text-sky-300" : "text-slate-400 hover:text-white";
  }

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-sky-300/10 bg-slate-950/85 px-3 py-3 text-sm shadow-2xl shadow-black/30 backdrop-blur-md md:top-0 md:bottom-auto md:border-t-0 md:border-b md:px-8">
      <Link href="/" className={linkClass("/")}>Inicio</Link>
      <Link href="/list" className={linkClass("/list")}>Minha Lista</Link>
      <Link href="/watched" className={linkClass("/watched")}>Assistidos</Link>
      <Link href="/search" className={linkClass("/search")}>Buscar</Link>

      {user ? (
        <>
          <Link href="/profile" className={linkClass("/profile")}>Perfil</Link>
          <button onClick={logout} className="text-slate-400 hover:text-white">
            Sair
          </button>
        </>
      ) : (
        <Link href="/login" className={linkClass("/login")}>Login</Link>
      )}
    </nav>
  );
}
