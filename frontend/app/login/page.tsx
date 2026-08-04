"use client";

import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {

  return (

    <div className="min-h-screen flex bg-gray-900">


      {/* PARTIE IMAGE */}
      <div
        className="w-1/2 relative hidden md:flex items-end bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/img_form.jpeg')",
        }}
      >


        {/* FILTRE IMAGE */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>



        {/* LOGO */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-20">


          <Image
            src="/images/logo.png"
            alt="Logo SICRES"
            width={45}
            height={45}
            className="rounded-full object-contain drop-shadow-md"
          />


          <span className="font-semibold text-white text-lg drop-shadow-md">
            SICREE
          </span>


        </div>





        {/* TEXTE PRINCIPAL */}
        <div className="p-12 text-white z-10">


          <h2 className="text-4xl font-bold drop-shadow-lg">

            Système d'Information Communal de Recensement des Établissements
           Educatifs

          </h2>



          <p className="mt-3 text-gray-200 drop-shadow-md">

            Tous les établissements de votre commune, 
            réunis en un seul endroit.

          </p>


        </div>



      </div>






      {/* FORMULAIRE */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12">


        <div className="max-w-md w-full">


          {/* TITRE CENTRÉ */}
          <div className="text-center">


            <h1 className="text-3xl font-bold text-gray-900">

              Bienvenue sur SICRES !

            </h1>



            <p className="text-sm text-gray-600 mt-2">

              Connectez-vous à votre compte

            </p>


          </div>




          {/* FORMULAIRE DE CONNEXION */}
          <LoginForm />



        </div>


      </div>



    </div>

  );
}