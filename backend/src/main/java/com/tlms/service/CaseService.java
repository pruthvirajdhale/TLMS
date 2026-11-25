package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Case;
import com.tlms.repository.CaseRepository;

@Service
public class CaseService {

    private final CaseRepository caseRepository;

    public CaseService(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    // CREATE
    public Case createCase(Case caseData) {
        return caseRepository.save(caseData);
    }

    // GET ALL
    public List<Case> getAllCases() {
        return caseRepository.findAll();
    }

    // GET BY ID
    public Case getCaseById(Integer id) {

        return caseRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Case not found with ID: " + id));
    }

    // UPDATE
    public Case updateCase(Integer id, Case caseData) {

        Case existingCase = getCaseById(id);

        existingCase.setClientId(caseData.getClientId());
        existingCase.setAssignedUserId(caseData.getAssignedUserId());
        existingCase.setCaseNumber(caseData.getCaseNumber());
        existingCase.setTaxType(caseData.getTaxType());
        existingCase.setCaseCategory(caseData.getCaseCategory());
        existingCase.setForum(caseData.getForum());
        existingCase.setAssessmentYear(caseData.getAssessmentYear());
        existingCase.setFilingDate(caseData.getFilingDate());
        existingCase.setAmountInDispute(caseData.getAmountInDispute());
        existingCase.setPriority(caseData.getPriority());
        existingCase.setStatus(caseData.getStatus());
        existingCase.setRemarks(caseData.getRemarks());

        return caseRepository.save(existingCase);
    }

    // DELETE
    public void deleteCase(Integer id) {

        Case existingCase = getCaseById(id);

        caseRepository.delete(existingCase);
    }
}