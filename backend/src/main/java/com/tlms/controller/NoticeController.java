package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Notice;
import com.tlms.service.NoticeService;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public Notice getNoticeById(@PathVariable Integer id) {
        return noticeService.getNoticeById(id);
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeService.createNotice(notice);
    }

    @PutMapping("/{id}")
    public Notice updateNotice(
            @PathVariable Integer id,
            @RequestBody Notice notice) {
        return noticeService.updateNotice(id, notice);
    }

    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable Integer id) {
        noticeService.deleteNotice(id);
        return "Notice deleted successfully";
    }
}