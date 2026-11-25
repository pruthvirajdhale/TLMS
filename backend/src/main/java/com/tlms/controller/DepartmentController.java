package com.tlms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.tlms.entity.Department;
import com.tlms.service.DepartmentService;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // Get all departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // Get department by ID
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable Integer id) {
        return departmentService.getDepartmentById(id);
    }

    // Create department
    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentService.createDepartment(department);
    }

    // Update department
    @PutMapping("/{id}")
    public Department updateDepartment(
            @PathVariable Integer id,
            @RequestBody Department department) {

        return departmentService.updateDepartment(id, department);
    }

    // Delete department
    @DeleteMapping("/{id}")
    public String deleteDepartment(@PathVariable Integer id) {

        departmentService.deleteDepartment(id);

        return "Department deleted successfully";
    }
}