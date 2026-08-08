"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  /*
   * Pendant la restauration de la session
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#123524]" />

          <p className="text-sm text-gray-500">
            Vérification de la session...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Si aucun utilisateur n'est connecté,
   * on n'affiche pas le dashboard.
   */
  if (!user) {
    return null;
  }

  /*
   * Utilisateur connecté
   */
  return <>{children}</>;
}