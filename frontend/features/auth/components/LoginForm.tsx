"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { login } from "../services/authService";
import { useAuth } from "@/contexts/AuthContext";


export default function LoginForm() {


  const [show, setShow] = useState(false);

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const {setUser} = useAuth();



  async function handleSubmit(e: React.FormEvent){

    e.preventDefault();


    try {

      const response = await login(
        email,
        password
      );


      setUser(response.user);


      console.log(
        "Utilisateur connecté",
        response.user
      );


    } catch(error){

      console.error(
        "Erreur connexion",
        error
      );

    }

  }



  return (

    <form
      className="mt-6 space-y-4"
      onSubmit={handleSubmit}
    >


      <div>

        <label className="text-sm font-medium text-gray-700">
          Adresse email
        </label>


        <div className="mt-2 relative">

          <FiMail className="absolute left-3 top-3 text-gray-500"/>


          <input

            type="email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            placeholder="exemple@email.com"

            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-gray-700"

          />


        </div>

      </div>





      <div>


        <label className="text-sm font-medium text-gray-700">
          Mot de passe
        </label>


        <div className="mt-2 relative">


          <FiLock className="absolute left-3 top-3 text-gray-500"/>


          <input

            type={show ? "text":"password"}

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            placeholder="••••••••"

            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 pr-10 text-gray-700"

          />



          <button

            type="button"

            onClick={()=>setShow(!show)}

            className="absolute right-3 top-3"

          >

            {
              show 
              ? <FiEyeOff/>
              : <FiEye/>
            }


          </button>


        </div>


      </div>





      <div className="flex justify-between text-sm">


        <label className="flex gap-2 text-gray-700">

          <input type="checkbox"/>

          Se souvenir de moi

        </label>



        <a className="text-blue-600">

          Mot de passe oublié ?

        </a>


      </div>




      <button

        type="submit"

        className="w-full bg-black text-white py-2 rounded-md"

      >

        Se connecter

      </button>



    </form>

  );

}