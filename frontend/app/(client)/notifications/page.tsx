"use client";

import {
Bell,
} from "lucide-react";

export default function NotificationsPage() {
return ( <div className="space-y-6"> <div> <div className="flex items-center gap-2 text-sm text-gray-500"> <Bell size={17} />
Notifications </div>


    <h1 className="mt-2 text-2xl font-bold text-gray-900">
      Mes notifications
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      Les informations et communications concernant votre établissement.
    </p>
  </div>

  <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 px-6 py-5">
      <h2 className="font-bold text-gray-900">
        Dernières notifications
      </h2>
    </div>

    <div className="p-6">
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Bell size={25} />
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          Aucune notification
        </h3>

        <p className="mt-2 max-w-md text-sm text-gray-500">
          Vous serez informé ici lorsque l'administration
          transmettra une nouvelle information à votre établissement.
        </p>
      </div>
    </div>
  </section>
</div>


);
}
