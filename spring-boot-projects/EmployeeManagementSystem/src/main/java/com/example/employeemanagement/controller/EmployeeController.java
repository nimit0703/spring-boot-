package com.example.employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;

@RestController
@RequestMapping("/employees")
public class EmployeeController
{
	@Autowired
	private EmployeeRepository employeeRepository;

	@PostMapping("/")
	public Employee createEmployee(@RequestBody Employee employee)
	{
		return employeeRepository.save(employee);
	}

	@GetMapping("/")
	public List<Employee> getAllEmployee()
	{
		return employeeRepository.findAll();
	}

	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable Long id)
	{
		return employeeRepository.findById(id).orElse(null);
	}

	@PutMapping("/{id}")
	public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails)
	{
		Employee employee = employeeRepository.findById(id).orElse(null);
		if(employee != null)
		{
			employee.setName(employeeDetails.getName());
			employee.setDepartment(employeeDetails.getDepartment());
			return employeeRepository.save(employee);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deleteEmployee(@PathVariable Long id)
	{
		employeeRepository.deleteById(id);
	}

}
