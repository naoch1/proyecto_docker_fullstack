import React, { Suspense, useState } from "react";
import { fetchData } from "../costumerapi/fetchData";
import AntcedentesDelCredito from "./AntecedenteDelCredito";
import '../StyleSheet/ListClients.css'


// const apiData = fetchData("http://192.168.100.16:8080/user/find");

const apiData = fetchData("/api/user/find");


function ListClients({clients}) {
    const data = apiData.read();
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientForCalculation, setClientForCalculation] = useState(null); // Nuevo estado

    const capitalizeFirstLetter = (string) => {
        if (!string) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleRowClick = (client) => {
        setSelectedClient(client);
    };

    const handleAssignForCalculation = (client) => {
        setClientForCalculation(client);
    };


    return (
        <>
            <h3>Nómina</h3>
            <div className="contenedor-tabla-clientes">
                <table className="listado-de-cliente-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Suspense fallback={<tr><td colSpan="5">Cargando...</td></tr>}>
                        {data?.map((client) => (
                            <tr
                                key={client.id}
                                onClick={() => handleRowClick(client)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{client.id}</td>
                                <td>{client.name} {client.lastName}</td>
                                <td>{client.age}</td>
                                <td>{client.email}</td>

                            </tr>
                        ))}
                    </Suspense>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="5">...ooOOO Fin nómina OOOoo...</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <hr />
            {selectedClient && (
                <div>
                    <h3>
                        Cliente Seleccionado:{' '}
                        {capitalizeFirstLetter(selectedClient?.name)}{' '}
                        {capitalizeFirstLetter(selectedClient?.lastName)}
                    </h3>
                    <table className="cliente-seleccionado-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Email</th>
                            <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{selectedClient.id}</td>
                            <td>{selectedClient.name}{' '}{selectedClient.lastName}</td>
                            <td>{selectedClient.age}</td>
                            <td>{selectedClient.email}</td>
                            <td>
                                <button onClick={(e) => {
                                    e.stopPropagation(); // Evita que el evento de clic de la fila se active
                                    handleAssignForCalculation(selectedClient);
                                }}>
                                    Asignar datos para el cálculo
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {clientForCalculation && (
                <AntcedentesDelCredito selectedClient={clientForCalculation} />
            )}
        </>
    );
}

export default ListClients;