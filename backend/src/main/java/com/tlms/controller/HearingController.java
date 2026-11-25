package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Hearing;
import com.tlms.service.HearingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/api/hearings")
public class HearingController {

    private final HearingService hearingService;

    public HearingController(HearingService hearingService) {
        this.hearingService = hearingService;
    }

    @GetMapping
    public List<Hearing> getAllHearings() {
        return hearingService.getAllHearings();
    }

    @GetMapping("/{id}")
    public Hearing getHearingById(@PathVariable Integer id) {
        return hearingService.getHearingById(id);
    }

    @PostMapping
    public Hearing createHearing(@RequestBody Hearing hearing) {
        return hearingService.createHearing(hearing);
    }

    @PutMapping("/{id}")
    public Hearing updateHearing(
            @PathVariable Integer id,
            @RequestBody Hearing hearing) {
        return hearingService.updateHearing(id, hearing);
    }

    @DeleteMapping("/{id}")
    public String deleteHearing(@PathVariable Integer id) {
        hearingService.deleteHearing(id);
        return "Hearing deleted successfully";
    }
}