package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Notification;
import com.tlms.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Integer id) {
        return notificationRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Notification not found with ID: " + id));
    }

    public Notification updateNotification(
            Integer id, Notification notification) {

        Notification existing = getNotificationById(id);

        existing.setUserId(notification.getUserId());
        existing.setTitle(notification.getTitle());
        existing.setMessage(notification.getMessage());
        existing.setIsRead(notification.getIsRead());

        return notificationRepository.save(existing);
    }

    public void deleteNotification(Integer id) {

        Notification existing = getNotificationById(id);

        notificationRepository.delete(existing);
    }
}