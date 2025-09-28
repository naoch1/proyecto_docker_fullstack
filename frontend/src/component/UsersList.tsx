import { useEffect, useState } from "react";
import { getUsers, User } from "../api/users";

export default function UsersList() {
    const [data, setData] = useState<User[] | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const users = await getUsers();
                if (alive) setData(users);
            } catch (e: any) {
                if (alive) setError(e?.message ?? "Error desconocido");
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    if (loading) return <p>Cargando usuarios…</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!data || data.length === 0) return <p>Sin usuarios.</p>;

    return (
        <div style={{ padding: 12 }}>
            <h2>Usuarios</h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                <tr>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>ID</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Nombre</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Apellido</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Email</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Edad</th>
                </tr>
                </thead>
                <tbody>
                {data.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                        <td>{u.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
