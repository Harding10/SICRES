"use client";

import { FormEvent, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiLock,
  FiLoader,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import { login } from "../services/authService";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Veuillez saisir votre nom d'utilisateur.");
      return;
    }

    if (!password) {
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(
        username.trim(),
        password
      );

      setUser(response.user);

      /*
       * Pour le moment, nous conservons uniquement
       * la session côté frontend.
       *
       * Le stockage du token sera adapté lorsque
       * le backend sera connecté.
       */
      if (rememberMe) {
        localStorage.setItem(
          "sicree_user",
          JSON.stringify(response.user)
        );
      } else {
        sessionStorage.setItem(
          "sicree_user",
          JSON.stringify(response.user)
        );
      }

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de la connexion.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5"
    >
      {/* MESSAGE D'ERREUR */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* NOM D'UTILISATEUR */}
      <div>
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700"
        >
          Nom d'utilisateur
        </label>

        <div className="relative mt-2">
          <FiUser
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Votre nom d'utilisateur"
            disabled={loading}
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-3
              pl-10
              text-sm
              text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#123524]
              focus:ring-2
              focus:ring-[#123524]/10
              disabled:cursor-not-allowed
              disabled:bg-gray-50
            "
          />
        </div>
      </div>

      {/* MOT DE PASSE */}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>

        <div className="relative mt-2">
          <FiLock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-3
              pl-10
              pr-11
              text-sm
              text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#123524]
              focus:ring-2
              focus:ring-[#123524]/10
              disabled:cursor-not-allowed
              disabled:bg-gray-50
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-gray-700
              disabled:cursor-not-allowed
            "
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* OPTIONS */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
            className="
              h-4
              w-4
              rounded
              border-gray-300
              accent-[#123524]
            "
          />

          <span>Se souvenir de moi</span>
        </label>

        <button
          type="button"
          className="font-medium text-[#123524] hover:underline"
        >
          Mot de passe oublié ?
        </button>
      </div>

      {/* BOUTON CONNEXION */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#123524]
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#0d281b]
          focus:outline-none
          focus:ring-2
          focus:ring-[#123524]
          focus:ring-offset-2
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {loading ? (
          <>
            <FiLoader
              size={18}
              className="animate-spin"
            />
            Connexion...
          </>
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
}