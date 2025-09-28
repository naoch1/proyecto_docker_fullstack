
// CRA: solo process.env.REACT_APP_*
const BASE =
    (process.env.REACT_APP_API_BASE || "/api").replace(/\/+$/, ""); // sin barra final

export function apiUrl(path: string): string {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${BASE}${clean}`;
}

export const API_BASE = BASE; // por si te sirve exportarlo

