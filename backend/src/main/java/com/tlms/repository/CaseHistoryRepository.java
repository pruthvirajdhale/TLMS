package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlms.entity.CaseHistory;

public interface CaseHistoryRepository
        extends JpaRepository<CaseHistory, Integer> {
}