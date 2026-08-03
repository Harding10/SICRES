"use client"

import React, { useState } from "react";
import { FiHome, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen flex bg-gray-900">
      <div
        className="w-1/2 relative hidden md:flex items-end bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/90 rounded-full px-3 py-2">
          <FiHome className="text-2xl text-gray-800" />
          <span className="font-semibold text-gray-800">Realnest</span>
        </div>

        <div className="p-12 text-white z-10">
          <h2 className="text-4xl font-bold">Système d'Information Communal de Recensement
            des Établissements Scolaires </h2>
          <p className="mt-3 opacity-90">Schedule visit in just a few clicks</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12">
        <div className="max-w-md w-full">
          <div className="flex justify-end">
            <button className="bg-black text-white px-4 py-2 rounded-full">Sign in</button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">Bienvenue sur Sicres!</h1>
          <p className="text-sm text-gray-400 mt-2">Connectez-vous à votre compte</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-gray-600">Your Email</label>
              <div className="mt-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <input type="email" placeholder="you@example.com" className="flex-1 px-4 py-2 outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="mt-2 relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border rounded-md px-4 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-3 text-gray-400"
                  aria-label="Toggle password visibility"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> <span>Remember Me</span>
              </label>
              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-black text-white py-2 rounded-md mt-2">Login</button>
          </form>

          <div className="my-6 flex items-center">
            <hr className="flex-1" />
            <span className="px-3 text-sm text-gray-400">Or</span>
            <hr className="flex-1" />
          </div>

          <div className="space-y-3">
            <button className="w-full border rounded-md py-2 flex items-center justify-center gap-3">
              <FaGoogle className="text-red-500" />Continue with Google
            </button>
            <button className="w-full border rounded-md py-2 flex items-center justify-center gap-3">
              <FaFacebookF className="text-blue-600" />Continue with Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have any account? <a href="#" className="text-blue-600">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
