package com.tlms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlms.entity.Department;
import com.tlms.repository.DepartmentRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Create Department
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    // Get All Departments
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // Get Department By ID
    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Department not found with ID: " + id));
    }

    // Update Department
    public Department updateDepartment(Integer id, Department department) {

        Department existingDepartment = getDepartmentById(id);

        existingDepartment.setDepartmentName(department.getDepartmentName());
        existingDepartment.setDescription(department.getDescription());
        existingDepartment.setStatus(department.getStatus());

        return departmentRepository.save(existingDepartment);
    }

    // Delete Department
    public void deleteDepartment(Integer id) {
        departmentRepository.deleteById(id);
    }
}