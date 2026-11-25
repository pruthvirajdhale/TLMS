package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Appeal;
import com.tlms.repository.AppealRepository;

@Service
public class AppealService {

    private final AppealRepository appealRepository;

    public AppealService(AppealRepository appealRepository) {
        this.appealRepository = appealRepository;
    }

    public Appeal createAppeal(Appeal appeal) {
        return appealRepository.save(appeal);
    }

    public List<Appeal> getAllAppeals() {
        return appealRepository.findAll();
    }

    public Appeal getAppealById(Integer id) {
        return appealRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Appeal not found with ID: " + id));
    }

    public Appeal updateAppeal(Integer id, Appeal appeal) {

        Appeal existing = getAppealById(id);

        existing.setCaseId(appeal.getCaseId());
        existing.setAppealLevel(appeal.getAppealLevel());
        existing.setAppealDate(appeal.getAppealDate());
        existing.setDecisionDate(appeal.getDecisionDate());
        existing.setDecision(appeal.getDecision());
        existing.setStatus(appeal.getStatus());
        existing.setRemarks(appeal.getRemarks());

        return appealRepository.save(existing);
    }

    public void deleteAppeal(Integer id) {

        Appeal existing = getAppealById(id);

        appealRepository.delete(existing);
    }
}