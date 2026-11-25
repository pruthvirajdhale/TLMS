package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Appeal;
import com.tlms.service.AppealService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/appeals")
public class AppealController {

    private final AppealService appealService;

    public AppealController(AppealService appealService) {
        this.appealService = appealService;
    }

    @GetMapping
    public List<Appeal> getAllAppeals() {
        return appealService.getAllAppeals();
    }

    @GetMapping("/{id}")
    public Appeal getAppealById(@PathVariable Integer id) {
        return appealService.getAppealById(id);
    }

    @PostMapping
    public Appeal createAppeal(@RequestBody Appeal appeal) {
        return appealService.createAppeal(appeal);
    }

    @PutMapping("/{id}")
    public Appeal updateAppeal(
            @PathVariable Integer id,
            @RequestBody Appeal appeal) {
        return appealService.updateAppeal(id, appeal);
    }

    @DeleteMapping("/{id}")
    public String deleteAppeal(@PathVariable Integer id) {
        appealService.deleteAppeal(id);
        return "Appeal deleted successfully";
    }
}