package com.project.online_banking_system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
import com.project.online_banking_system.model.Login;
import com.project.online_banking_system.repository.LoginRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class LoginController {
	@Autowired
	private LoginRepository loginRepository;
	
	@PersistenceContext
    private EntityManager entityManager;

	@PostMapping("/login/save")
	public Login createLogin(@Valid @RequestBody Login login) {
		return loginRepository.save(login);
	}
	
	@GetMapping("/login/check-username/{username}")
	public List<Login> checkUserNameExits(@PathVariable(value = "username") String username) {
			return loginRepository.serchUserByName(username);
	}
	
	@PostMapping("/login")
	public Login checkLogin(@Valid @RequestBody Login login) {
			return loginRepository.checkLogin(login.getLogin_email(), login.getLogin_password());
	}
}
