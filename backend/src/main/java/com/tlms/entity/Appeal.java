package com.tlms.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appeals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appeal_id")
    private Integer appealId;

    @Column(name = "case_id", nullable = false)
    private Integer caseId;

    @Column(name = "appeal_level", nullable = false)
    private String appealLevel;

    @Column(name = "appeal_date")
    private LocalDate appealDate;

    @Column(name = "decision_date")
    private LocalDate decisionDate;

    @Column(name = "decision")
    private String decision;

    @Column(name = "status")
    private String status = "Pending";

    @Column(name = "remarks")
    private String remarks;
}