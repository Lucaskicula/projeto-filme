"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const path = usePathname();

    function linkClass(route: string) {
        return path === route ? "text-purple-400" : "text-gray-400";
    }

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around py-2      z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
            <Link href="/" className={linkClass("/")}>Início</Link>
            <Link href="/list" className={linkClass("/list")}>Minha Lista</Link>
            <Link href="/watched" className={linkClass("/watched")}>Assistidos</Link>
            <Link href="/search" className={linkClass("/search")}>Buscar</Link>
        </nav>
    );
}