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
import com.project.online_banking_system.model.TransactionType;
import com.project.online_banking_system.repository.TransactionTypeRepository;
import com.project.online_banking_system.services.FileUploadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class TransactionTypeController {

	@Autowired
	private TransactionTypeRepository transactionTypeRepository;
	
	@Autowired
	public FileUploadService fileService;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/transactionType")
	public List<TransactionType> getAllTransactionType() {
		return transactionTypeRepository.findAll();
	}

	@GetMapping("/transactionType/{id}")
	public ResponseEntity<TransactionType> getTransactionTypeById(@PathVariable(value = "id") Long transactionTypeId)
			throws ResourceNotFoundException {
		TransactionType transactionType = transactionTypeRepository.findById(transactionTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("TransactionType not found for this id :: " + transactionTypeId));
		return ResponseEntity.ok().body(transactionType);
	}

	@PostMapping("/transactionType")
	public TransactionType createTransactionType(@Valid @RequestBody TransactionType transactionType) {
		System.out.print("I am here");
		System.out.print(transactionType);
		return transactionTypeRepository.save(transactionType);
	}
	
	@PutMapping("/transactionType/{id}")
	public ResponseEntity<TransactionType> updateTransactionType(@PathVariable(value = "id") Long transactionTypeId,
			@Valid @RequestBody TransactionType transactionTypeDetails) throws ResourceNotFoundException {
		final TransactionType updatedTransactionType = transactionTypeRepository.save(transactionTypeDetails);
		return ResponseEntity.ok(updatedTransactionType);
	}

	@DeleteMapping("/transactionType/{id}")
	public Map<String, Boolean> deleteTransactionType(@PathVariable(value = "id") Long transactionTypeId)
			throws ResourceNotFoundException {
		TransactionType transactionType = transactionTypeRepository.findById(transactionTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("TransactionType not found for this id :: " + transactionTypeId));

		transactionTypeRepository.delete(transactionType);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
