package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.CaseHistory;
import com.tlms.repository.CaseHistoryRepository;

@Service
public class CaseHistoryService {

    private final CaseHistoryRepository caseHistoryRepository;

    public CaseHistoryService(CaseHistoryRepository caseHistoryRepository) {
        this.caseHistoryRepository = caseHistoryRepository;
    }

    public CaseHistory createHistory(CaseHistory history) {
        return caseHistoryRepository.save(history);
    }

    public List<CaseHistory> getAllHistory() {
        return caseHistoryRepository.findAll();
    }

    public CaseHistory getHistoryById(Integer id) {
        return caseHistoryRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Case history not found with ID: " + id));
    }

    public void deleteHistory(Integer id) {
        CaseHistory history = getHistoryById(id);
        caseHistoryRepository.delete(history);
    }
}