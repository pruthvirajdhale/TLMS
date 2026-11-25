package com.tlms.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Integer noticeId;

    @Column(name = "case_id", nullable = false)
    private Integer caseId;

    @Column(name = "notice_number", unique = true)
    private String noticeNumber;

    @Column(name = "notice_type")
    private String noticeType;

    @Column(name = "notice_date")
    private LocalDate noticeDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "issued_by")
    private String issuedBy;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status = "Pending";
}