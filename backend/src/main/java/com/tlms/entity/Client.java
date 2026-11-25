package com.tlms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Integer clientId;

    @Column(name = "client_code", nullable = false, unique = true)
    private String clientCode;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "pan_number", nullable = false, unique = true)
    private String panNumber;

    @Column(name = "gstin", unique = true)
    private String gstin;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "status")
    private String status = "ACTIVE";
}