package com.tlms.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "case_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Integer historyId;

    @Column(name = "case_id", nullable = false)
    private Integer caseId;

    @Column(name = "updated_by", nullable = false)
    private Integer updatedBy;

    @Column(name = "old_status")
    private String oldStatus;

    @Column(name = "new_status")
    private String newStatus;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}