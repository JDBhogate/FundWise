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
import com.project.online_banking_system.model.TransactionMethod;
import com.project.online_banking_system.repository.TransactionMethodRepository;
import com.project.online_banking_system.services.FileUploadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class TransactionMethodController {

	@Autowired
	private TransactionMethodRepository transactionMethodRepository;
	
	@Autowired
	public FileUploadService fileService;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/transactionMethod")
	public List<TransactionMethod> getAllTransactionMethod() {
		return transactionMethodRepository.findAll();
	}

	@GetMapping("/transactionMethod/{id}")
	public ResponseEntity<TransactionMethod> getTransactionMethodById(@PathVariable(value = "id") Long transactionMethodId)
			throws ResourceNotFoundException {
		TransactionMethod transactionMethod = transactionMethodRepository.findById(transactionMethodId)
				.orElseThrow(() -> new ResourceNotFoundException("TransactionMethod not found for this id :: " + transactionMethodId));
		return ResponseEntity.ok().body(transactionMethod);
	}

	@PostMapping("/transactionMethod")
	public TransactionMethod createTransactionMethod(@Valid @RequestBody TransactionMethod transactionMethod) {
		System.out.print("I am here");
		System.out.print(transactionMethod);
		return transactionMethodRepository.save(transactionMethod);
	}
	
	@PutMapping("/transactionMethod/{id}")
	public ResponseEntity<TransactionMethod> updateTransactionMethod(@PathVariable(value = "id") Long transactionMethodId,
			@Valid @RequestBody TransactionMethod transactionMethodDetails) throws ResourceNotFoundException {
		final TransactionMethod updatedTransactionMethod = transactionMethodRepository.save(transactionMethodDetails);
		return ResponseEntity.ok(updatedTransactionMethod);
	}

	@DeleteMapping("/transactionMethod/{id}")
	public Map<String, Boolean> deleteTransactionMethod(@PathVariable(value = "id") Long transactionMethodId)
			throws ResourceNotFoundException {
		TransactionMethod transactionMethod = transactionMethodRepository.findById(transactionMethodId)
				.orElseThrow(() -> new ResourceNotFoundException("TransactionMethod not found for this id :: " + transactionMethodId));

		transactionMethodRepository.delete(transactionMethod);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
