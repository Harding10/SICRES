"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "@/features/auth/types/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const rememberedUser =
        localStorage.getItem("sicree_user");

      const sessionUser =
        sessionStorage.getItem("sicree_user");

      const storedUser =
        rememberedUser || sessionUser;

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Impossible de récupérer la session.",
        error
      );
    }
  }, []);

  const logout = () => {
    setUser(null);

    localStorage.removeItem("sicree_user");
    sessionStorage.removeItem("sicree_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth doit être utilisé dans AuthProvider"
    );
  }

  return context;
}