package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Document;


public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
