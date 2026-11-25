package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Notice;
import com.tlms.repository.NoticeRepository;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Notice createNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Notice getNoticeById(Integer id) {
        return noticeRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Notice not found with ID: " + id));
    }

    public Notice updateNotice(Integer id, Notice notice) {

        Notice existing = getNoticeById(id);

        existing.setCaseId(notice.getCaseId());
        existing.setNoticeNumber(notice.getNoticeNumber());
        existing.setNoticeType(notice.getNoticeType());
        existing.setNoticeDate(notice.getNoticeDate());
        existing.setDueDate(notice.getDueDate());
        existing.setIssuedBy(notice.getIssuedBy());
        existing.setDescription(notice.getDescription());
        existing.setStatus(notice.getStatus());

        return noticeRepository.save(existing);
    }

    public void deleteNotice(Integer id) {
        Notice existing = getNoticeById(id);
        noticeRepository.delete(existing);
    }
}