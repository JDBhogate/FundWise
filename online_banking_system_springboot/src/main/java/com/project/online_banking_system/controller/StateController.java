package com.project.online_banking_system.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.online_banking_system.model.State;
import com.project.online_banking_system.repository.StateRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class StateController {
	@Autowired
	private StateRepository stateRepository;

	@GetMapping("/states")
	public List<State> getAllStates() {
		return stateRepository.findAll();
	}
}
