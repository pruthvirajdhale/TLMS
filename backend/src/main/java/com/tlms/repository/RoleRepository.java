package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tlms.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}