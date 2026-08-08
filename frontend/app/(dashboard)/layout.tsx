"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENU PRINCIPAL */}
        <div className="ml-64 min-h-screen">
          {/* HEADER */}
          <Header />

          {/* PAGE */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}