package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}
