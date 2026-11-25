package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Case;
import com.tlms.service.CaseService;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    // GET ALL
    @GetMapping
    public List<Case> getAllCases() {
        return caseService.getAllCases();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Case getCaseById(@PathVariable Integer id) {
        return caseService.getCaseById(id);
    }

    // CREATE
    @PostMapping
    public Case createCase(@RequestBody Case caseData) {
        return caseService.createCase(caseData);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Case updateCase(
            @PathVariable Integer id,
            @RequestBody Case caseData) {

        return caseService.updateCase(id, caseData);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCase(@PathVariable Integer id) {

        caseService.deleteCase(id);

        return "Case deleted successfully";
    }
}