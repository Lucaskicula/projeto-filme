import "./globals.css";
import Footer from "@/components/organismos/Footer";
import Navbar from "@/components/organismos/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { MovieProvider } from "@/context/MovieContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1d4ed8_0,#0f172a_34%,#020617_78%)] text-white">
        
        <AuthProvider>
        <MovieProvider>
          
          <div className="min-h-screen pb-12 pt-6 md:pt-24">
            {children}
          </div>

          <Footer />

          <Navbar />

        </MovieProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
