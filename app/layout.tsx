import "./globals.css";
import Navbar from "@/components/organismos/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-950 text-white">
        <div className="min-h-screen pb-20 md:pt-20 md:pb-0">
          {children}
        </div>

        {/* Navbar fixa */}
        <Navbar />
      </body>
    </html>
  );
}