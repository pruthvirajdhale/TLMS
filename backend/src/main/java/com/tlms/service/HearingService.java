package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Hearing;
import com.tlms.repository.HearingRepository;

@Service
public class HearingService {

    private final HearingRepository hearingRepository;

    public HearingService(HearingRepository hearingRepository) {
        this.hearingRepository = hearingRepository;
    }

    public Hearing createHearing(Hearing hearing) {
        return hearingRepository.save(hearing);
    }

    public List<Hearing> getAllHearings() {
        return hearingRepository.findAll();
    }

    public Hearing getHearingById(Integer id) {
        return hearingRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Hearing not found with ID: " + id));
    }

    public Hearing updateHearing(Integer id, Hearing hearing) {

        Hearing existing = getHearingById(id);

        existing.setCaseId(hearing.getCaseId());
        existing.setHearingDate(hearing.getHearingDate());
        existing.setHearingTime(hearing.getHearingTime());
        existing.setCourtName(hearing.getCourtName());
        existing.setJudgeName(hearing.getJudgeName());
        existing.setHearingType(hearing.getHearingType());
        existing.setNextHearingDate(hearing.getNextHearingDate());
        existing.setHearingStatus(hearing.getHearingStatus());
        existing.setRemarks(hearing.getRemarks());

        return hearingRepository.save(existing);
    }

    public void deleteHearing(Integer id) {
        Hearing existing = getHearingById(id);
        hearingRepository.delete(existing);
    }
}