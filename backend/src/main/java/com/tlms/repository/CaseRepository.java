package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Case;

public interface CaseRepository extends JpaRepository<Case, Integer> {

}
