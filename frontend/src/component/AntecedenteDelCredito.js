// importaciones
import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Importa la librería moment para manejar fechas
import TablaPlanPago from './TablaPlanPagos'; // Importa el componente TablaPlanPago
import '../StyleSheet/antecedentesDelCredito.css'

function AntcedentesDelCredito( {selectedClient} ) {
    //1. Hooks de estados
    const [capital, setCapital] = useState('');
    const [tasaAnual, setTasaAnual] = useState('');
    const [plazoMeses, setplazoMeses] = useState('');
    const [mostrarTabla, setMostrarTabla] = useState(false); // Estado para controlar la visualización de la tabla
    const [mesesGracia , setmesesGracia ] = useState( ''); // define periodo de gracia
    const [fechaSolicitud, setFechaSolicitud] = useState(moment().format('YYYY-MM-DD')); // Inicializa con la fecha actual
    const [fechaInicio, setFechaInicio] = useState(moment().format('YYYY-MM-DD')); // Inicializa con la fecha actual
    const [fechaTermino, setFechaTermino] = useState(null);
    const [planGenerado, setPlanGenerado] = useState(null); // Nuevo estado para almacenar el plan generado

    //2. Funciones auxiliares y manejadores de Eventos
    const tasaMensual = tasaAnual ? parseFloat(tasaAnual) / 12 : 0;

    const handleGenerarPlan = () => {
        if (!capital || !tasaMensual || !plazoMeses) {
            alert("validacion!!!...Ingresa los datos para generar el plan de pagos.")
            return;
        }
        const nuevoPlan = {
            capital: capital,
            tasaMensual: tasaMensual,
            plazoMeses: plazoMeses,
            mesesGracia: mesesGracia,
            fechaInicio: fechaInicio,
        };

        calcularFechaTermino();
        setPlanGenerado(nuevoPlan); // Almacena el plan generado
        setMostrarTabla(true);

    };

    const ajustarFechaInicio = () => {
        let fechaInicioCalculada = moment(fechaSolicitud); // Clona la fecha de solicitud

        if (mesesGracia >= 0 && mesesGracia < 7) {
            fechaInicioCalculada.add(parseInt(mesesGracia), 'months'); // Agrega meses de gracia
        } else {
            alert("Los meses de Gracias deben ser entre 1 y 6");
            fechaInicioCalculada = moment(fechaSolicitud); // Restablece a la fecha de solicitud
        }

        // Agrega un período de gracia mínimo de 30 días
        if (moment(fechaInicioCalculada).isSameOrBefore(moment(fechaSolicitud).add(30, 'days'))) {
            fechaInicioCalculada.add(30, 'days');
        }

        setFechaInicio(fechaInicioCalculada.format('YYYY-MM-DD'));
    };

    const calcularFechaTermino = () => {
        if (fechaInicio && mesesGracia && plazoMeses) {
            const fechaInicioMoment = moment(fechaInicio);
            const fechaTerminoMoment = fechaInicioMoment.clone().add(parseInt(mesesGracia) + parseInt(plazoMeses), 'months');
            setFechaTermino(fechaTerminoMoment.format('YYYY-MM-DD'));
        }
    };

    const handleLimpiar = () => {
        setCapital('');
        setTasaAnual('');
        setplazoMeses('');
        setmesesGracia('');
        setMostrarTabla(false);
        setFechaTermino(null);
        setFechaInicio(moment().format('YYYY-MM-DD'))
        setMostrarTabla(false);  //la idea es lograr no mostrar los datos cuando se liempia
    };

    const handleCrearCliente = () =>{
        alert("plan de pagos almacenado en base de datos...")
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    //3. Hooks de efecto
    useEffect(() => {
        // Restablecer los estados cuando cambia selectedClient
        setCapital('');
        setTasaAnual('');
        setplazoMeses('');
        setmesesGracia('');
        setMostrarTabla(false);
        setFechaTermino(null);
        setFechaInicio(moment().format('YYYY-MM-DD'));
        setPlanGenerado(null);
    }, [selectedClient]); // El efecto se ejecuta cuando selectedClient cambia

    useEffect(() => {
        // Verifica si mesesGracia tiene un valor numérico antes de llamar a ajustarFechaInicio
        if (mesesGracia !== "") {
            ajustarFechaInicio();
        }
    }, [mesesGracia, fechaSolicitud]);



    useEffect(() => {
        setMostrarTabla(false); // Restablecer mostrarTabla cuando cambian los inputs
    }, [capital, tasaAnual, plazoMeses, mesesGracia]);

    //4. Retorno del Jsx
    return (
        <div >
            <h2>Antecedentes para el Cálculos de Interés</h2>
            <hr />
            <p></p>
            <nav >
                <table className="mi-barra-de-navegacion">
                    <tbody>
                    <tr>
                        <td><button onClick={handleGenerarPlan}>Generar plan de pagos </button></td>
                        <td><button onClick={handleCrearCliente}>Almacenar plan de pagos</button></td>
                        <td><button onClick={handleLimpiar}>Limpiar datos</button></td>
                    </tr>
                    </tbody>
                </table>
            </nav>
            <p></p>
            <hr />
            <table className="Antecedentes-del-credito-table">
                <tbody>
                    <tr>
                        <td>Cliente </td>
                        <td >
                            {capitalizeFirstLetter(selectedClient?.name)}{' '}
                            {capitalizeFirstLetter(selectedClient?.lastName)}
                        </td>
                    </tr>
                    <tr>
                        <td>Capital </td>
                        <td><input
                            id="capitalInput"
                            name="capital"
                            type="number"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Tasa Anual (%) </td>
                        <td><input
                            id="tasaAnualInput"
                            name="tasaAnual"
                            type="number"
                            value={tasaAnual}
                            onChange={(e) => setTasaAnual(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Plazo (meses)</td>
                        <td><input
                            id="plazoAnualInput"
                            name="PlazoAnual"
                            type="number"
                            value={plazoMeses}
                            onChange={(e) => setplazoMeses(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Meses de gracia</td>
                        <td><input
                            id="mesesDeGracialInput"
                            name="mesesDeGracia"
                            type="number"
                            value={mesesGracia}
                            onChange={(e) => setmesesGracia(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Fecha de Solicitud</td>
                        <td>{fechaSolicitud}</td>
                    </tr>
                    <tr>
                        <td>Fecha pago Primera cuota</td>
                        <td>{fechaInicio}</td>
                    </tr>
                    <tr>
                        <td>Fecha de Termino</td>
                        <td>{fechaTermino }</td>
                    </tr>
                </tbody>
            </table>
            <table className="tasa-plazo-table">
                <tbody>
                    <tr>
                        <td></td>
                        <td>Tasa Mensual: {tasaMensual.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Plazo en Meses: {plazoMeses}</td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
             <hr />
            {mostrarTabla && planGenerado && (
                <TablaPlanPago
                    capital={capital}
                    tasaMensual={tasaMensual}
                    plazoMeses={plazoMeses}
                    mesesGracia={mesesGracia}
                    fechaInicio={fechaInicio}
                />
            )}
        </div>
    );
}

export default AntcedentesDelCredito;