import { authClient } from "@/lib/axios";
import { User } from "../types/auth";

export async function login(email: string, password: string): Promise<void> {
  // 1. Récupère le cookie CSRF (obligatoire avant toute requête POST avec Sanctum)
  await authClient.get("/sanctum/csrf-cookie");

  // 2. Envoie les identifiants
  await authClient.post("/login", { email, password });
}

export async function logout(): Promise<void> {
  await authClient.post("/logout");
}

export async function getCurrentUser(): Promise<User> {
  const response = await authClient.get<User>("/api/user");
  return response.data;
}