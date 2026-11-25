package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.CaseHistory;
import com.tlms.service.CaseHistoryService;

@RestController
@RequestMapping("/api/case-history")
public class CaseHistoryController {

    private final CaseHistoryService caseHistoryService;

    public CaseHistoryController(CaseHistoryService caseHistoryService) {
        this.caseHistoryService = caseHistoryService;
    }

    @GetMapping
    public List<CaseHistory> getAllHistory() {
        return caseHistoryService.getAllHistory();
    }

    @GetMapping("/{id}")
    public CaseHistory getHistoryById(@PathVariable Integer id) {
        return caseHistoryService.getHistoryById(id);
    }

    @PostMapping
    public CaseHistory createHistory(@RequestBody CaseHistory history) {
        return caseHistoryService.createHistory(history);
    }

    @DeleteMapping("/{id}")
    public String deleteHistory(@PathVariable Integer id) {
        caseHistoryService.deleteHistory(id);
        return "Case history deleted successfully";
    }
}