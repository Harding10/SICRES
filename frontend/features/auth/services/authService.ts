import { LoginResponse } from "../types/auth";

/**
 * Authentification temporaire côté frontend.
 *
 * IMPORTANT :
 * Cette fonction est uniquement destinée aux tests du frontend.
 * Elle sera remplacée plus tard par l'appel API du backend.
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!username || !password) {
    throw new Error("Veuillez renseigner votre nom d'utilisateur et votre mot de passe.");
  }

  /*
   * Identifiants temporaires uniquement pour tester l'interface.
   *
   * Ils seront supprimés lorsque le frontend sera connecté
   * à l'API du backend.
   */
  if (username === "admin" && password === "admin123") {
    return {
      user: {
        id: 1,
        name: "Administrateur",
        username: "admin",
        role: "admin",
      },
      token: "frontend-demo-token",
    };
  }

  throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
}