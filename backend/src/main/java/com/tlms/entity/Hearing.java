package com.tlms.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hearings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hearing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hearing_id")
    private Integer hearingId;

    @Column(name = "case_id", nullable = false)
    private Integer caseId;

    @Column(name = "hearing_date", nullable = false)
    private LocalDate hearingDate;

    @Column(name = "hearing_time")
    private LocalTime hearingTime;

    @Column(name = "court_name")
    private String courtName;

    @Column(name = "judge_name")
    private String judgeName;

    @Column(name = "hearing_type")
    private String hearingType;

    @Column(name = "next_hearing_date")
    private LocalDate nextHearingDate;

    @Column(name = "hearing_status")
    private String hearingStatus = "Scheduled";

    @Column(name = "remarks")
    private String remarks;
}