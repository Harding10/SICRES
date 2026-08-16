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

// Export par défaut conservé pour compatibilité avec le code existant
export default apiClient;