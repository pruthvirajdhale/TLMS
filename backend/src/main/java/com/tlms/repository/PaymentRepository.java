package com.tlms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlms.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}
