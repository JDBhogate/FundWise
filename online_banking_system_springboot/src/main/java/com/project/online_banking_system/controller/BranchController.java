package com.project.online_banking_system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.online_banking_system.exception.ResourceNotFoundException;
import com.project.online_banking_system.model.Branch;
import com.project.online_banking_system.repository.BranchRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class BranchController {

	@Autowired
	private BranchRepository branchRepository;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/branch")
	public List<Branch> getAllBranchs() {
		return branchRepository.findAll();
	}
	
	@GetMapping("/branch/{id}")
	public ResponseEntity<Branch> getBranchById(@PathVariable(value = "id") Long branchId)
			throws ResourceNotFoundException {
		Branch branch = branchRepository.findById(branchId)
				.orElseThrow(() -> new ResourceNotFoundException("Branch not found for this id :: " + branchId));
		return ResponseEntity.ok().body(branch);
	}

	@PostMapping("/branch")
	public Branch createBranch(@Valid @RequestBody Branch branch) {
		System.out.print("I am here");
		System.out.print(branch);
		return branchRepository.save(branch);
	}
	
	@PutMapping("/branch/{id}")
	public ResponseEntity<Branch> updateBranch(@PathVariable(value = "id") Long branchId,
			@Valid @RequestBody Branch branchDetails) throws ResourceNotFoundException {
		final Branch updatedBranch = branchRepository.save(branchDetails);
		return ResponseEntity.ok(updatedBranch);
	}

	@DeleteMapping("/branch/{id}")
	public Map<String, Boolean> deleteBranch(@PathVariable(value = "id") Long branchId)
			throws ResourceNotFoundException {
		Branch branch = branchRepository.findById(branchId)
				.orElseThrow(() -> new ResourceNotFoundException("Branch not found for this id :: " + branchId));

		branchRepository.delete(branch);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
