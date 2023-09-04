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
import com.project.online_banking_system.model.AccountType;
import com.project.online_banking_system.repository.AccountTypeRepository;
import com.project.online_banking_system.services.FileUploadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class AccountTypeController {

	@Autowired
	private AccountTypeRepository accountTypeRepository;
	
	@Autowired
	public FileUploadService fileService;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/accountType")
	public List<AccountType> getAllAccountType() {
		return accountTypeRepository.findAll();
	}

	@GetMapping("/accountType/{id}")
	public ResponseEntity<AccountType> getAccountTypeById(@PathVariable(value = "id") Long accountTypeId)
			throws ResourceNotFoundException {
		AccountType accountType = accountTypeRepository.findById(accountTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));
		return ResponseEntity.ok().body(accountType);
	}

	@PostMapping("/accountType")
	public AccountType createAccountType(@Valid @RequestBody AccountType accountType) {
		System.out.print("I am here");
		System.out.print(accountType);
		return accountTypeRepository.save(accountType);
	}
	
	@PutMapping("/accountType/{id}")
	public ResponseEntity<AccountType> updateAccountType(@PathVariable(value = "id") Long accountTypeId,
			@Valid @RequestBody AccountType accountTypeDetails) throws ResourceNotFoundException {
		final AccountType updatedAccountType = accountTypeRepository.save(accountTypeDetails);
		return ResponseEntity.ok(updatedAccountType);
	}

	@DeleteMapping("/accountType/{id}")
	public Map<String, Boolean> deleteAccountType(@PathVariable(value = "id") Long accountTypeId)
			throws ResourceNotFoundException {
		AccountType accountType = accountTypeRepository.findById(accountTypeId)
				.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));

		accountTypeRepository.delete(accountType);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
