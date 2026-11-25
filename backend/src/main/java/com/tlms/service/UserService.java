package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.User;
import com.tlms.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // CREATE
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // GET ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET BY ID
    public User getUserById(Integer id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found with ID: " + id));
    }

    // UPDATE
    public User updateUser(Integer id, User user) {

        User existingUser = getUserById(id);

        existingUser.setRoleId(user.getRoleId());
        existingUser.setDepartmentId(user.getDepartmentId());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setMobile(user.getMobile());
        existingUser.setPassword(user.getPassword());
        existingUser.setDesignation(user.getDesignation());
        existingUser.setStatus(user.getStatus());

        return userRepository.save(existingUser);
    }

    // DELETE
    public void deleteUser(Integer id) {

        User existingUser = getUserById(id);

        userRepository.delete(existingUser);
    }
}