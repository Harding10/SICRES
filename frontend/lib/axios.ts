import Axios from 'axios';

// Client pour les routes métier (établissements, déclarations...)
export const apiClient = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost/api',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
    withXSRFToken: true,
});

// Client pour les routes d'authentification (login, logout, csrf-cookie, user)
export const authClient = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8888',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
    withXSRFToken: true,
});

// ============================================================================
// SIMULATION FRONTEND TEMPORAIRE (Évite "Network Error" sans backend)
// Peut-etre supprimer une fois les API prêtes.
// ============================================================================
const fakeResponse = (config: any) => ({
    data: { status: "success", message: "Mock Frontend", user: { name: "Agent Test" } },
    status: 200,
    statusText: "OK",
    headers: {},
    config,
});

apiClient.interceptors.request.use((config) => {
    config.adapter = async () => fakeResponse(config);
    return config;
});

authClient.interceptors.request.use((config) => {
    config.adapter = async () => fakeResponse(config);
    return config;
});
// ============================================================================

export default apiClient;