import { apiUrl } from "./config";

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(apiUrl(path), {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} ${body ? "- " + body : ""}`);
    }
    return res.json() as Promise<T>;
}
