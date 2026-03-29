import "./globals.css";
import Navbar from "@/components/organismos/Navbar";
import { MovieProvider } from "@/context/MovieContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
        
        <MovieProvider>
          
          <div className="min-h-screen pb-20 md:pt-20 md:pb-0">
            {children}
          </div>

          {/* Navbar fixa */}
          <Navbar />

        </MovieProvider>

      </body>
    </html>
  );
}