package com.tlms.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "case_id", nullable = false)
    private Integer caseId;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "challan_number")
    private String challanNumber;

    @Column(name = "payment_status")
    private String paymentStatus = "Pending";

    @Column(name = "remarks")
    private String remarks;
}