package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Hearing;

public interface HearingRepository extends JpaRepository<Hearing, Integer> {

}
