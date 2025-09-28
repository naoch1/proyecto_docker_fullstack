package com.exampleDtoDao.demo.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanDTO {

    private Long Id;
    private Long IdCliente;
    private BigDecimal Capital;
    private BigDecimal rate;
    private int plazo;
    private int mesesgracia;
    private LocalDate fechasolicitud;
    private LocalDate fechapagoprimeracuota;
    private LocalDate fechatermino;

}
