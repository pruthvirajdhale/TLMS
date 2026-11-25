package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

}
