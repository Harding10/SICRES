import { User } from "../types/auth";

export async function login(email: string, password: string): Promise<void> {
  console.log("Mock Login", email);
}

export async function logout(): Promise<void> {
  console.log("Mock Logout");
}

export async function getCurrentUser(): Promise<User | null> {
  // Simule une réponse immédiate sans faire d'appel HTTP vers Laravel
  return {
    id: 1,
    name: "Utilisateur Test",
    username: "testuser",
    role: "Client",
  };
}