"use client";

import ClientShell from "@/components/client/layout/ClientShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientShell>{children}</ClientShell>;
}