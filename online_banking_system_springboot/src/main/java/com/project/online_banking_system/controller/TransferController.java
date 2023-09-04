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
import com.project.online_banking_system.model.Transfer;
import com.project.online_banking_system.model.User;
import com.project.online_banking_system.repository.TransferRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class TransferController {

	@Autowired
	private TransferRepository transferRepository;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/transfer")
	public List<Transfer> getAllTransfers() {
		return transferRepository.findAll();
	}

	@GetMapping("/transfer/{id}")
	public ResponseEntity<Transfer> getTransferById(@PathVariable(value = "id") Long transferId)
			throws ResourceNotFoundException {
		Transfer transfer = transferRepository.findById(transferId)
				.orElseThrow(() -> new ResourceNotFoundException("Transfer not found for this id :: " + transferId));
		return ResponseEntity.ok().body(transfer);
	}

	@PostMapping("/transfer")
	public Transfer createTransfer(@Valid @RequestBody Transfer transfer) {
		return transferRepository.save(transfer);
	}

	@PutMapping("/transfer/{id}")
	public ResponseEntity<Transfer> updateTransfer(@PathVariable(value = "id") Long transferId,
			@Valid @RequestBody Transfer transferDetails) throws ResourceNotFoundException {
		final Transfer updatedTransfer = transferRepository.save(transferDetails);
		return ResponseEntity.ok(updatedTransfer);
	}

	@DeleteMapping("/transfer/{id}")
	public Map<String, Boolean> deleteTransfer(@PathVariable(value = "id") Long transferId)
			throws ResourceNotFoundException {
		Transfer transfer = transferRepository.findById(transferId)
				.orElseThrow(() -> new ResourceNotFoundException("Transfer not found for this id :: " + transferId));
		
		transferRepository.delete(transfer);
		
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@GetMapping("/transfer/all-transfer/{id}")
	public ArrayList getAllTransfer(@PathVariable(value = "id") String account_id) {
		
		 String SQL = "SELECT transfer, user, account, benificiary FROM transfer transfer, user user, account account, beneficiary benificiary  WHERE transfer_account_id = account_id AND account_customer_id = user_id AND transfer_beneficiary_id = beneficiary_id AND account_id = :account_id ORDER BY transfer_id DESC";
		 System.out.print(SQL);
		 Query  q = entityManager.createQuery(SQL);
		 q.setParameter("account_id", account_id);
		 List<Object[]> transfer = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : transfer ) {
			 
			  Transfer transfer_details = (Transfer)row[ 0 ];
			  User cusomter_details = (User)row[ 1 ];
			  Account account_details = (Account)row[ 2 ];
			  Beneficiary beneficiary_details = (Beneficiary)row[ 3 ];
			
			    HashMap<String, String> results = new HashMap();
				results.put("transfer_id",String.valueOf(transfer_details.getTransfer_id()));
				results.put("transfer_account_id",transfer_details.getTransfer_account_id());
				results.put("transfer_beneficiary_id",transfer_details.getTransfer_beneficiary_id());
				results.put("transfer_date",transfer_details.getTransfer_date());
				results.put("transfer_description",transfer_details.getTransfer_description());
				results.put("transfer_amount",transfer_details.getTransfer_amount());
				
				results.put("account_id",String.valueOf(account_details.getAccount_id()));
				results.put("account_branch_id",account_details.getAccount_branch_id());
				results.put("account_customer_id",account_details.getAccount_customer_id());
				results.put("account_atype_id",account_details.getAccount_atype_id());
				results.put("account_opening_date",account_details.getAccount_opening_date());
				results.put("account_nominee_name",account_details.getAccount_nominee_name());
				results.put("account_nominee_mobile",account_details.getAccount_nominee_mobile());
				results.put("accounht_nominee_address",account_details.getAccounht_nominee_address());
				results.put("account_nominee_id_number",account_details.getAccount_nominee_id_number());
				results.put("account_user_photo_name",account_details.getAccount_user_photo_name());
				results.put("account_description",account_details.getAccount_description());
				
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
	
	@GetMapping("/transfer/transfer-details/{id}")
	public ArrayList getTransferDetails(@PathVariable(value = "id") Long transfer_id) {
		
		 System.out.print(transfer_id);
		
		 String SQL = "SELECT transfer, user, account, benificiary FROM transfer transfer, user user, account account, beneficiary benificiary  WHERE transfer_account_id = account_id AND account_customer_id = user_id AND transfer_beneficiary_id = beneficiary_id AND transfer_id = :transfer_id ORDER BY transfer_id DESC";
		 Query q = entityManager.createQuery(SQL);
		 q.setParameter("transfer_id", transfer_id);
		 
		 List<Object[]> transfer = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : transfer ) {
			 
			  Transfer transfer_details = (Transfer)row[ 0 ];
			  User cusomter_details = (User)row[ 1 ];
			  Account account_details = (Account)row[ 2 ];
			  Beneficiary beneficiary_details = (Beneficiary)row[ 3 ];
			
			    HashMap<String, String> results = new HashMap();
				results.put("transfer_id",String.valueOf(transfer_details.getTransfer_id()));
				results.put("transfer_account_id",transfer_details.getTransfer_account_id());
				results.put("transfer_beneficiary_id",transfer_details.getTransfer_beneficiary_id());
				results.put("transfer_date",transfer_details.getTransfer_date());
				results.put("transfer_description",transfer_details.getTransfer_description());
				results.put("transfer_amount",transfer_details.getTransfer_amount());
				
				results.put("account_id",String.valueOf(account_details.getAccount_id()));
				results.put("account_branch_id",account_details.getAccount_branch_id());
				results.put("account_customer_id",account_details.getAccount_customer_id());
				results.put("account_atype_id",account_details.getAccount_atype_id());
				results.put("account_opening_date",account_details.getAccount_opening_date());
				results.put("account_nominee_name",account_details.getAccount_nominee_name());
				results.put("account_nominee_mobile",account_details.getAccount_nominee_mobile());
				results.put("accounht_nominee_address",account_details.getAccounht_nominee_address());
				results.put("account_nominee_id_number",account_details.getAccount_nominee_id_number());
				results.put("account_user_photo_name",account_details.getAccount_user_photo_name());
				results.put("account_description",account_details.getAccount_description());
				
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
