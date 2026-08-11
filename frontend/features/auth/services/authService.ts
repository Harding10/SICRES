import { User } from "../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";

export async function login(email: string, password: string): Promise<void> {
  // Demande le cookie CSRF (Sanctum)
  const csrfResponse = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
    mode: "cors",
  });

  if (!csrfResponse.ok) {
    throw new Error(`Échec CSRF: ${csrfResponse.status}`);
  }

  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Erreur de connexion (${response.status}) ${text}`);
  }
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/api/user`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'utilisateur");
  }

  return response.json();
}