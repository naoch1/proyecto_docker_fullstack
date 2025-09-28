package com.exampleDtoDao.demo.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="prestamo")
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Long IdCliente;
    private BigDecimal Capital;
    private BigDecimal Rate;
    private int Plazo;
    private int mesesgracia;
    private LocalDate fechasolicitud;
    private LocalDate fechapagoprimeracuota;
    private LocalDate fechatermino;


}
