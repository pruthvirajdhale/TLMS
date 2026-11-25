package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlms.entity.Appeal;

public interface AppealRepository extends JpaRepository<Appeal, Integer> {
}