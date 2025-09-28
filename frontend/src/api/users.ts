import { fetchJson } from "./client";

export type User = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    age: number;
};

export function getUsers() {
    // OJO: aquí NO ponemos /api; el client añade API_BASE (/api) automáticamente
    return fetchJson<User[]>("/user/find");
}
