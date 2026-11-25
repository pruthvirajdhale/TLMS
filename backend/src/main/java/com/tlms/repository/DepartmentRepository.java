package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
