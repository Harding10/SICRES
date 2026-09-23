"use client";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f5f7f6] text-gray-900">
        <AdminSidebar />

        <div className="min-h-screen lg:ml-[230px]">
          <AdminHeader />

          <main className="min-h-screen pt-[68px]">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-[1500px]">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}