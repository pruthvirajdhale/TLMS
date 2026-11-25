package com.tlms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/roles/**").permitAll()
                .requestMatchers("/api/departments/**").permitAll()
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/clients/**").permitAll()
                .requestMatchers("/api/cases/**").permitAll()
                .requestMatchers("/api/hearings/**").permitAll()
                .requestMatchers("/api/notices/**").permitAll()
                .requestMatchers("/api/documents/**").permitAll()
                .requestMatchers("/api/appeals/**").permitAll()
                .requestMatchers("/api/payments/**").permitAll()
                .requestMatchers("/api/case-history/**").permitAll()
                .requestMatchers("/api/notifications/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}