package com.tlms.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "case_id")
    private Integer caseId;

    @Column(name = "client_id", nullable = false)
    private Integer clientId;

    @Column(name = "assigned_user_id", nullable = false)
    private Integer assignedUserId;

    @Column(name = "case_number", nullable = false, unique = true)
    private String caseNumber;

    @Column(name = "tax_type", nullable = false)
    private String taxType;

    @Column(name = "case_category")
    private String caseCategory;

    @Column(name = "forum")
    private String forum;

    @Column(name = "assessment_year")
    private String assessmentYear;

    @Column(name = "filing_date")
    private LocalDate filingDate;

    @Column(name = "amount_in_dispute")
    private BigDecimal amountInDispute;

    @Column(name = "priority")
    private String priority = "Medium";

    @Column(name = "status")
    private String status = "Open";

    @Column(name = "remarks")
    private String remarks;
}