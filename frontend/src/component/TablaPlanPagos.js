import React, {useState} from 'react';
import moment from 'moment'; // Importa la librería moment para manejar fechas

import '../StyleSheet/tablaPlanPagos.css'


function TablaPlanPago({ capital, tasaMensual, plazoMeses , mesesGracia, fechaInicio }) {

     if (!capital || !tasaMensual || !plazoMeses) {
         return ;
     }

    const pagos = [];
    let saldo = parseFloat(capital);
    const tasaMensualDecimal = tasaMensual / 100;

    let interesAcumulado = 0 ;

    for (let k = 1; k <= mesesGracia; k++) {
        const kinteres = Math.round(saldo * tasaMensualDecimal);
        interesAcumulado += kinteres;
    }
    saldo += interesAcumulado ;
    let fechaCalendarioPago = moment(fechaInicio).clone();

    for (let i = 1; i <= plazoMeses; i++) {
        const interes = Math.round(saldo * tasaMensualDecimal);
        const amortizacion = Math.round((parseFloat(capital) * tasaMensualDecimal * Math.pow(1 + tasaMensualDecimal, plazoMeses) )/ (Math.pow(1 + tasaMensualDecimal, plazoMeses) - 1) - interes);
        const pagoMensual = interes + amortizacion;

        pagos.push({
            cuota: i,
            fechaCuota: fechaCalendarioPago.clone(),
            saldo: Math.round(saldo.toFixed(2)),
            interes: interes.toFixed(2),
            amortizacion: amortizacion.toFixed(2),
            pagoMensual: pagoMensual.toFixed(2),
        });
        saldo -= amortizacion ;
        fechaCalendarioPago = fechaCalendarioPago.add( 1 , 'months');
    }

    return (
        <div>
            <h3>Plan de Pagos</h3>
            <table className="plan-pagos-table">
                <thead>
                <tr>
                    <th>N de cuota</th>
                    <th>Fecha</th>
                    <th>Saldo</th>
                    <th>Interés</th>
                    <th>Amortización</th>
                    <th>Pago Mensual</th>
                </tr>
                </thead>
                <tbody>
                {pagos.map((pago) => (
                    <tr key={pago.cuota}>
                        <td>{pago.cuota}  </td>
                        <td>{pago.fechaCuota.format('yyyy-MM-DD')}</td>
                        <td>{pago.saldo} </td>
                        <td>{pago.interes} </td>
                        <td>{pago.amortizacion}</td>
                        <td>{pago.pagoMensual} </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">...ooOO Fin Plan de Pagos OOoo...</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TablaPlanPago;