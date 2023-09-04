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
import com.project.online_banking_system.model.Transaction;
import com.project.online_banking_system.model.TransactionMethod;
import com.project.online_banking_system.model.TransactionType;
import com.project.online_banking_system.model.Account;
import com.project.online_banking_system.model.User;
import com.project.online_banking_system.repository.TransactionRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class TransactionController {
	@Autowired
	private TransactionRepository transactionRepository;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/transaction")
	public List<Transaction> getAllTransactions() {
		return transactionRepository.findAll();
	}

	@GetMapping("/transaction/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable(value = "id") Long transactionId)
			throws ResourceNotFoundException {
		Transaction transaction = transactionRepository.findById(transactionId)
				.orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id :: " + transactionId));
		return ResponseEntity.ok().body(transaction);
	}

	@PostMapping("/transaction")
	public Transaction createTransaction(@Valid @RequestBody Transaction transaction) {
		return transactionRepository.save(transaction);
	}

	@PutMapping("/transaction/{id}")
	public ResponseEntity<Transaction> updateTransaction(@PathVariable(value = "id") Long transactionId,
			@Valid @RequestBody Transaction transactionDetails) throws ResourceNotFoundException {
		final Transaction updatedTransaction = transactionRepository.save(transactionDetails);
		return ResponseEntity.ok(updatedTransaction);
	}
	
	@GetMapping("/transaction/account-transaction/{id}")
	public ArrayList getAllUserTransactions(@PathVariable(value = "id") Long account_id) {
		 Query q = entityManager.createQuery("SELECT trns, cust, account, tm, tt from transaction trns, user cust, account account, transaction_method tm, 	transaction_type tt WHERE transaction_account_id =  account_id AND transaction_tm_id = tm_id AND transaction_tt_id = tt_id AND account_customer_id = user_id AND account_id = ?1 ORDER BY transaction_id DESC");
		 List<Object[]> transaction = q.setParameter(1, account_id).getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : transaction ) {
			  Transaction transaction_details = (Transaction)row[ 0 ];
			  User user_details = (User)row[ 1 ];
			  Account account_details = (Account)row[ 2 ];
			  TransactionMethod  tm = (TransactionMethod)row[ 3 ];
			  TransactionType  tt = (TransactionType)row[ 4 ];
			  
			  HashMap<String, String> results = new HashMap();
			  	
			  	results.put("transaction_id",String.valueOf(transaction_details.getTransaction_id()));
			  	results.put("transaction_account_id",transaction_details.getTransaction_account_id());
			  	results.put("transaction_tm_id",transaction_details.getTransaction_tm_id());
			  	results.put("transaction_tt_id",transaction_details.getTransaction_tm_id());
			  	results.put("transaction_date",transaction_details.getTransaction_date());
			  	results.put("transaction_amount",transaction_details.getTransaction_amount());
			  	results.put("transaction_description",transaction_details.getTransaction_description());
			  	results.put("tm_name",tm.getTm_name());
			  	results.put("tt_name",tt.getTt_name());
			  	results.put("account_id",String.valueOf(account_details.getAccount_id()));
			    results.put("user_name",user_details.getUser_first_name()+" "+user_details.getUser_last_name());
			    results.put("user_mobile",user_details.getUser_mobile());
				
				resultArray.add(results);
			 
		 }	 

        return resultArray;
	}
			
	@GetMapping("/transaction/details/{id}")
	public ArrayList getTransactionDetails(@PathVariable(value = "id") Long transactionId) {
		 Query q = entityManager.createQuery("SELECT trns, cust, account, tm, tt from transaction trns, user cust, account account, transaction_method tm, 	transaction_type tt WHERE transaction_account_id =  account_id AND transaction_tm_id = tm_id AND transaction_tt_id = tt_id AND account_customer_id = user_id AND transaction_id = ?1");
		 List<Object[]> transaction = q.setParameter(1, transactionId).getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
			 
		 for ( Object[] row : transaction ) {
			  Transaction transaction_details = (Transaction)row[ 0 ];
			  User user_details = (User)row[ 1 ];
			  Account account_details = (Account)row[ 2 ];
			  TransactionMethod  tm = (TransactionMethod)row[ 3 ];
			  TransactionType  tt = (TransactionType)row[ 4 ];
			  
			    HashMap<String, String> results = new HashMap();
			    results.put("transaction_id",String.valueOf(transaction_details.getTransaction_id()));
			  	results.put("transaction_account_id",transaction_details.getTransaction_account_id());
			  	results.put("transaction_tm_id",transaction_details.getTransaction_tm_id());
			  	results.put("transaction_tt_id",transaction_details.getTransaction_tm_id());
			  	results.put("transaction_date",transaction_details.getTransaction_date());
			  	results.put("transaction_amount",transaction_details.getTransaction_amount());
			  	results.put("transaction_description",transaction_details.getTransaction_description());
			  	results.put("tm_name",tm.getTm_name());
			  	results.put("tt_name",tt.getTt_name());
			  	results.put("account_id",String.valueOf(account_details.getAccount_id()));
			    results.put("user_name",user_details.getUser_first_name()+" "+user_details.getUser_last_name());
			    results.put("user_mobile",user_details.getUser_mobile());
				
				resultArray.add(results);
			 
		 }	 

        return resultArray;
	}

	@DeleteMapping("/transaction/{id}")
	public Map<String, Boolean> deleteTransaction(@PathVariable(value = "id") Long transactionId)
			throws ResourceNotFoundException {
		Transaction transaction = transactionRepository.findById(transactionId)
				.orElseThrow(() -> new ResourceNotFoundException("Transaction not found for this id :: " + transactionId));

		transactionRepository.delete(transaction);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
