package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Payment;
import com.tlms.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Payment not found with ID: " + id));
    }

    public Payment updatePayment(Integer id, Payment payment) {

        Payment existing = getPaymentById(id);

        existing.setCaseId(payment.getCaseId());
        existing.setPaymentType(payment.getPaymentType());
        existing.setAmount(payment.getAmount());
        existing.setPaymentDate(payment.getPaymentDate());
        existing.setChallanNumber(payment.getChallanNumber());
        existing.setPaymentStatus(payment.getPaymentStatus());
        existing.setRemarks(payment.getRemarks());

        return paymentRepository.save(existing);
    }

    public void deletePayment(Integer id) {

        Payment existing = getPaymentById(id);

        paymentRepository.delete(existing);
    }
}