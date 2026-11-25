package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {

}
