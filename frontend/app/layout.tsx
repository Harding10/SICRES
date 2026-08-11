import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";


export const metadata = {
  title: "SICRES",
  description:
    "Système d'Information Communal de Recensement des Établissements Scolaires",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr" suppressHydrationWarning>

      <body suppressHydrationWarning>

        <AuthProvider>
          {children}
        </AuthProvider>

      </body>

    </html>
  );
}