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
import com.project.online_banking_system.model.Account;
import com.project.online_banking_system.model.AccountType;
import com.project.online_banking_system.model.Beneficiary;
import com.project.online_banking_system.model.Branch;
import com.project.online_banking_system.model.User;
import com.project.online_banking_system.repository.BeneficiaryRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class BeneficiaryController {

	@Autowired
	private BeneficiaryRepository beneficiaryRepository;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/beneficiary")
	public List<Beneficiary> getAllBeneficiarys() {
		return beneficiaryRepository.findAll();
	}

	@GetMapping("/beneficiary/{id}")
	public ResponseEntity<Beneficiary> getBeneficiaryById(@PathVariable(value = "id") Long beneficiaryId)
			throws ResourceNotFoundException {
		Beneficiary beneficiary = beneficiaryRepository.findById(beneficiaryId)
				.orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found for this id :: " + beneficiaryId));
		return ResponseEntity.ok().body(beneficiary);
	}

	@PostMapping("/beneficiary")
	public Beneficiary createBeneficiary(@Valid @RequestBody Beneficiary beneficiary) {
		return beneficiaryRepository.save(beneficiary);
	}

	@PutMapping("/beneficiary/{id}")
	public ResponseEntity<Beneficiary> updateBeneficiary(@PathVariable(value = "id") Long beneficiaryId,
			@Valid @RequestBody Beneficiary beneficiaryDetails) throws ResourceNotFoundException {
		final Beneficiary updatedBeneficiary = beneficiaryRepository.save(beneficiaryDetails);
		return ResponseEntity.ok(updatedBeneficiary);
	}

	@DeleteMapping("/beneficiary/{id}")
	public Map<String, Boolean> deleteBeneficiary(@PathVariable(value = "id") Long beneficiaryId)
			throws ResourceNotFoundException {
		Beneficiary beneficiary = beneficiaryRepository.findById(beneficiaryId)
				.orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found for this id :: " + beneficiaryId));
		
		beneficiaryRepository.delete(beneficiary);
		
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@GetMapping("/beneficiary/all-beneficiary/{id}")
	public ArrayList getAllBeneficiary(@PathVariable(value = "id") String user_id) {
		
		 String SQL = "SELECT beneficiary, user FROM beneficiary beneficiary, user user WHERE beneficiary_user_id = user_id AND beneficiary_user_id = :user_id ORDER BY beneficiary_id DESC";
		 Query  q = entityManager.createQuery(SQL);
		 q.setParameter("user_id", user_id);
		 List<Object[]> beneficiary = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : beneficiary ) {
			  Beneficiary beneficiary_details = (Beneficiary)row[ 0 ];
			  User cusomter_details = (User)row[ 1 ];
			
			    HashMap<String, String> results = new HashMap();
				results.put("beneficiary_id",String.valueOf(beneficiary_details.getBeneficiary_id()));
				results.put("beneficiary_user_id",beneficiary_details.getBeneficiary_user_id());
				results.put("beneficiary_name",beneficiary_details.getBeneficiary_name());
				results.put("beneficiary_mobile",beneficiary_details.getBeneficiary_mobile());
				results.put("beneficiary_email",beneficiary_details.getBeneficiary_email());
				results.put("beneficiary_address",beneficiary_details.getBeneficiary_address());
				results.put("beneficiary_city",beneficiary_details.getBeneficiary_city());
				results.put("beneficiary_state",beneficiary_details.getBeneficiary_state());
				results.put("beneficiary_country",beneficiary_details.getBeneficiary_country());
				results.put("beneficiary_account_number",beneficiary_details.getBeneficiary_account_number());
				results.put("beneficiary_account_type",beneficiary_details.getBeneficiary_account_type());
				results.put("beneficiary_ifsc_code",beneficiary_details.getBeneficiary_ifsc_code());
				results.put("beneficiary_bank_name",beneficiary_details.getBeneficiary_bank_name());
				
				results.put("customer_name",cusomter_details.getUser_first_name()+" "+cusomter_details.getUser_last_name());
				results.put("customer_email",cusomter_details.getUser_email());
				results.put("customer_mobile",cusomter_details.getUser_mobile());
				
			    resultArray.add(results);
			 
		 }	 

        return resultArray;
	}
	
}
