"use client";

import ClientHeader from "./ClientHeader";
import ClientSidebar from "./ClientSidebar";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f8f7] text-gray-900">
      <ClientSidebar />

      <div className="min-h-screen pl-[72px]">
        <ClientHeader />

        <main className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
      </div>
    </div>
  );
}